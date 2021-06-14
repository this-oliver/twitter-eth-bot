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

exports.getStockData = async () => {
	let _success = false;
	let _ethQuota = null;
	let _ticker = null;
	let _stockQuota = null;

	while (_success == false) {
		try {
			// get Eth price
			_ethQuota = await Coins.getCryptoPrice(Symbols.ETH, Symbols.USD);

			// get Stock price
			_ticker = await Stock.getRandomTicker();
			_stockQuota = await Stock.getstockQuota(_ticker.symbol);

			// data captured
			_success = true;
		} catch (error) {
			throw error;
		}
	}

	return {
		ethQuota,
		ticker: { symbol: _ticker.symbol, name: _ticker.name },
		stockQuota,
		conversion: Converter.CoinToStock(_ethQuota, _stockQuota),
	};
};

exports.tweetStocks = async (_conversion, _symbol, _name) => {
	try {
		let _text = TweetBuilder.buildStockTweet(_conversion, _symbol, _name);
		let _tweet = await Twitter.tweet(_text);

		return {
			id: _tweet.id,
			created_at: _tweet.created_at,
			text: _tweet.text,
			tweet: _tweet.tweet,
		};
	} catch (error) {
		throw error;
	}
};

exports.execute = async () => {
	// is true if first time tweeting or the last tweet was an hour ago
	hasBeenAnHour =
		LastTweetTime == null || Moment().isAfter(LastTweetTime, "hour");

	if (hasBeenAnHour) {
		console.log("fetching data...");

		// fetch stocks until you get something
		try {
			stock = await getStockData();
			console.log(stock);

			tweet = await tweetStocks(
				stock.conversion,
				stock.ticker.symbol,
				stock.ticker.name
			);
			console.log(tweet);

			LastTweetTime = Moment(
				tweet.created_at,
				"ddd MMM DD HH:mm:ss Z YYYY"
			).fromNow();

			console.log("updated status!");
		} catch (error) {
			console.log(error);
		}
	}
};

exports.getStaticData = () => {
	return {
		stock,
		tweet,
		LastTweetTime,
		hasBeenAnHour,
	};
};
