import { Box, CssBaseline, useMediaQuery, adaptV4Theme } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { createTheme, ThemeProvider, Theme, StyledEngineProvider } from "@mui/material/styles";
import DownloadButton from "./DownloadButton";
import Footer from "./Footer";
import LiquidityInfo from "./LiquidityInfo";
import MarketingPhraseHeadline from "./MarketingPhraseHeadline";
import ScreenshotSlideshow from "./ScreenshotSlideshow";
import AlertsSection from "./sections/AlertsSection";
import FeaturesSection from "./sections/FeaturesSection";
import { indigo } from '@mui/material/colors';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


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
    padding: "1rem",
    gridGap: "1rem",
    flex: 1,
    alignItems: "center",
  },
  faqAlertSection: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
}));

let theme = createTheme(adaptV4Theme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f4511e",
    },
    secondary: indigo,
  },
}));

function Content() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
      (<Box className={classes.content}>
        <MarketingPhraseHeadline />
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap="20px"
        >
          <ScreenshotSlideshow />
          <DownloadButton />
        </Box>
        <FeaturesSection />
        <Box className={classes.faqAlertSection}>
          <LiquidityInfo />
          <AlertsSection />
        </Box>
      </Box>)
    );
  }
}

export default function App() {
  const classes = useStyles();

  return (
    <StyledEngineProvider injectFirst>
      (<ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className={classes.main}>
          <Content />
          <Footer />
        </Box>
      </ThemeProvider>)
    </StyledEngineProvider>
  );
}
