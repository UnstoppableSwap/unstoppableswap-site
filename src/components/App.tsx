import { Box, CssBaseline, makeStyles, useMediaQuery } from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";
import { createMuiTheme, createTheme, ThemeProvider } from "@material-ui/core/styles";
import DownloadButton from "./DownloadButton";
import Footer from "./Footer";
import LiquidityInfo from "./LiquidityInfo";
import MarketingPhraseHeadline from "./MarketingPhraseHeadline";
import ScreenshotSlideshow from "./ScreenshotSlideshow";
import AlertsSection from "./sections/AlertsSection";
import FeaturesSection from "./sections/FeaturesSection";

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
    gridGap: theme.spacing(6),
    flex: 1,
    alignItems: "center",
  },
  faqAlertSection: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#f4511e", // Monero orange
    },
    secondary: indigo,
  },
  typography: {
    overline: {
      textTransform: "none", // This prevents the text from being all caps
      fontFamily: "monospace"
    },
  },
});

const lightTheme = createTheme({
  ...darkTheme,
  palette: {
    type: "light",
    primary: {
      main: "#f4511e", // Monero orange
    },
    secondary: indigo,
  },
});

const theme = createTheme({
  ...darkTheme,
  palette: {
    type: 'dark',
    primary: {
      main: "#f4511e",
    },
    secondary: indigo,
    background: {
      default: "#080808",
      paper: "#181818",
    },
  },
});

function Content() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  if (!isMobile) {
    return (
      <Box className={classes.content}>
        <Box className={classes.content}>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <MarketingPhraseHeadline />
              <DownloadButton />
            </Box>
            <ScreenshotSlideshow />
          </Box>
          <FeaturesSection />
          <Box className={classes.faqAlertSection}>
            <LiquidityInfo />
            <AlertsSection />
          </Box>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box className={classes.content}>
        <MarketingPhraseHeadline />
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          gridGap="20px"
        >
          <ScreenshotSlideshow />
          <DownloadButton />
        </Box>
        <FeaturesSection />
        <Box className={classes.faqAlertSection}>
          <LiquidityInfo />
          <AlertsSection />
        </Box>
      </Box>
    );
  }
}

export default function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.main}>
        <Content />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
