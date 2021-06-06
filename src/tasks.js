const Coins = require("./api/coins");
const Stock = require("./api/stocks");
const Symbols = require("./helpers/symbols");
const Converter = require("./helpers/converter");

const Twitter = require("./api/twitter");
const TweetBuilder = require("./helpers/tweetBuilder");

exports.getStockData = async () => {
	let ethPrice = null,
		ticker = null,
		stockPrice = null;

	try {
		// get Eth price
		ethPrice = await Coins.getCryptoPrice(Symbols.ETH, Symbols.USD);
		// get Stock price
		ticker = await Stock.getRandomTicker();
		stockPrice = await Stock.getStockPrice(ticker.symbol);
	} catch (error) {
		throw error;
	}

	return {
		ethPrice,
		ticker,
		stockPrice,
		conversion: Converter.CoinToStock(ethPrice, stockPrice),
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
