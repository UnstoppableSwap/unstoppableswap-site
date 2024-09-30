import {
  Box,
  Divider,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStore from "../store";
import LiquidityGraph from "./LiqudityGraph";
import { SatsAmount } from "./Units";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2, 0),
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
    overflowX: "auto",
    width: "100%",
  },
  paperVertical: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    minWidth: 120,
  },
  infoItemVertical: {
    width: "100%",
  },
  divider: {
    height: 50,
    margin: theme.spacing(0, 2),
  },
  dividerHorizontal: {
    width: "100%",
    margin: theme.spacing(2, 0),
  },
}));

export default function LiquidityInfo() {
  const classes = useStyles();
  const theme = useTheme();
  const isNarrowScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const providers = useStore(
    (state) =>
      state.providerList?.filter((provider) => !provider.testnet) || [],
  );

  const [totalLiquidity, setTotalLiquidity] = useState(0);
  const [maxSwapAmount, setMaxSwapAmount] = useState(0);
  const [minSwapAmount, setMinSwapAmount] = useState(0);

  useEffect(() => {
    if (providers.length > 0) {
      setTotalLiquidity(
        providers.reduce((sum, provider) => sum + provider.maxSwapAmount, 0),
      );
      setMaxSwapAmount(Math.max(...providers.map((p) => p.maxSwapAmount)));
      setMinSwapAmount(Math.min(...providers.map((p) => p.minSwapAmount)));
    }
  }, [providers]);

  const infoItems: [string, number][] = [
    ["Total Liquidity", totalLiquidity],
    ["Maximum Swap", maxSwapAmount],
    ["Minimum Swap", minSwapAmount],
  ];

  return (
    <Box className={classes.root}>
      <Paper
        className={`${classes.paper} ${isNarrowScreen ? classes.paperVertical : ""}`}
        elevation={3}
      >
        {infoItems.map(([label, amount], index) => (
          <React.Fragment key={index}>
            {index > 0 &&
              (isNarrowScreen ? (
                <Divider className={classes.dividerHorizontal} />
              ) : (
                <Divider
                  orientation="vertical"
                  flexItem
                  className={classes.divider}
                />
              ))}
            <div
              className={`${classes.infoItem} ${isNarrowScreen ? classes.infoItemVertical : ""}`}
            >
              <Typography variant="h6" gutterBottom>
                <SatsAmount amount={amount} />
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {label}
              </Typography>
            </div>
          </React.Fragment>
        ))}
      </Paper>
      <LiquidityGraph />
    </Box>
  );
}
