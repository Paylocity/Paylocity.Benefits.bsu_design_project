<?php

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   usage: GetInsuranceCardThumbnail.php?uip_id=2

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

function queryDatabase_getThumbnailImage($db,$uipID){
  $stmt = $db->prepare("SELECT thumbnail FROM UserInsurancePlanCard WHERE uip_id = :uip_id;");
  $stmt->bindParam(':uip_id',$uipID);
  $stmt->execute();
  $result = $stmt->fetch();
  return ($result ? $result['thumbnail'] : false);
}

// =============================================================================
// ENTRY POINT
// =============================================================================

function main(){
  $dbKey = getAndValidateDatabaseAPIKey();
  $uipID = getAndValidateParam_UserInsurancePlanID();
  $db    = getDatabaseConnection($dbKey);
  $img   = queryDatabase_getThumbnailImage($db,$uipID);
  if($img == false){
    header("Location: GetInsuranceCardPlaceholder.php?overlay=0&uip_id=" . $uipID);
  }else{
    header('Content-type: '  .(new finfo(FILEINFO_MIME))->buffer($img));
    header('Content-Length: '.strlen($img));
    echo $img;
  }
}
main();

// =============================================================================
// EOF
// =============================================================================

?>
