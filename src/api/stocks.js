const Axios = require("axios").default;

// marketstack config
const _MarketStackBaseUrl = process.env.MARKETSTACK_API_URL;
const _MarketStackKey = process.env.MARKETSTACK_API_KEY;
// iex config
const _IexCloudBaseUrl = process.env.IEXCLOUD_API_URL;
const _IexCloudKey = process.env.IEXCLOUD_API_SECRET;

/**
 * @typedef {Object} Ticker
 * @property {String} symbol - ticker symbol
 * @property {String} name - ticker name
 * @property {String} date - date yyyy-mm-dd
 * @property {Boolen} isEnables - ticker symbol
 * @property {String} type - type
 * @property {String} iexId - iex id
 */

/**
 * Returns a random ticker via marketstack
 * @returns {Promise<Ticker>}
 */
exports.getRandomTicker = async () => {
	let request = null,
		stocks = null,
		ticker = null;

	try {
		// fetch tickers
		request = await Axios.get(`${_IexCloudBaseUrl}/v1/ref-data/symbols`, {
			params: {
				token: _IexCloudKey,
			},
		});
		// select a random ticker
		stocks = request.data.filter((item) => item.type == "cs");
		ticker = selectRandomTicker(stocks);
	} catch (error) {
		throw { stock_iex_error: error };
	}

	return ticker;
};

/**
 * Return stock quota in usd
 * @param {String} ticker - stock ticker
 * @returns {Promise<Number>}
 */
exports.getStockPrice = async (ticker) => {
	let request = null,
		price = null;

	try {
		request = await Axios.get(
			`${_MarketStackBaseUrl}/v1/tickers/${ticker}/intraday/latest`,
			{
				params: {
					access_key: _MarketStackKey,
				},
			}
		);

		stock = request.data;
		price = stock.open;
	} catch (error) {
		throw {
			stock_marketstack_error: error,
			response: error.response.data,
			ticker: ticker,
		};
	}

	return price;
};

/**
 * Returns one random ticker
 * @param {Ticker[]} list - list of tickers
 * @returns {Ticker}
 */
let selectRandomTicker = (list) => {
	if (!list) throw "list is null";
	if (list.length == 0) "list is empty";

	let max = list.length - 1;
	let randomNum = Math.floor(Math.random() * max);

	return list[randomNum];
};
