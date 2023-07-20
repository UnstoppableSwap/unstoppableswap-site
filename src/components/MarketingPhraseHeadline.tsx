import { useEffect, useState } from "react";
import { Typography, makeStyles } from "@material-ui/core";

const WORD_CHANGE_INTERVAL_SECS = 3;

const useStyles = makeStyles({
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
});

export const MarketingPhraseHeadline = () => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  const strings = [
    "trustlessly",
    "anonymously",
    "securely",
    "without KYC",
    "without risk",
    "freely",
    "reliably",
    "peer-to-peer"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % strings.length);
    }, WORD_CHANGE_INTERVAL_SECS * 1000);
    return () => clearInterval(interval);
  }, [strings.length]);

  return (
      <Typography variant="h3" display="inline" className={classes.headline}>
        Exchange Bitcoin for Monero
        <Typography variant="inherit" color="primary" className={classes.fadeInOut}>
          {" " + strings[index]}
        </Typography>
      </Typography>
  );
};

export default MarketingPhraseHeadline;
