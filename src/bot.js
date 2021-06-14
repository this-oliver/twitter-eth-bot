require("dotenv").config();

const express = require("express");
const app = express();

const { execute, getStaticData, getStockData } = require("./tasks");

app.get("/", (req, res) => {
	let staticData = getStaticData();
	res.status(200).send(staticData);
});

app.get("/stocks", async (req, res) => {
	try {
		let stock = await getStockData();
		res.status(200).send(staticData);
	} catch (error) {
		res.status(400).send(error);
	}
});

app.listen(process.env.PORT || 3000, () => {
	console.log("Tob is alive!");

	// execute task immediately
	execute();
	//execute task every hour (3,600,000 ms == 1 hour)
	setInterval(execute, 3600000);
});
