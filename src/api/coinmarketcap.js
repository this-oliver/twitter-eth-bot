const Axios = require("axios").default;

const BaseUrl = process.env.COINMARKETCAP_API_URI;
const CoinMarketCapKey = process.env.COINMARKETCAP_API_KEY;

/**
 * Returns fiat price (number) of crypto currency
 * @param {String} coinSymbol - Crypto currency symbol (based on cmc docs)
 * @param {String} fiatSymbol - Fiat currency symbol (based on cmc docs)
 * @returns {Promise<Number>}
 */
exports.getPrice = async (coinSymbol, fiatSymbol) => {
	let request = null,
		response = null,
		price = null;

	try {
		request = await Axios.get(`${BaseUrl}/v1/cryptocurrency/quotes/latest`, {
			headers: { "X-CMC_PRO_API_KEY": CoinMarketCapKey },
			params: {
				symbol: coinSymbol,
				convert: fiatSymbol,
			},
		});
	} catch (error) {
		throw { cmc_error: error };
	}

	response = request.data.data;
	price = response[coinSymbol].quote[fiatSymbol].price;

	return price;
};
