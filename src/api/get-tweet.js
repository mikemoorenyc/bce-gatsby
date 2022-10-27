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
 
