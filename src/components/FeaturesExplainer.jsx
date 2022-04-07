import { useState } from "react";
import { makeStyles, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  outer: {
    display: "flex",
  },
  selectionSidebar: {
    paddingRight: theme.spacing(2),
  },
  explainerBox: {
    flex: 1,
    "& a": {
      color: "inherit",
      textDecoration: "none",
    },
    "& a:hover": {
      textDecoration: "underline",
    },
  },
}));

export const FeaturesExplainer = () => {
  const explanations = [
    <>
      Inspired by the original idea of cryptocurrency, we believe that anonymity
      is a right of our users. No registration or provision of personal data on
      UnstoppableSwap.
    </>,
    <>
      Because we use atomic swaps you don't have to trust us at all. The whole
      swapping process is completely trustless and facilated using the{" "}
      <a href="https://comit.network/blog/2020/11/20/xmr-btc-prototype">
        COMIT XMR-BTC Atomic Swap protocol.
      </a>{" "}
      We can't steal or freeze your funds even if we wanted to.
    </>,
    <>
      We will NEVER use KYC. We don't need or want to know who you are, what
      jurisidiction your are from or who rules your country.
    </>,
  ];
  const classes = useStyles();
  const [selectedFeature, setSelectedFeature] = useState(0);

  return (
    <Box className={classes.outer}>
      <Box className={classes.selectionSidebar}>
        <Typography variant="h6" onClick={() => setSelectedFeature(0)}>
          Anonymous
        </Typography>
        <Typography variant="h6" onClick={() => setSelectedFeature(1)}>
          Trustless
        </Typography>
        <Typography variant="h6" onClick={() => setSelectedFeature(2)}>
          No KYC
        </Typography>
      </Box>
      <Box className={classes.explainerBox}>
        <Typography variant="h5">{explanations[selectedFeature]}</Typography>
      </Box>
    </Box>
  );
};

export default FeaturesExplainer;
