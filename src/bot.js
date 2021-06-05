require("dotenv").config();

const CoinMarketCap = require("./api/coinmarketcap");
const CoinMarketCapHelper = require("./helpers/currency-symbols");

const Twitter = require("./api/twitter");

Twitter.tweet("time to track Eth coins")
	.then((data) => {
		console.log(data);
	})
	.catch((err) => {
		console.log(err);
	});
