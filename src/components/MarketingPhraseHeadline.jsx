import { useEffect, useRef } from "react";
import { Typography, makeStyles, Hidden } from "@material-ui/core";
import Typed from "typed.js";

const useStyles = makeStyles({
  headline: {
    minHeight: "2.5em",
  },
});

export const MarketingPhraseHeadline = () => {
  const classes = useStyles();
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "trustlessly",
        "anonymously",
        "securely",
        "without KYC",
        "without risk",
        "freely",
        "trustlessly",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 2000,
    };

    typed.current = new Typed(el.current, options);

    return () => {
      typed.current.destroy();
    };
  }, []);

  return (
    <Typography variant="h3" display="inline" className={classes.headline}>
      Exchange Bitcoin for Monero
      <Typography variant="inherit" color="primary">
        {" "}
        <span ref={el} />
      </Typography>
      <Hidden smDown>using Atomic Swaps</Hidden>
    </Typography>
  );
};

export default MarketingPhraseHeadline;
