import { Box, makeStyles, CssBaseline, useMediaQuery } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import FaqSection from "./sections/FaqSection";
import indigo from "@material-ui/core/colors/indigo";
import Footer from "./Footer";
import FeaturesSection from "./sections/FeaturesSection";
import MarketingPhraseHeadline from "./MarketingPhraseHeadline";
import DownloadButton from "./DownloadButton";
import ScreenshotSlideshow from "./ScreenshotSlideshow";
import AlertsSection from "./sections/AlertsSection";

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

let theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#f4511e",
    },
    secondary: indigo,
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
              justifyContent: "space-between",
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <MarketingPhraseHeadline />
              <DownloadButton />
            </Box>
            <ScreenshotSlideshow />
          </Box>
          <FeaturesSection />
          <Box className={classes.faqAlertSection}>
            <AlertsSection />
            <FaqSection />
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
          <AlertsSection />
          <FaqSection />
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
