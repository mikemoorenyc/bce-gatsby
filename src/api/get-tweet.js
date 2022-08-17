<?php
header("Access-Control-Allow-Origin: *");



require_once("twitterexchange.php"); 
$access_token = "4332046835-uEvGrWf1gWcge1nBqkia1Dds9DYaLC8KjoQRz8W";
$access_token_secret = "J8FsUHiHspodBnIRLbopG6bMK1nXVffHu6N0SLsU7ZvZv";
$consumer_key = "YhBAr1xxxLkmSvjXrs1oZhOXn";
$consumer_secret = "gXUhuCeZ9L24J6oht6rMFaOJrmp7EAiXlCURwIAbc7I9xY8z14";

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
