<?php

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Outputs a JSON object containing a list of insurance plans for a given
   employee.

   usage: GetUserInsurancePlans.php?employee_id=123456

   Returned fields:

       Error                 If this is present and true, an error was
                             encountered.

       Error_Description     Only present if Error is true. Describes the
                             encountered problem in human-readable format.

       UserInsurancePlans    Array of insurance plan objects,
                             with the following fields.

           ID             Database ID for the user insurance plan. This ID can
                          be passed to other APIs to query details for the plan.

           Description    Human-readable description of the plan.
                          Intended for display.

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

require 'SharedFunctions.php';

// =============================================================================
// FUNCTIONS
// =============================================================================

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

function output_userInsurancePlans($dbResults){
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
  output_userInsurancePlans($dbResults);
}
main();

// =============================================================================
// EOF
// =============================================================================

?>
