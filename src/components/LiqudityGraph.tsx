import { makeStyles, Paper, Typography } from "@material-ui/core";
import { BarChart } from "@mui/x-charts/BarChart";
import React, { useEffect, useState } from "react";
import { satsToBtc } from "../utils";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    height: 400,
    marginTop: theme.spacing(2),
    width: "100%",
    backgroundColor: theme.palette.background.paper, // Ensure contrast with white text
  },
  title: {
    marginBottom: theme.spacing(2),
    color: "white", // Change title color to white
  },
}));

interface DataPoint {
  date: string;
  liquidity: number;
}

const LiquidityGraph: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetch("https://api.unstoppableswap.net/api/liquidity-last-year-stats")
      .then((response) => response.json())
      .then((rawData) => {
        const formattedData = rawData.map(
          ([date, liquidity]: [string, number]) => ({
            date: new Date(date).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            }),
            liquidity,
          }),
        );
        setData(formattedData);
      })
      .catch((error) => console.error("Error fetching liquidity data:", error));
  }, []);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" className={classes.title}>
        Liquidity Over Time
      </Typography>
      {data.length > 0 && (
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
              tickLabelStyle: { fill: "white" }, // Y-axis tick label color
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
      )}
    </Paper>
  );
};

export default LiquidityGraph;
