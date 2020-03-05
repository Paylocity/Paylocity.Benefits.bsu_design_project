<?php

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Outputs a JSON object containing financial details for an employee insurance
   plan.

   usage: GetInsurancePlanFinancials.php?uip_id=2

   Returned fields:

       Error                  If this is present and true, an error was
                              encountered.

       Error_Description      Only present if Error is true. Describes the
                              encountered problem in human-readable format.

       Deductible_Remainings  Remaining balance until deductible is met.

       Deductible_Spent       Amount spent toward deductible.

       Deductible_Totals      Total amount of deductible.

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


// =============================================================================
// FUNCTIONS
// =============================================================================

/** Sets the content type of the HTTP header to JSON. */

function setJSONHTTPContentType(){
  header('Content-Type: application/json');
}

// _____________________________________________________________________________

/** Validates and returns the database API key. Outputs an error JSON object and
 *  terminates if the key is invalid or not set.
 *
 *  @retval string Database API key. */

function getAndValidateDatabaseAPIKey(){
  if(file_exists('../APIKeys/Database.key')){
    return trim(file_get_contents('../APIKeys/Database.key'));
  }

  $output = new stdClass();
  $output->{'Error'} = true;
  $output->{'Error_Description'} = 'Database API key is not present.';
  echo json_encode($output);
  die();
}

// _____________________________________________________________________________

/** Validates and returns the Eligible API key. Outputs an error JSON object and
 *  terminates if the key is invalid or not set.
 *
 *  @retval string Eligible API key. */

function getAndValidateEligibleAPIKey(){
  if(!file_exists('../APIKeys/Eligible.key')){
    $output = new stdClass();
    $output->{'Error'} = true;
    $output->{'Error_Description'} = 'Eligible API key is not present.';
    echo json_encode($output);
    die();
  }

  return trim(file_get_contents('../APIKeys/Eligible.key'));
}

// _____________________________________________________________________________

/** Validates and returns the user insurance plan ID parameter. Outputs an error
 *  JSON object and terminates if the employee ID is invalid or not set.
 *
 *  @retval string User insurance plan ID. */

function getAndValidateParam_UserInsurancePlanID(){
  if(!isset($_GET['uip_id'])){
    $output = new stdClass();
    $output->{'Error'} = true;
    $output->{'Error_Description'} = 'User insurance plan ID was not specified.';
    echo json_encode($output);
    die();
  }

  return $_GET['uip_id'];
}

// _____________________________________________________________________________

/** Returns a PDO object for the database.
 *
 *  @param  string $dbKey Database key.
 *  @retval object Database PDO object. */

function getDatabaseConnection($dbKey){
  $url  = parse_url($dbKey);
  $host = $url["host"];
  $db   = substr($url["path"], 1);
  $user = $url["user"];
  $pass = $url["pass"];
  return new PDO("mysql:host=$host;dbname=$db;", $user, $pass);
}

// _____________________________________________________________________________

/** Queries the database for the plan type. Returns an object containing the
 *  network ("in_network"/"out_network") and plan level ("INDIVIDUAL"/"FAMILY").
 *
 *  @param  object $db    PDO object for the database connection.
 *  @param  string $uipID User insurance plan ID number.
 *  @retval object Object containing the plan type. */

function queryDatabase_getPlanTypeObj($db,$uipID){
  $stmt = $db->prepare("SELECT uip.network, uip.plan_level FROM UserInsurancePlan AS uip WHERE uip.id = :uip_id;");
  $stmt->bindParam(':uip_id',$uipID);
  $stmt->execute();
  $results = $stmt->fetch();

  $ret = new stdClass();
  $ret->{'network'   } = ($results['network']=='IN' ? 'in_network' : 'out_network');
  $ret->{'plan_level'} = $results['plan_level'];
  return $ret;
}

// _____________________________________________________________________________

/** Queries the database for the cached plan financial details.
 *
 *  @param  object $db    PDO object for the database connection.
 *  @param  string $uipID User insurance plan ID number.
 *  @return False if the cache is not valid, otherwise an array of cached data. */

function queryDatabase_getCachedPlan($db,$uipID){
  $stmt = $db->prepare("SELECT cached_plan FROM UserInsurancePlan WHERE id = :uip_id AND cached_plan_timestamp > DATE_SUB(NOW(),INTERVAL 1 HOUR);");
  $stmt->bindParam(':uip_id',$uipID);
  $stmt->execute();
  return $stmt->fetch();
}

// _____________________________________________________________________________

/** Queries the database for the required fields needed to query Eligible for
 *  the plan details.
 *
 *  @param  object $db    PDO object for the database connection.
 *  @param  string $uipID User insurance plan ID number.
 *  @retval array Array of query fields. */

function queryDatabase_getPlanQueryFields($db,$uipID){
  $stmt = $db->prepare("SELECT ip.provider_npi, ip.test_flag, uip.payer_id, uip.member_id, uip.network FROM UserInsurancePlan AS uip JOIN InsuranceProvider AS ip ON ip.id = uip.provider_id WHERE uip.id = :uip_id;");
  $stmt->bindParam(':uip_id',$uipID);
  $stmt->execute();
  return $stmt->fetch();
}

// _____________________________________________________________________________

/** Queries Eligible for the financial details of an insurance plan.
 *
 *  @param  string $eligibleKey Eligible API key.
 *  @param  array  $queryFields Fields to send in the query.
 *  @retval string JSON object returned by Eligible. */

function queryEligible_getPlanData($eligibleKey,$queryFields){
  $query  = 'https://gds.eligibleapi.com/v1.5/coverage/all.json?';
  $query .= 'api_key=' . $eligibleKey;
  if($queryFields['test_flag'])$query .= '&test=true';
  $query .= '&provider_npi=' . $queryFields['provider_npi'];
  $query .= '&payer_id='     . $queryFields['payer_id'    ];
  $query .= '&member_id='    . $queryFields['member_id'   ];
  $query .= '&network='      . $queryFields['network'     ];
  $query .= '&return_only=plan';

  $planData = file_get_contents($query);
  return $planData;
}

// _____________________________________________________________________________

/** Caches the plan financial details from Eligible in the database.
 *
 *  @param  object $db      PDO object for the database connection.
 *  @param  string $uipID   User insurance plan ID number.
 *  @param  string $planData Data returned by Eligible. */

function queryDatabase_cachePlanData($db,$uipID,$planData){
  $compressedPlanData = gzcompress($planData);

  $stmt = $db->prepare("UPDATE UserInsurancePlan SET cached_plan=:plan_data, cached_plan_timestamp=NOW() WHERE id = :uip_id;");
  $stmt->bindParam(':plan_data',$compressedPlanData);
  $stmt->bindParam(':uip_id'   ,$uipID             );
  $stmt->execute();
}

// _____________________________________________________________________________

/** Outputs the discovered insurance plans as a JSON object.
 *
 *  @param string $planData Insurance plan data in JSON format.
 *  @param object $planTypeObj Object containing the plan network and level. */

function output_planData($planData,$planTypeObj){
  $networkType = $planTypeObj->{'network'};
  $planLevel   = $planTypeObj->{'plan_level'};

  $output      = new stdClass();
  $planData    = json_decode($planData);
  $deductibleA = $planData->{'plan'}->{'financials'}->{'deductible'};

  $output->{'Deductible_Remainings'} = "0";
  $deductibleA_remainingsA = $deductibleA->{'remainings'}->{$networkType};
  foreach($deductibleA_remainingsA AS $x){
    if($x->{'level'}==$planLevel){
      $output->{'Deductible_Remainings'} = $x->{'amount'};
    }
  }

  $output->{'Deductible_Spent'} = "0";
  $deductibleA_spentA = $deductibleA->{'spent'}->{$networkType};
  foreach($deductibleA_spentA AS $x){
    if($x->{'level'}==$planLevel){
      $output->{'Deductible_Spent'} = $x->{'amount'};
    }
  }

  $output->{'Deductible_Totals'} = "0";
  $deductibleA_totalsA = $deductibleA->{'totals'}->{$networkType};
  foreach($deductibleA_totalsA AS $x){
    if($x->{'level'}==$planLevel){
      $output->{'Deductible_Totals'} = $x->{'amount'};
    }
  }

  echo json_encode($output);
}

// =============================================================================
// ENTRY POINT
// =============================================================================

function main(){
  setJSONHTTPContentType();
  $dbKey       = getAndValidateDatabaseAPIKey();
  $eligibleKey = getAndValidateEligibleAPIKey();
  $uipID       = getAndValidateParam_UserInsurancePlanID();
  $db          = getDatabaseConnection($dbKey);
  $planTypeObj = queryDatabase_getPlanTypeObj($db,$uipID);
  $dbCacheData = queryDatabase_getCachedPlan ($db,$uipID);
  if($dbCacheData!=false){
    $planData = gzuncompress($dbCacheData['cached_plan']);
  }else{
    $queryFields = queryDatabase_getPlanQueryFields($db,$uipID);
    $planData    = queryEligible_getPlanData($eligibleKey,$queryFields);
    queryDatabase_cachePlanData($db,$uipID,$planData);
  }
  output_planData($planData,$planTypeObj);
}
main();

// =============================================================================
// EOF
// =============================================================================

?>
