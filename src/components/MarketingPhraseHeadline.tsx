import { Box, Link, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";

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

  return (
    <Box className={classes.outer}>
      <Typography variant="h3" display="inline" className={classes.headline}>
        Exchange Bitcoin for Monero
        <Typography
          variant="inherit"
          color="primary"
          className={classes.fadeInOut}
          onAnimationIteration={() => {
            setIndex((i) => (i + 1) % strings.length);
          }}
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
        Powered by atomic swaps. Zero trust required. No
        middlemen. Pure peer-to-peer exchange through the Tor network. Complete
        privacy. Built by the community, for everyone (
        <a
          href="https://arxiv.org/pdf/2101.12332"
          style={{ color: "white", textDecoration: "underline" }}
          target="_blank"
          rel="noreferrer"
        >
          <Typography variant="inherit" display="inline">
            Read the whitepaper

          </Typography>
        </a>)
      </Typography>
    </Box>
  );
}

export default MarketingPhraseHeadline;
