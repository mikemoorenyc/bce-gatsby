<?php
header("Access-Control-Allow-Origin: *");



require_once("twitterexchange.php"); 
$access_token = ""
$access_token_secret = ""
$consumer_key = ""
$consumer_secret = ""

$settings = array(
    'oauth_access_token' => $access_token,
    'oauth_access_token_secret' => $access_token_secret,
    'consumer_key' => $consumer_key,
    'consumer_secret' => $consumer_secret
);
$request = "https://api.twitter.com/1.1/statuses/show.json";
$method = "GET";

$get_fields = "?id=".$_GET['id'];

$twitter = new TwitterAPIExchange($settings);
$response = $twitter->setGetfield($get_fields)
                             ->buildOauth($request, $method)
                             ->performRequest();
							 
echo $response; 

die(); 
?>
