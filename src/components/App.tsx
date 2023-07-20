import { Box, makeStyles, CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import SwapWidget from "./SwapWidget";
import MarketingPhraseHeadline from "./MarketingPhraseHeadline";
import FaqSection from "./FaqSection";
import indigo from "@material-ui/core/colors/indigo";
import Footer from "./Footer";
import FundingAlert from "./alerts/FundingAlert";
import BetaAlert from "./alerts/BetaAlert";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    minWidth: "100vw",
  },
  content: {
    width: "100%",
    maxWidth: "1170px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "grid",
    flexDirection: "column",
    padding: theme.spacing(2),
    gridGap: theme.spacing(2),
    flex: 1,
  },
}));

let theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#f4511e",
    },
    secondary: indigo,
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.main}>
        <Box className={classes.content}>
          <MarketingPhraseHeadline />
          <SwapWidget />
          <BetaAlert />
          <FundingAlert />
          <FaqSection />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
