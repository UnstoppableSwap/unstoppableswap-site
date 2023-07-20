import { ChangeEvent, useEffect, useState } from "react";
import {
  makeStyles,
  Box,
  Paper,
  Typography,
  TextField,
  LinearProgress,
  Button,
} from "@material-ui/core";
import useStore from "../store";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { satsToBtc } from "../convert-utils";
import DownloadButton from "./DownloadButton";

const useStyles = makeStyles((theme) => ({
  outer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  inner: {
    width: "min(480px, 100%)",
    minHeight: "150px",
    display: "grid",
    padding: theme.spacing(1.5),
    gridGap: theme.spacing(1),
  },
  header: {
    padding: 0,
  },
  headerText: {
    padding: theme.spacing(1),
  },
  providerInfo: {
    padding: theme.spacing(1),
  },
  swapIconOuter: {
    display: "flex",
    justifyContent: "center",
  },
  swapIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Title = () => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Typography variant="h5" className={classes.headerText}>
        Swap BTC for XMR
      </Typography>
    </Box>
  );
};

export const SwapWidget = () => {
  const classes = useStyles();

  return <DownloadButton />;
};

export default SwapWidget;
