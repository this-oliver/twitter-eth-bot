require("dotenv").config();

const { getStockData, tweetStocks } = require("./tasks");
const Moment = require("moment");
const OneHour = 3600000; // 3,600,000 ms = 1 hour
let LastTweetTime = null;

// task
async function execute() {
	let hasBeenAnHour = false;
	let stock = null;
	let tweet = null;

	// is true if first time tweeting or the last tweet was an hour ago
	hasBeenAnHour =
		LastTweetTime == null || Moment().isAfter(LastTweetTime, "hour");

	if (hasBeenAnHour) {
		console.log("fetching data...");

		// fetch stocks until you get something
		try {
			stock = await getStockData();
			console.log(stock);

			tweet = await tweetStocks(
				stock.conversion,
				stock.ticker.symbol,
				stock.ticker.name
			);
			console.log(tweet);

			LastTweetTime = Moment(
				tweet.created_at,
				"ddd MMM DD HH:mm:ss Z YYYY"
			).fromNow();

			console.log("updated status!");
		} catch (error) {
			console.log(error);
		}
	}
}

// execute task immediately
execute();

//execute task every hour
setInterval(execute, OneHour);
