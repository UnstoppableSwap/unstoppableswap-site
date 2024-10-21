import useStore from "../store";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  FormControlLabel,
  Box,
  CircularProgress,
  LinearProgress,
  TableBody,
  Typography,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import IconButton from "@mui/material/IconButton";
import CopyIcon from "@mui/icons-material/FileCopy";
import { useState } from "react";
import clipboard from "clipboardy";

function satsToBtc(sats: number): number {
  return sats / 100000000;
}

function getCombinedMultiAddr(provider: {
  multiAddr: string;
  peerId: string;
}): string {
  return `${provider.multiAddr}/p2p/${provider.peerId}`;
}

function ProviderCopyButton(provider: { multiAddr: string; peerId: string }) {
  return (
    (<IconButton
      onClick={() => {
        clipboard.write(getCombinedMultiAddr(provider));
      }}
      size="large">
      <CopyIcon />
    </IconButton>)
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    maxWidth: "90vw",
  },
}));

export default function ProviderTable() {
  const classes = useStyles();
  const providers = useStore((state) => {
    // Return null if state.providerList is null, return state.providerList filtered otherwise
    return state.providerList
      ? state.providerList.filter((provider) => !provider.testnet)
      : null;
  });

  return (
    <Box className={classes.root}>
      <TableContainer component={Paper} className={classes.container}>
        <Box
          style={{
            padding: "1rem",
          }}
        >
          <Typography variant="caption">
            In case you insist on using a different software from the GUI, you
            can still make use of this list of market makers to connect with.
          </Typography>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>MultiAddr</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Max Swap Amount</TableCell>
              <TableCell>Min Swap Amount</TableCell>
              <TableCell>Copy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {providers ? (
              providers.map((provider, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {getCombinedMultiAddr(provider).substring(0, 20) + "..."}
                    </TableCell>
                    <TableCell>
                      {satsToBtc(provider.price).toFixed(5)} BTC/XMR
                    </TableCell>
                    <TableCell>
                      {satsToBtc(provider.maxSwapAmount).toFixed(5)} BTC
                    </TableCell>
                    <TableCell>
                      {satsToBtc(provider.minSwapAmount).toFixed(5)} BTC
                    </TableCell>
                    <TableCell>
                      <ProviderCopyButton
                        multiAddr={provider.multiAddr}
                        peerId={provider.peerId}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
