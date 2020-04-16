<?php

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   usage: GetInsuranceCardImage.php?uip_id=2

   Returned fields:

       Error                  If this is present and true, an error was
                              encountered.

       Error_Description      Only present if Error is true. Describes the
                              encountered problem in human-readable format.

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


// =============================================================================
// FUNCTIONS
// =============================================================================

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

function main(){
  $uipID = getAndValidateParam_UserInsurancePlanID();
  header("Location: GetInsuranceCardPlaceholder.php?overlay=1&uip_id=" . $uipID);
}
main();

// =============================================================================
// EOF
// =============================================================================

?>
