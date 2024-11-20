import { BarChart } from "@mui/x-charts/BarChart";
import React, { useEffect, useState } from "react";
import { satsToBtc } from "../utils";
import { Divider } from "@material-ui/core";

interface DataPoint {
  date: string;
  liquidity: number;
}

export function LiquidityGraph() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetch("https://api.unstoppableswap.net/api/liquidity-last-year-stats")
      .then((response) => response.json())
      .then((rawData) => {
        const currentYear = new Date().getFullYear();

        const formattedData: DataPoint[] = rawData
          .filter(
            ([date]: [string, number]) =>
              new Date(date).getFullYear() === currentYear,
          )
          .map(([date, liquidity]: [string, number]) => ({
            date: new Date(date).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            }),
            liquidity,
          }));

        setData(formattedData);
      })
      .catch((error) => console.error("Error fetching liquidity data:", error));
  }, []);

  return data.length > 0 ? (
    <>
      <Divider style={{ width: "100%" }} />
      <BarChart
        xAxis={[
          {
            data: data.map((item) => item.date),
            scaleType: "band",
            tickLabelStyle: { fill: "white" }, // X-axis text color
          },
        ]}
        yAxis={[
          {
            label: "Total liquidity (BTC)",
            labelStyle: { fill: "white" }, // Y-axis label color
            fill: "white",
          },
        ]}
        series={[
          {
            data: data.map((item) => satsToBtc(item.liquidity)),
            color: "#f4511e",
          },
        ]}
        height={300}
        tooltip={{
          trigger: "none",
        }}
        sx={{
          "& .MuiChartsLegend-label": {
            fill: "white", // Legend text color
          },
        }}
      />
    </>
  ) : null;
}

export default LiquidityGraph;
