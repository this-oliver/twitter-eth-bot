require("dotenv").config();

const CoinMarketCap = require("./api/coinmarketcap");
const CoinMarketCapHelper = require("./helpers/currency-symbols");

let eth = CoinMarketCapHelper.EthSymbol;
let btc = CoinMarketCapHelper.BtcSymbol;
let eur = CoinMarketCapHelper.EuroSymbol;

CoinMarketCap.getPrice(eth, eur)
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log({ error: err });
	});
