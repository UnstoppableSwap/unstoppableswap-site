import { useEffect, useState } from "react";
import {
  makeStyles,
  Box,
  Paper,
  Typography,
  TextField,
  LinearProgress,
  Fab,
  Button,
} from "@material-ui/core";
import useStore from "../store";
import ProviderSelect from "./provider-select-dialog/ProviderSelect";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { satsToBtc } from "../convert-utils";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import ProviderSubmitDialog from "./provider-select-dialog/ProviderSubmitDialog";
import DownloadDialog from "./DownloadDialog";

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
    padding: theme.spacing(1),
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

export const SwapWidget = () => {
  const classes = useStyles();
  const currentProvider = useStore((state) => state.currentProvider);
  const providerList = useStore((state) => state.providerList);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  const [showSubmitProviderDialog, setShowSubmitProviderDialog] = useState(
    false
  );
  const [btcFieldValue, setBtcFieldValue] = useState(0.02);
  const [xmrFieldValue, setXmrFieldValue] = useState(1);

  const showSubmitDialogOpenButton = () =>
    Array.isArray(providerList) && providerList.length === 0;

  const onBtcAmountChange = (event) => {
    setBtcFieldValue(event.target.value);
  };

  const updateXmrValue = () => {
    const parsedBtcAmount = Number(btcFieldValue);
    if (isNaN(parsedBtcAmount) || currentProvider === undefined) {
      setXmrFieldValue(0);
    } else {
      const convertedXmrAmount =
        parsedBtcAmount / satsToBtc(currentProvider.price);
      setXmrFieldValue(convertedXmrAmount);
    }
  };

  const getBtcFieldError = () => {
    const parsedBtcAmount = Number(btcFieldValue);
    if (currentProvider === undefined) {
      return "Undefined provider";
    } else if (isNaN(parsedBtcAmount)) {
      return "This is not a valid number";
    } else if (parsedBtcAmount < satsToBtc(currentProvider.minSwapAmount)) {
      return `The minimum swap amount is ${satsToBtc(
        currentProvider.minSwapAmount
      )} BTC`;
    } else if (parsedBtcAmount > satsToBtc(currentProvider.maxSwapAmount)) {
      return `The maximum swap amount is ${satsToBtc(
        currentProvider.maxSwapAmount
      )} BTC`;
    }
    return false;
  };

  useEffect(updateXmrValue, [btcFieldValue, currentProvider]);

  useEffect(() => {
    if (getBtcFieldError() && currentProvider !== undefined) {
      setBtcFieldValue(satsToBtc(currentProvider.minSwapAmount));
    }
  }, [currentProvider]);

  if (currentProvider !== undefined) {
    return (
      <Box className={classes.outer}>
        <Box className={classes.inner} component={Paper} elevation={15}>
          <Title />
          <TextField
            label="Send"
            size="medium"
            variant="outlined"
            value={btcFieldValue}
            onChange={onBtcAmountChange}
            error={!!getBtcFieldError()}
            helperText={getBtcFieldError()}
            autoFocus
            InputProps={{
              endAdornment: <InputAdornment position="end">BTC</InputAdornment>,
            }}
          />
          <Box className={classes.swapIconOuter}>
            <ArrowDownwardIcon fontSize="small" />
          </Box>
          <TextField
            label="Receive"
            variant="outlined"
            size="medium"
            value={parseFloat(xmrFieldValue).toFixed(4)}
            InputProps={{
              endAdornment: <InputAdornment position="end">XMR</InputAdornment>,
            }}
          />
          <ProviderSelect />
          <Fab
            variant="extended"
            color="primary"
            disabled={!!getBtcFieldError()}
            onClick={() => setShowDownloadDialog(true)}
          >
            <SwapHorizIcon className={classes.swapIcon} />
            Swap
          </Fab>
          <DownloadDialog open={showDownloadDialog} onClose={() => setShowDownloadDialog(false)} />
        </Box>
      </Box>
    );
  } else {
    return (
      <Box className={classes.outer}>
        <Box className={classes.inner} component={Paper} elevation={15}>
          <Title />
          <LinearProgress />
          {showSubmitDialogOpenButton() ? (
            <Button onClick={() => setShowSubmitProviderDialog(true)}>
              Submit swap provider
            </Button>
          ) : null}
        </Box>
        <ProviderSubmitDialog
          open={showSubmitProviderDialog}
          onClose={() => setShowSubmitProviderDialog(false)}
        />
      </Box>
    );
  }
};

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

export default SwapWidget;
