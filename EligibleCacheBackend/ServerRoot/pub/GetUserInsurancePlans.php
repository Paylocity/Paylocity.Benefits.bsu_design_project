<?php

header('Content-Type: application/json');

if(!file_exists('../APIKeys/Database.key')){
  echo '{';
  echo '"Error":true,';
  echo '"ErrorDescription":"Database API key is not present."';
  echo '}';
  die();
}

if(!isset($_GET['employee_id'])){
  echo '{';
  echo '"Error":true,';
  echo '"ErrorDescription":"Employee ID was not specified."';
  echo '}';
  die();
}

$url  = parse_url(trim(file_get_contents('../APIKeys/Database.key')));
$host = $url["host"];
$db   = substr($url["path"], 1);
$user = $url["user"];
$pass = $url["pass"];
$conn = new PDO("mysql:host=$host;dbname=$db;", $user, $pass);

$stmt = $conn->prepare("SELECT uip.id, uip.description FROM UserInsurancePlan AS uip JOIN User AS u ON u.id=uip.user_id WHERE u.employee_id = :employee_id;");
$stmt->bindParam(':employee_id',$_GET['employee_id']);
$stmt->execute();
$results = $stmt->fetchAll();

echo '{';
echo '"UserInsurancePlans":[';

$first = true;
foreach($results as $result){
  if(!$first)echo ',';
  $first = false;

  echo '{';
  echo '"id":"' . $result['id'] . '",';
  echo '"description":"' . $result['description'] . '"';
  echo '}';
}

echo ']}';

?>
