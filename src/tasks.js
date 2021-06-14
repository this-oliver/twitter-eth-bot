const Moment = require("moment");

const Coins = require("./api/coins");
const Stock = require("./api/stocks");
const Twitter = require("./api/twitter");

const Symbols = require("./helpers/symbols");
const Converter = require("./helpers/converter");
const TweetBuilder = require("./helpers/tweetBuilder");

let LastTweetTime = null;
let hasBeenAnHour = false;
let stock = null;
let tweet = null;

/**
 * Returns stock data
 * @returns {Object}
 */
exports.getStockData = async () => {
	let _ethQuota = null;
	let _ticker = null;
	let _stockQuota = null;

	while (_ethQuota == null) {
		try {
			_ethQuota = await Coins.getCryptoPrice(Symbols.ETH, Symbols.USD);
		} catch (error) {
			throw error;
		}
	}

	while (_ticker == null) {
		try {
			_ticker = await Stock.getRandomTicker();
		} catch (error) {
			throw error;
		}
	}

	while (_stockQuota == null) {
		try {
			_stockQuota = await Stock.getstockQuota(_ticker.symbol);
		} catch (error) {
			throw error;
		}
	}

	return {
		ethQuota: _ethQuota,
		ticker: { symbol: _ticker.symbol, name: _ticker.name },
		stockQuota: _stockQuota,
		conversion: Converter.CoinToStock(_ethQuota, _stockQuota),
	};
};

/**
 * Tweets stock data and returns tweet object
 * @param {Number} _conversion - conversion rate for stock to eth coin
 * @param {String} _symbol - stock symbol
 * @param {String} _name - stock name
 * @returns {Object}
 */
exports.tweetStocks = async (_conversion, _symbol, _name) => {
	try {
		let _text = TweetBuilder.buildStockTweet(_conversion, _symbol, _name);
		let _tweet = await Twitter.tweet(_text);

		return {
			id: _tweet.id,
			created_at: _tweet.created_at,
			text: _tweet.text,
		};
	} catch (error) {
		throw error;
	}
};

/**
 * Fetches stock data and tweets it
 */
exports.execute = async () => {
	try {
		// is true if first time tweeting or the last tweet was an hour ago
		hasBeenAnHour =
			LastTweetTime == null || Moment().isAfter(LastTweetTime, "hour");

		if (hasBeenAnHour) {
			console.log("fetching data...");

			stock = await this.getStockData();

			tweet = await this.tweetStocks(
				stock.conversion,
				stock.ticker.symbol,
				stock.ticker.name
			);

			console.log({ stock: stock, tweet: tweet });

			LastTweetTime = Moment(
				tweet.created_at,
				"ddd MMM DD HH:mm:ss Z YYYY"
			).fromNow();

			console.log("updated status!");
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * Returns static data from latest api calls
 * @returns {Object}
 */
exports.getStaticData = () => {
	return {
		stock,
		tweet,
		LastTweetTime,
		hasBeenAnHour,
	};
};
