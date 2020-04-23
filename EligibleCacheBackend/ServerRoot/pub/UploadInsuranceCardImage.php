<?php

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   usage: UploadInsuranceCardImage.php?uip_id=2
     with POST form data containing fields:
       cardImage  The uploaded image.
       submit     Submit button.

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

function getAndValidateUploadedFile(){
  if(!isset($_POST["submit"])) {
    $output = new stdClass();
    $output->{'Error'} = true;
    $output->{'Error_Description'} = 'No file uploaded.';
    echo json_encode($output);
    die();  
  }
  return $_FILES["cardImage"]["tmp_name"];
}

// _____________________________________________________________________________

function queryDatabase_insertImage($db,$uipID,$img){
  $stmt = $db->prepare("DELETE FROM UserInsurancePlanCard WHERE uip_id = :uipID");
  $stmt->bindParam(':uipID',$uipID);
  $stmt->execute();

  $fp  = fopen($img,'rb');
  $fp2 = fopen($img,'rb');

  $stmt2 = $db->prepare("INSERT INTO UserInsurancePlanCard (uip_id,thumbnail,image) VALUES (:uipID,:thumb,:img);");
  $stmt2->bindParam(':uipID',$uipID);
  $stmt2->bindParam(':thumb',$fp ,PDO::PARAM_LOB);
  $stmt2->bindParam(':img'  ,$fp2,PDO::PARAM_LOB);
  $stmt2->execute();
}

// =============================================================================
// ENTRY POINT
// =============================================================================

function main(){
  setJSONHTTPContentType();
  $dbKey      = getAndValidateDatabaseAPIKey();
  $uipID      = getAndValidateParam_UserInsurancePlanID();
  $img        = getAndValidateUploadedFile();
  $db         = getDatabaseConnection($dbKey);
  queryDatabase_insertImage($db,$uipID,$img);
  header('Location: ' . $_SERVER['HTTP_REFERER']);
}
main();

// =============================================================================
// EOF
// =============================================================================

?>
