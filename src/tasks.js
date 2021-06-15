const Moment = require("moment");

const Coins = require("./api/coins");
const Stock = require("./api/stocks");
const Twitter = require("./api/twitter");

const Symbols = require("./helpers/symbols");
const Converter = require("./helpers/converter");
const TweetBuilder = require("./helpers/tweetBuilder");

let LastTweetTime = null;
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
			console.log(error);
		}
	}

	while (_ticker == null || _stockQuota == null) {
		try {
			_ticker = await Stock.getRandomTicker();
			_stockQuota = await Stock.getstockQuota(_ticker.symbol);
		} catch (error) {
			console.log(error);
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
 * Returns latest tweet by username
 * @returns {Object}
 */
exports.getLatestTweet = async () => {
	let _latestTweets = await Twitter.getUserTweets("one_ethereum", 1);
	return _latestTweets[0];
};

/**
 * Returns true if tweet time was created more than an hour ago
 * @param {String} _tweetTime - Twitter object 'created_at' attribute
 * @returns {Boolean}
 */
exports.hasBeenAnHour = (_tweetTime) => {
	let _lastTweetTime = Moment(_tweetTime, "ddd MMM DD HH:mm:ss Z YYYY");
	let _hasBeenAnHour = Moment().isAfter(_lastTweetTime, "hour");

	if (_hasBeenAnHour == false) {
		console.log(
			`Tob has tweeted in the last hour (${_lastTweetTime.format(
				"ddd, DD/MM/YYYY, HH:mm:ss"
			)}).\nNext tweet is scheduled in ${_lastTweetTime.minutes()} mins.`
		);
	}

	return _hasBeenAnHour;
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
		let _lastTweet = await this.getLatestTweet();
		let _hasBeenAnHour = this.hasBeenAnHour(_lastTweet.created_at);

		LastTweetTime = Moment(_lastTweet.created_at, "ddd MMM DD HH:mm:ss Z YYYY");

		if (_hasBeenAnHour) {
			console.log("fetching data...");

			stock = await this.getStockData();

			tweet = await this.tweetStocks(
				stock.conversion,
				stock.ticker.symbol,
				stock.ticker.name
			);

			LastTweetTime = Moment(tweet.created_at, "ddd MMM DD HH:mm:ss Z YYYY");

			console.log({ stock: stock, tweet: tweet });
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
	};
};
