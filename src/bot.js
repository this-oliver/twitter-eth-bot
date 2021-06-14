require("dotenv").config();
const { getStockData, tweetStocks } = require("./tasks");

const Moment = require("moment");
const LastTweetTime = null;

const OneHour = 3600000; // 3,600,000 ms = 1 hour

// task
async function execute() {
	try {
		if (LastTweetTime == null || Moment().isAfter(LastTweetTime, "hour")) {
			console.log("fetching data...");
			let stock = await getStockData();
			let tweet = await tweetStocks(
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
	} catch (error) {
		console.log(error);
	}
}

// execute task immediately
execute();

//execute task every hour
setInterval(execute, OneHour);
