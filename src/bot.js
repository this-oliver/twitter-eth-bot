require("dotenv").config();
const { getStockData, tweetStocks } = require("./tasks");
const OneHour = 3600000; // 3,600,000 ms = 1 hour

// task
async function execute() {
	let data = null,
		tweet = null;

	console.log("fetching data...");

	try {
		data = await getStockData();
		tweet = await tweetStocks(
			data.conversion,
			data.ticker.symbol,
			data.ticker.name
		);

		console.log({
			data: {
				eth: data.ethQuota,
				stock: data.stockQuota,
				ticker: data.ticker.symbol,
				conversion: data.conversion,
			},
			tweet: {
				id: tweet.id,
				text: tweet.text,
				createdAt: tweet.created_at,
			},
		});
	} catch (error) {
		console.log(error);
	}
}

// execute task immediately
execute();

//execute task every hour
setInterval(execute, OneHour);
