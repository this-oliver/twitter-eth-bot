/**
 * Returns a text for stock tweets
 * @param {Number} conversion - conversion rate from Eth coin to stock
 * @param {String} symbol - symbol of stock
 * @param {String} name - name of stock organiztion
 * @returns {String}
 */
exports.buildStockTweet = (conversion, symbol, name) => {
	return `An Eth coin can get you ${conversion} shares of ${name} $${symbol} #eth #ethereum #crypto`;
};
