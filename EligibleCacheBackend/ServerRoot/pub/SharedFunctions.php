<?php

// =============================================================================
// SHARED FUNCTIONS
// =============================================================================

/** Sets the content type of the HTTP header to JSON. */

function setJSONHTTPContentType(){
  header('Content-Type: application/json');
  header("Access-Control-Allow-Origin: *");
}

// _____________________________________________________________________________

/** Sets the content type of the HTTP header to PNG. */

function setPNGHTTPContentType(){
  header('Content-type: image/png');
}

// _____________________________________________________________________________

/** Validates and returns the database API key. Outputs an error JSON object and
 *  terminates if the key is invalid or not set.
 *
 *  @retval string Database API key. */

function getAndValidateDatabaseAPIKey(){
  if(!file_exists('../APIKeys/Database.key')){
    $output = new stdClass();
    $output->{'Error'} = true;
    $output->{'Error_Description'} = 'Database API key is not present.';
    echo json_encode($output);
    die();
  }

  return trim(file_get_contents('../APIKeys/Database.key'));
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

/** Validates and returns the employee ID parameter. Outputs an error JSON
 *  object and terminates if the employee ID is invalid or not set.
 *
 *  @retval string Employee ID. */

function getAndValidateParam_EmployeeID(){
  if(!isset($_GET['employee_id'])){
    $output = new stdClass();
    $output->{'Error'} = true;
    $output->{'Error_Description'} = 'Employee ID was not specified.';
    echo json_encode($output);
    die();
  }

  return $_GET['employee_id'];
}

// =============================================================================
// EOF
// =============================================================================

?>
