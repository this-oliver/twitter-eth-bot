require("dotenv").config();
const { getStockData, tweetStocks } = require("./tasks");
const OneHour = 3600000; // 3,600,000 ms = 1 hour

// task
async function execute() {
	console.log("fetching data...");

	try {
		let data = await getStockData();
		await tweetStocks(data.conversion, data.ticker.symbol, data.ticker.name);
		console.log("updated status!");
	} catch (error) {
		console.log(error);
	}
}

// execute task immediately
execute();

//execute task every hour
setInterval(execute, OneHour);
