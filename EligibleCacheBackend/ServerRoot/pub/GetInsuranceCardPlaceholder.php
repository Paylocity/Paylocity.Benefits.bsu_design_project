<?php

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Generates a placeholder insurance card image for a given plan. If an error
   is encountered, returns a JSON object describing the issue.

   usage: GetInsuranceCardPlaceholder.php?uip_id=2&overlay=1

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

/** Validates and returns the upload overlay flag. Defaults to a flag value of
 *  false if the flag is invalid or not set.
 *
 *  @retval booleam True if the overlay was requested, otherwise false. */

function getAndValidateParam_UploadOverlayFlag(){
  if(!isset($_GET['overlay']))return false;
  return ($_GET['overlay']==1 ? true : false);
}

// _____________________________________________________________________________

/** Returns the data for the specified user insurance plan ID. Returns an
 *  object containing the description and employee ID for that plan.
 *
 *  @param  object $db    PDO object for the database connection.
 *  @param  string $uipID User insurance plan ID number.
 *  @retval object Object containing the plan data. */

function queryDatabase_getUserInsurancePlanData($db,$uipID){
  $stmt = $db->prepare("SELECT uip.description, u.employee_id FROM UserInsurancePlan AS uip JOIN User AS u ON u.id=uip.user_id WHERE uip.id = :uip_id;");
  $stmt->bindParam(':uip_id',$uipID);
  $stmt->execute();
  return $stmt->fetch();
}

// =============================================================================
// ENTRY POINT
// =============================================================================

function main(){
  $dbKey       = getAndValidateDatabaseAPIKey();
  $uipID       = getAndValidateParam_UserInsurancePlanID();
  $overlayFlag = getAndValidateParam_UploadOverlayFlag();
  $db          = getDatabaseConnection($dbKey);
  $planData    = queryDatabase_getUserInsurancePlanData($db,$uipID);
  $planDesc    = $planData['description'];
  $employeeID  = $planData['employee_id'];

  setPNGHTTPContentType();

  $img = imagecreatefrompng('InsuranceCardPlaceholder_Template.png');
  $pen = imagecolorallocate($img,0x0C,0x85,0xC4);

  if($overlayFlag){
    $overlay = imagecreatefrompng('InsuranceCardPlaceholder_Overlay.png');
    imagecopy($img,$overlay,0,0,0,0,800,500);
    imagedestroy($overlay);
  }

  $descFontSize = 36;
  if(strlen($planDesc) > 20)$descFontSize -= (strlen($planDesc)-20) * 0.55;
  imagettftext($img,$descFontSize,0, 96, 98,$pen,'Roboto-Bold.ttf'   ,$planDesc      );
  imagettftext($img,36           ,0, 96,162,$pen,'Roboto-Bold.ttf'   ,'ID Number:'   );
  imagettftext($img,36           ,0,360,162,$pen,'Roboto-Regular.ttf',$employeeID    );
  imagettftext($img,36           ,0, 96,224,$pen,'Roboto-Bold.ttf'   ,'Group Number:');
  imagettftext($img,36           ,0,450,224,$pen,'Roboto-Regular.ttf','------'       );

  imagepng    ($img);
  imagedestroy($img);
}
main();

// =============================================================================
// EOF
// =============================================================================

?>
