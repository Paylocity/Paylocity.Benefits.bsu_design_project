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


// =============================================================================
// FUNCTIONS
// =============================================================================

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

/** Validates and returns the upload overlay flag. Defaults to a flag value of
 *  false if the flag is invalid or not set.
 *
 *  @retval booleam True if the overlay was requested, otherwise false. */

function getAndValidateParam_UploadOverlayFlag(){
  if(!isset($_GET['overlay']))return false;
  return ($_GET['overlay']==1 ? true : false);
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

// _____________________________________________________________________________

/** Sets the content type of the HTTP header to PNG. */

function setPNGHTTPContentType(){
  header('Content-type: image/png');
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
