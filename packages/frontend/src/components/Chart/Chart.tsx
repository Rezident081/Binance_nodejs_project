import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { ISignal } from "../../utils/types";
import { Signals } from "../../utils/constants";

interface IChartProps {
  candleData: any[];
  signals: ISignal[];
}

const colors_map = {
  [Signals.BUY]: "green",
  [Signals.SELL]: "red",
};

function Chart({ candleData, signals }: IChartProps) {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "candlestick",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: false,
      },
    },
    annotations: {
      points: [
        ...signals.map((signal) => {
          const findCandle = candleData.find(
            (candle) => candle[0] === signal.id
          );
          if (!findCandle) return { x: 0, y: 0, label: { text: "" } };

          const [date, open, close, high, low, volume] = findCandle;
          const formattedDate = new Date(date).toLocaleDateString("ua");

          return {
            x: signal.id,
            y: close > open ? low : high,
            label: {
              borderColor: colors_map[signal.type],
              fillColor: colors_map[signal.type],
              style: {
                color: colors_map[signal.type],
              },
              text: `Дата: ${formattedDate}, Цена закрытие: ${close}, Объем: ${volume}`,
            },
          };
        }),
      ],
    },
  };

  const series = [
    {
      name: "series-1",
      data: (candleData || []).map((candle: any) => ({
        x: new Date(candle[0]),
        y: candle.slice(1, 5),
      })),
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="candlestick"
      height={700}
    />
  );
}

export default Chart;
