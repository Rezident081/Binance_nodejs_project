const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const { Binance_api } = require("./services/Binance");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});
const port = 9999;
const binance = new Binance_api();

app.use(cors());

io.on("connection", (socket) => {
  socket.on("watch_candles", (data) => {
    const { symbol, timeframe } = data;

    binance
      .watch_ohlcv(symbol, timeframe, (ohlcv) => {
        socket.emit("ohlcv", ohlcv);
      })
      .catch((error) => {
        console.error(error);
        socket.emit("error", error);
      });
  });
});

app.get("/candles", async (req, res) => {
  try {
    const symbol = req.query.symbol;
    const timeframe = req.query.timeframe;

    const ohlcv = await binance.fetch_ohlcv(symbol, timeframe);
    res.json(ohlcv);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/tickers", async (req, res) => {
  try {
    const ohlcv = await binance.fetch_usdt_tickers();
    res.json(ohlcv);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
