const Twitter = require("twit");
const TwitterBot = new Twitter({
	consumer_key: process.env.TWITTER_API_CONSUMER_KEY,
	access_token: process.env.TWITTER_API_ACCESS_TOKEN,
	consumer_secret: process.env.TWITTER_API_CONSUMER_SECRET,
	access_token_secret: process.env.TWITTER_API_ACCESS_SECRET,
});

/**
 * Tweets specidied text
 * @param {String} text - status text
 * @returns {Promise<Object>}
 */
exports.tweet = async (text) => {
	try {
		let request = await TwitterBot.post("statuses/update", { status: text });
		return request.data;
	} catch (error) {
		throw { twitter_error: error };
	}
};

/**
 * Gets latest tweets by user
 * @param {String} username - username
 * @param {Number} count - number of tweets that should be fetched
 * @returns {Promise<Object>}
 */
exports.getUserTweets = async (username, count) => {
	try {
		let request = await TwitterBot.get("statuses/user_timeline", {
			screen_name: username,
			count: count,
		});
		return request.data;
	} catch (error) {
		throw { twitter_error: error };
	}
};
