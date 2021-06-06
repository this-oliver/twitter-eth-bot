const Axios = require("axios").default;

const _CmcBaseUrl = process.env.COINMARKETCAP_API_URL;
const _CmcKey = process.env.COINMARKETCAP_API_KEY;

/**
 * Returns fiat price (number) of crypto currency
 * @param {String} coinSymbol - Crypto currency symbol (based on cmc docs)
 * @param {String} fiatSymbol - Fiat currency symbol (based on cmc docs)
 * @returns {Promise<Number>}
 */
exports.getCryptoPrice = async (coinSymbol, fiatSymbol) => {
	let request = null,
		response = null,
		price = null;

	try {
		request = await Axios.get(
			`${_CmcBaseUrl}/v1/cryptocurrency/quotes/latest`,
			{
				headers: { "X-CMC_PRO_API_KEY": _CmcKey },
				params: {
					symbol: coinSymbol,
					convert: fiatSymbol,
				},
			}
		);
	} catch (error) {
		throw { cmc_error: error };
	}

	response = request.data.data;
	price = response[coinSymbol].quote[fiatSymbol].price;

	return price;
};
