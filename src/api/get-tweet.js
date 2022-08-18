import { TwitterApi } from 'twitter-api-v2';

export default async function formHandler(req, res) {
    const id = req.query.id;
    const badRequest = () => {
        return res.status(404).send();
    }
    if(!id) {
        return badRequest(); 
    }
    const userClient = new TwitterApi({
        appKey: process.env.TWITTER_APP_KEY,
        appSecret: process.env.TWITTER_CONSUMER_APP_SECRET,
        // Following access tokens are not required if you are
        // at part 1 of user-auth process (ask for a request token)
        // or if you want a app-only client (see below)
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });
      
	const tweet = await userClient.v1.singleTweet(id);
 
    return res.send(tweet);
}
 

/*
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
*/
