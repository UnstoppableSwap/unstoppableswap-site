import MarketingPhraseHeadline from "../MarketingPhraseHeadline";
import ScreenshotSlideshow from "../ScreenshotSlideshow";
import { Box, Dialog, makeStyles } from "@material-ui/core";
import DownloadButton from "../DownloadButton";

const useStyles = makeStyles((theme) => ({
  outer: {
    display: "grid",
    // Either display side-by-side (if enough space is there) or on top of each other (if not)
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gridGap: theme.spacing(2),
    width: "100%",
    justifyContent: "center",
  },
}));

export default function ScreenshotTitleSection() {
  const classes = useStyles();

  return (
    <Box className={classes.outer}>
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
  );
}
