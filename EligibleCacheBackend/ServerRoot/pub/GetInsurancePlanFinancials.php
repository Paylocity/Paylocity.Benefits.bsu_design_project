<?php

header('Content-Type: application/json');

if(!file_exists('../APIKeys/Database.key')){
  echo '{';
  echo '"Error":true,';
  echo '"ErrorDescription":"Database API key is not present."';
  echo '}';
  die();
}

if(!file_exists('../APIKeys/Eligible.key')){
  echo '{';
  echo '"Error":true,';
  echo '"ErrorDescription":"Eligible API key is not present."';
  echo '}';
  die();
}

if(!isset($_GET['uip_id'])){
  echo '{';
  echo '"Error":true,';
  echo '"ErrorDescription":"User insurance plan ID was not specified."';
  echo '}';
  die();
}

$url  = parse_url(trim(file_get_contents('../APIKeys/Database.key')));
$host = $url["host"];
$db   = substr($url["path"], 1);
$user = $url["user"];
$pass = $url["pass"];
$conn = new PDO("mysql:host=$host;dbname=$db;", $user, $pass);

$stmt = $conn->prepare("SELECT cached_plan FROM UserInsurancePlan WHERE id = :uip_id AND cached_plan_timestamp > DATE_SUB(NOW(),INTERVAL 1 HOUR);");
$stmt->bindParam(':uip_id',$_GET['uip_id']);
$stmt->execute();
$results = $stmt->fetch();

if($results!=false){
  $eligibleData = $results['cached_plan'];

  $stmt2 = $conn->prepare("SELECT uip.network FROM UserInsurancePlan AS uip WHERE uip.id = :uip_id;");
  $stmt2->bindParam(':uip_id',$_GET['uip_id']);
  $stmt2->execute();
  $network = $stmt2->fetch()['network'];
}else{
  $stmt2 = $conn->prepare("SELECT ip.provider_npi, ip.test_flag, uip.payer_id, uip.member_id, uip.network FROM UserInsurancePlan AS uip JOIN InsuranceProvider AS ip ON ip.id = uip.provider_id WHERE uip.id = :uip_id;");
  $stmt2->bindParam(':uip_id',$_GET['uip_id']);
  $stmt2->execute();
  $results2 = $stmt2->fetch();
  $network  = $results2['network'];

  $eligibleQuery  = 'https://gds.eligibleapi.com/v1.5/coverage/all.json?';
  $eligibleQuery .= 'api_key=' . trim(file_get_contents('../APIKeys/Eligible.key'));
  if($results2['test_flag'])$eligibleQuery .= '&test=true';
  $eligibleQuery .= '&provider_npi=' . $results2['provider_npi'];
  $eligibleQuery .= '&payer_id='     . $results2['payer_id'];
  $eligibleQuery .= '&member_id='    . $results2['member_id'];
  $eligibleQuery .= '&network='      . $results2['network'];
  $eligibleQuery .= '&return_only=plan';

  $eligibleData = file_get_contents($eligibleQuery);

  $stmt3 = $conn->prepare("UPDATE UserInsurancePlan SET cached_plan=:plan_data, cached_plan_timestamp=NOW() WHERE id = :uip_id;");
  $stmt3->bindParam(':plan_data',$eligibleData);
  $stmt3->bindParam(':uip_id',$_GET['uip_id']);
  $stmt3->execute();
}
$eligibleData = json_decode($eligibleData);

if($network=='IN')$network='in_network';else $network='out_network';

$deductibleA             = $eligibleData->{'plan'}->{'financials'}->{'deductible'};
$deductibleA_remainingsA = $deductibleA->{'remainings'}->{$network};
$deductibleA_spentA      = $deductibleA->{'spent'     }->{$network};
$deductibleA_totalsA     = $deductibleA->{'totals'    }->{$network};

$deductible_remainings = "0";
foreach($deductibleA_remainingsA AS $x){
  if($x->{'level'}=='INDIVIDUAL')$deductible_remainings = $x->{'amount'};
}

$deductible_spent = "0";
foreach($deductibleA_spentA AS $x){
  if($x->{'level'}=='INDIVIDUAL')$deductible_spent = $x->{'amount'};
}

$deductible_totals = "0";
foreach($deductibleA_totalsA AS $x){
  if($x->{'level'}=='INDIVIDUAL')$deductible_totals = $x->{'amount'};
}

echo '{';
echo '"deductible_remainings":"' . $deductible_remainings . '",';
echo '"deductible_spent":"'      . $deductible_spent      . '",';
echo '"deductible_totals":"'     . $deductible_totals     . '"';
echo '}';

?>
