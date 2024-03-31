import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { ISignal, CandleDef } from "../../utils/types";
import { Signals } from "../../utils/constants";

interface IChartProps {
  candleData: CandleDef[][];
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
      points: signals.map((signal) => {
        const findCandle = candleData.find(
          ([timestamp]) => timestamp === signal.id
        );
        if (!findCandle) return { x: 0, y: 0, label: { text: "" } };

        const [timestamp, open, high, low, close, volume] = findCandle;
        const maxVal = Math.max(open, close, high, low);
        const minVal = Math.min(open, close, high, low);
        const formattedDate = new Date(timestamp).toLocaleDateString("ua");

        return {
          x: signal.id,
          y: signal.type === Signals.BUY ? minVal : maxVal,
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
    },
  };

  const series = [
    {
      name: "series-1",
      data: (candleData || []).map(
        ([timestamp, open, high, low, close]: CandleDef[]) => ({
          x: new Date(timestamp),
          y: [open, high, low, close],
        })
      ),
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
