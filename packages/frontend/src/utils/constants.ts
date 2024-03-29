export const DEFAULT_URL = 'http://localhost:9999';
export const DEFAULT_WS_URL = 'ws://localhost:9999';
export const DEFAULT_TICKERS_URL = `${DEFAULT_URL}/tickers`;
export const DEFAULT_CANDLES_URL = `${DEFAULT_URL}/candles`;
export const DEFAULT_TICKER = 'BTC/USDT';

export enum Timeframe {
    FOUR_HOUR = '4h',
    ONE_DAY = '1d',
    ONE_WEEK = '1w',
    ONE_MONTH = '1M',
}

export enum Signals{
    BUY = 'buy',
    SELL ='sell'
}