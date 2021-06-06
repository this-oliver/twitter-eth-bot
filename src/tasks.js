const Coins = require("./api/coins");
const Stock = require("./api/stocks");
const Symbols = require("./helpers/symbols");
const Converter = require("./helpers/converter");

const Twitter = require("./api/twitter");
const TweetBuilder = require("./helpers/tweetBuilder");

exports.getStockData = async () => {
	let ethQuota = null,
		ticker = null,
		stockQuota = null;

	try {
		// get Eth price
		ethQuota = await Coins.getCryptoPrice(Symbols.ETH, Symbols.USD);
		// get Stock price
		ticker = await Stock.getRandomTicker();
		stockQuota = await Stock.getstockQuota(ticker.symbol);
	} catch (error) {
		throw error;
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
		return await Twitter.tweet(text);
	} catch (error) {
		throw error;
	}
};
