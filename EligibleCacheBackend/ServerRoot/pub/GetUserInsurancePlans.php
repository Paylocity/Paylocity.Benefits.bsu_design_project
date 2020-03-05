<?php

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Outputs a JSON object containing a list of insurance plans for a given
   employee.

   usage: GetUserInsurancePlans.php?employee_id=123456

   Returned fields:

       Error                 If this is present and true, an error was
                             encountered.

       ErrorDescription      Only present if Error is true. Describes the
                             encountered problem in human-readable format.

       UserInsurancePlans    Array of insurance plan objects,
                             with the following fields.

           ID             Database ID for the user insurance plan. This ID can
                          be passed to other APIs to query details for the plan.

           Description    Human-readable description of the plan.
                          Intended for display.

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
  $output->{'ErrorDescription'} = 'Database API key is not present.';
  echo json_encode($output);
  die();
}

// _____________________________________________________________________________

/** Validates and returns the employee ID parameter. Outputs an error JSON
 *  object and terminates if the employee ID is invalid or not set.
 *
 *  @retval string Employee ID. */

function getAndValidateParam_EmployeeID(){
  if(isset($_GET['employee_id'])){
    return $_GET['employee_id'];
  }

  $output = new stdClass();
  $output->{'Error'} = true;
  $output->{'ErrorDescription'} = 'Employee ID was not specified.';
  echo json_encode($output);
  die();
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

/** Queries the database for insurance plans for an employee.
 *
 *  @param object $db PDO object for the database connection.
 *  @param string $employeeID Employee ID to query for insurance plans.
 *  @retval array Array of returned database rows. */

function queryDatabase_userInsurancePlans($db,$employeeID){
  $stmt = $db->prepare("SELECT uip.id, uip.description FROM UserInsurancePlan AS uip JOIN User AS u ON u.id=uip.user_id WHERE u.employee_id = :employee_id;");
  $stmt->bindParam(':employee_id',$employeeID);
  $stmt->execute();
  return $stmt->fetchAll();
}

// _____________________________________________________________________________

/** Outputs the discovered insurance plans as a JSON object.
 *
 *  @param array $dbResults Array of database rows containing insurance plans. */

function outputUserInsurancePlans($dbResults){
  $plans = array();
  foreach($dbResults as $result){
    $obj = new stdClass();
    $obj->{'ID'         } = $result['id'];
    $obj->{'Description'} = $result['description'];
    $plans[] = $obj;
  }

  $output = new stdClass();
  $output->{'UserInsurancePlans'} = $plans;
  echo json_encode($output);
}

// =============================================================================
// ENTRY POINT
// =============================================================================

function main(){
  setJSONHTTPContentType();
  $dbKey      = getAndValidateDatabaseAPIKey();
  $employeeID = getAndValidateParam_EmployeeID();
  $db         = getDatabaseConnection($dbKey);
  $dbResults  = queryDatabase_userInsurancePlans($db,$employeeID);
  outputUserInsurancePlans($dbResults);
}
main();

// =============================================================================
// EOF
// =============================================================================

?>
