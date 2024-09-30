import { Box, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

const WORD_CHANGE_INTERVAL_SECS = 3;

const useStyles = makeStyles((theme) => ({
  headline: {
    minHeight: "2.5em",
  },
  fadeInOut: {
    animation: `$fadeInOut ${WORD_CHANGE_INTERVAL_SECS}s linear infinite`,
  },
  "@keyframes fadeInOut": {
    "0%": { opacity: 0 },
    "20%": { opacity: 1 },
    "80%": { opacity: 1 },
    "100%": { opacity: 0 },
  },
  outer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    paddingBottom: theme.spacing(),
  },
}));

export function MarketingPhraseHeadline() {
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  const strings = [
    "trustlessly",
    "securely",
    "without risk",
    "freely",
    "reliably",
    "peer-to-peer",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % strings.length);
    }, WORD_CHANGE_INTERVAL_SECS * 1000);
    return () => clearInterval(interval);
  }, [strings.length]);

  return (
    <Box className={classes.outer}>
      <Typography variant="h3" display="inline" className={classes.headline}>
        Exchange Bitcoin for Monero
        <Typography
          variant="inherit"
          color="primary"
          className={classes.fadeInOut}
        >
          {" " + strings[index]}
        </Typography>
      </Typography>
      <Typography
        variant="subtitle1"
        style={{
          fontSize: "18px",
          opacity: 0.7,
        }}
      >
        using Atomic Swaps through UnstoppableSwap's open-source desktop
        software. No registration required. No middleman. Over the Tor network.
        Accessible to everyone.
      </Typography>
    </Box>
  );
}

export default MarketingPhraseHeadline;
