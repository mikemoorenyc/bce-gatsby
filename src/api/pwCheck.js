
<?php
header("Access-Control-Allow-Origin: *");
 header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
 header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type,      Accept");
$url = getenv("GRAPH_URL");
$pw = getenv("PW_CHECK");

$json = file_get_contents('php://input');
$data = json_decode($json);
$testPw = trim(strtolower($data->pw));
$test = boolval($testPw == $pw);
$response_block = array();
/*if($_SESSION['sessionToken'] &&  $_SESSION['sessionToken'] === $data->sessionToken) {
	$response_block['sessionToken'] = $_SESSION['sessionToken'];
	echo json_encode($response_block);
	exit;
}*/
if(!$test) {
	//header('HTTP/1.0 403 Forbidden');
	
	exit;
}
if(!$data->databaseId || !$data->postType) {
	echo json_encode(array("pw" => $testPw));
	exit; 
}

$ch = curl_init( $url );
$id = "232";
$request =  <<<INFO
{
	{$data->postType}(id: {$data->databaseId}, idType: DATABASE_ID) {
	  id
	  content
	}
  }
INFO;
//var_dump($request);
$payload = json_encode( array( "query"=> $request) ); 
curl_setopt( $ch, CURLOPT_POSTFIELDS, $payload );
curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
# Send request.
$result = curl_exec($ch);
curl_close($ch);
# Print response.
//echo "<pre>$result</pre>";
$value = json_decode($result);
echo json_encode(array(
	"pw" => $testPw,
	"payload"=>$value,
	"content" => $value->content
));
  exit;
