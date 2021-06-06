/**
 * Returns number of stocks that can be bought with one crypto coin
 * @param {Number} coin - value of coin in USD
 * @param {Number} stock - value of stock in USD
 * @returns {Number}
 */
exports.CoinToStock = (coin, stock) => {
	return Math.floor(coin / stock);
};
