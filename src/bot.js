require("dotenv").config();
const { getStockData, tweetStocks } = require("./tasks");

const Moment = require("moment");
const LastTweetTime = null;

const OneHour = 3600000; // 3,600,000 ms = 1 hour

// task
async function execute() {
	let hasBeenAnHour = false,
		stock = null,
		tweet = null;

	// is true if first time tweeting or the last tweet was an hour ago
	hasBeenAnHour =
		LastTweetTime == null || Moment().isAfter(LastTweetTime, "hour");

	if (hasBeenAnHour) {
		console.log("fetching data...");

		// fetch stocks until you get something
		while (stock == null) {
			try {
				stock = await getStockData();
			} catch (error) {
				console.log(error);
			}
		}

		tweet = await tweetStocks(
			stock.conversion,
			stock.ticker.symbol,
			stock.ticker.name
		);

		console.log("updated status!");

		LastTweetTime = Moment(
			tweet.created_at,
			"ddd MMM DD HH:mm:ss Z YYYY"
		).fromNow();
	}
}

// execute task immediately
execute();

//execute task every hour
setInterval(execute, OneHour);
