# twitter-eth-bot 🤖 🐦

This repository is home to a bot ([@one_ethereum](https://twitter.com/one_ethereum)) that tweets what you can buy with one Eth coin every hour.

---

## **Features**

The objective of this project is to track the value of one Ethereum coin and tweet an item that has an equal or less than value to the coin.

| Task                                     | Difficulty     | Status |
| ---------------------------------------- | -------------- | ------ |
| post tweets                              | easy           | ✅     |
| fetch Eth coin quota                     | easy           | ✅     |
| fetch random stock quota in USD          | intermediate   | ✅     |
| fetch random car prices in USD           | intermediate   | ⛔️    |
| fetch random product prices in USD       | intermediate   | ⛔️    |
| fetch random property prices in USD      | intermediate   | ⛔️    |
| track +/- 5% movements in Eth coin quota | hard/expensive | ⛔️    |

---

## **Getting started**

If you want to run this bot on a different twitter account then you'll have to take a look at the following steps.

### **API Keys**

Below are all the api keys that this bot uses.

> ⚠️ **`NOTE`: All the APIs below have free plans. I did not pay a single dime for the keys.**

1. [twitter api keys](https://developer.twitter.com) - so that the bot can tweet

2. [coinmarketcap api keys](https://coinmarketcap.com/api/pricing/) - so that the bot can fetch the Eth coin quota

3. [iexcloud api keys](https://iexcloud.io/pricing/) - so that the bot can fetch a list of valid stock ticker symbols. (_`fyi`: there is a pricing plan called **'get started'** which is free to use_)

4. [marketstack api keys](https://marketstack.com/product) - so that the bot can fetch the current quote for a ticker symbol

Once you have gotten your api keys, create a `.env` file in the root of this directory and copy the env variables found in the [.env.sample](./.env.sample) file.

### **Dependancies**

Once you have all the API keys, you'll need to download some crucial dependancies. You can do so by executing the following line:

> `npm install`

The line above installs:

1. axios - to make calls to the apis
2. twit - to tweet
3. dotenv - to initiate env variables (the api keys) immediately.

### **Running The Bot**

Once you have all the keys and dependancies in place, you can start the bot by entering the follwiing line:

> `npm run bot`
