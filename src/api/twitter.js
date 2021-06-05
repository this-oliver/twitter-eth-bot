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
 * @returns Object
 */
exports.tweet = async (text) => {
	let request = null,
		response = null;

	try {
		request = await TwitterBot.post("statuses/update", { status: text });
	} catch (error) {
		throw { twitter_error: error };
	}

	response = request.data;
	return response;
};
