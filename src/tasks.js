const Coins = require("./api/coins");
const Stock = require("./api/stocks");
const Symbols = require("./helpers/symbols");
const Converter = require("./helpers/converter");

const Twitter = require("./api/twitter");
const TweetBuilder = require("./helpers/tweetBuilder");

exports.getStockData = async () => {
	let success = false;
	let ethQuota = null;
	let ticker = null;
	let stockQuota = null;

	while (success == false) {
		try {
			// get Eth price
			ethQuota = await Coins.getCryptoPrice(Symbols.ETH, Symbols.USD);

			// get Stock price
			ticker = await Stock.getRandomTicker();
			stockQuota = await Stock.getstockQuota(ticker.symbol);

			// data captured
			success = true;
		} catch (error) {
			throw error;
		}
	}

	return {
		ethQuota,
		ticker,
		stockQuota,
		conversion: Converter.CoinToStock(ethQuota, stockQuota),
	};
};

exports.tweetStocks = async (conversion, symbol, name) => {
	try {
		let text = TweetBuilder.buildStockTweet(conversion, symbol, name);
		let tweet = await Twitter.tweet(text);

		return {
			id: tweet.id,
			created_at: tweet.created_at,
			text: tweet.text,
			tweet: tweet.tweet,
		};
	} catch (error) {
		throw error;
	}
};
