const ccxt = require("ccxt").pro;
const { DEFAULT_SYMBOL, DEFAULT_TIMEFRAME } = require("../constants");

class Binance_api {
  constructor() {
    this.client = new ccxt.binance({
      apiKey: "",
      secret: "",
    });
  }

  static get_three_month_ago() {
    const now = new Date();
    const sixMonthAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()).getTime();

    return sixMonthAgo;
  }

  async fetch_usdt_tickers() {
    await this.client.loadMarkets();
    const tickers = await this.client.fetchTickers();
    
    const usdtTickers = Object.keys(tickers).reduce((filtered, symbol) => {
      const market = this.client.markets[symbol];

      if (symbol.endsWith('USDT') && market && market.spot && market.active) {
        filtered[symbol] = tickers[symbol];
      }
      return filtered;
    }, {});

    return Object.keys(usdtTickers);
  }

  async fetch_ohlcv(
    symbol = DEFAULT_SYMBOL,
    timeframe = DEFAULT_TIMEFRAME,
    limit = 1500
  ) {
    const since = Binance_api.get_three_month_ago();

    try {
      const ohlcv = await this.client.fetchOHLCV(
        symbol,
        timeframe,
        since,
        limit
      );
      return ohlcv;
    } catch (error) {
      console.error(error);
    }
  }

  async watch_ohlcv(symbol = DEFAULT_SYMBOL, timeframe = DEFAULT_TIMEFRAME, callback) {
    try {
      while (true) {
        const ohlcv = await this.client.watchOHLCV(symbol, timeframe);
        callback(ohlcv);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { Binance_api };
