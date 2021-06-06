/**
 * Returns a text for stock tweets
 * @param {String} conversion - conversion rate from Eth coin to stock
 * @param {String} symbol - symbol of stock
 * @param {String} name - name of stock organiztion
 * @returns {String}
 */
exports.buildStockTweet = (conversion, symbol, name) => {
	return `One Eth can get you ${conversion} shares of ${symbol}. (a.k.a ${name})`;
};

