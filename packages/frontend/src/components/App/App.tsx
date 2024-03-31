import React from "react";
import Search from "../Search/Search";
import Controlls from "../Controlls/Controlls";
import Chart from "../Chart/Chart";
import axios, { AxiosResponse } from "axios";
import io from "socket.io-client";

import {
  DEFAULT_TICKERS_URL,
  DEFAULT_CANDLES_URL,
  DEFAULT_WS_URL,
  Timeframe,
  Signals,
  DEFAULT_TICKER,
} from "../../utils/constants";
import { randomIntFromInterval } from "../../utils/utils";
import { ISignal, CandleDef } from "../../utils/types";

function App() {
  const [allTickers, setAllTickers] = React.useState([]);
  const [timeframe, setTimeframe] = React.useState(Timeframe.ONE_DAY);
  const [candles, setCandles] = React.useState<CandleDef[][]>([]);
  const [symbol, setSymbol] = React.useState<string>(DEFAULT_TICKER);
  const [isRealTime, setIsRealTime] = React.useState(false);
  const [signals, setSignals] = React.useState<ISignal[]>([]);

  React.useEffect(() => {
    axios.get(DEFAULT_TICKERS_URL).then(({ data }: AxiosResponse) => {
      setAllTickers(data);
    });
  }, []);

  React.useEffect(() => {
    if (!isRealTime) {
      return;
    }

    const socket = io(DEFAULT_WS_URL);

    socket.on("connect", () => {
      console.log("Connected to websocket");
      socket.emit("watch_candles", { symbol: symbol, timeframe: timeframe });
    });

    socket.on("ohlcv", (newOhlcv) => {
      console.info("last price:", newOhlcv[0][4]);

      setCandles((currentCandles) => {
        const lastIndex = currentCandles.length - 1;
        if (
          currentCandles.length > 0 &&
          currentCandles[lastIndex][0] === newOhlcv[0][0]
        ) {
          return [...currentCandles.slice(0, lastIndex), newOhlcv[0]];
        }
        return [...currentCandles, newOhlcv[0]];
      });
    });

    socket.on("error", (error) => {
      console.error("WebSocket Error:", error);
    });

    return () => {
      console.info("Websocket was disconected");
      socket.disconnect();
    };
  }, [symbol, timeframe, isRealTime]);

  React.useEffect(() => {
    if (!symbol) {
      setCandles([]);
      return;
    }
    axios
      .get(DEFAULT_CANDLES_URL, { params: { symbol, timeframe } })
      .then(({ data }: AxiosResponse) => {
        setCandles(data);
      });
  }, [symbol, timeframe]);

  const handleChangeSymbol = React.useCallback((symbol: string) => {
    setSymbol(symbol);
    setSignals([]);
  }, []);

  const handleChangeTimeframe = React.useCallback((timeframe: Timeframe) => {
    setTimeframe(timeframe);
    setSignals([]);
  }, []);

  const handleRealTimeToggle = React.useCallback(() => {
    setIsRealTime(!isRealTime);
  }, [isRealTime]);

  const handleSignalClick = React.useCallback(
    (signal: Signals) => {
      const randomIndex = randomIntFromInterval(0, candles.length - 1)
      const [timestamp] = candles[randomIndex];

      setSignals(oldSignals => [...oldSignals, {type: signal, id: timestamp}]);
    },
    [candles]
  );

  const SearchComponent = React.useMemo(() => {
    return (
      <Search
        options={allTickers}
        value={DEFAULT_TICKER}
        handleChangeSymbol={handleChangeSymbol}
      />
    );
  }, [allTickers, handleChangeSymbol]);

  const ControllsComponent = React.useMemo(() => {
    return (
      <Controlls
        handleChangeTimeframe={handleChangeTimeframe}
        handleRealTimeToggle={handleRealTimeToggle}
        handleSignalClick={handleSignalClick}
        isDisabled={!symbol || !candles.length}
        isRealTime={isRealTime}
      />
    );
  }, [
    symbol,
    candles,
    isRealTime,
    handleSignalClick,
    handleRealTimeToggle,
    handleChangeTimeframe,
  ]);

  const ChartComponent = React.useMemo(() => {
    return <Chart candleData={candles} signals={signals} />;
  }, [candles, signals]);

  return (
    <div className="App">
      {SearchComponent}
      {ControllsComponent}
      {ChartComponent}
    </div>
  );
}

export default App;
