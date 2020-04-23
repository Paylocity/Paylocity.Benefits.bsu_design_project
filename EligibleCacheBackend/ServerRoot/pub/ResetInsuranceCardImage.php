<?php

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   usage: ResetInsuranceCardImage.php?uip_id=2

   Returned fields:

       Error                  If this is present and true, an error was
                              encountered.

       Error_Description      Only present if Error is true. Describes the
                              encountered problem in human-readable format.

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

require 'SharedFunctions.php';

// =============================================================================
// FUNCTIONS
// =============================================================================

function queryDatabase_resetImage($db,$uipID){
  $stmt = $db->prepare("DELETE FROM UserInsurancePlanCard WHERE uip_id = :uipID");
  $stmt->bindParam(':uipID',$uipID);
  $stmt->execute();
}

// =============================================================================
// ENTRY POINT
// =============================================================================

function main(){
  setJSONHTTPContentType();
  $dbKey      = getAndValidateDatabaseAPIKey();
  $uipID      = getAndValidateParam_UserInsurancePlanID();
  $db         = getDatabaseConnection($dbKey);
  queryDatabase_resetImage($db,$uipID);
}
main();

// =============================================================================
// EOF
// =============================================================================

?>
