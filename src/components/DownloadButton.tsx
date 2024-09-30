import {
  Box,
  Button,
  IconButton,
  Link,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import GitHubIcon from "@material-ui/icons/GitHub";
import { useEffect, useState } from "react";
import AppleIcon from "./icons/AppleIcon";
import LinuxIcon from "./icons/LinuxIcon";
import WindowsIcon from "./icons/WindowsIcon";

const VERSION = "0.6.4";
export const GITHUB_URL =
  "https://github.com/UnstoppableSwap/unstoppableswap-gui";
const ALL_DOWNLOADS = `${GITHUB_URL}/releases/tag/v${VERSION}`;
const DOWNLOAD_LINKS = {
  win: `https://github.com/UnstoppableSwap/unstoppableswap-gui/releases/download/v${VERSION}/UnstoppableSwap-Setup-${VERSION}.exe`,
  mac: `https://github.com/UnstoppableSwap/unstoppableswap-gui/releases/download/v${VERSION}/UnstoppableSwap-${VERSION}.dmg`,
  linux: `https://github.com/UnstoppableSwap/unstoppableswap-gui/releases/download/v${VERSION}/UnstoppableSwap-${VERSION}.AppImage`,
};

const useStyles = makeStyles((theme) => ({
  outer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    maxWidth: "min(500px, 80vw)",
  },
  upperBox: {
    display: "flex",
    gap: theme.spacing(1),
    padding: theme.spacing(0),
    alignItems: "center",
  },
  downloadButtonOuter: {
    flex: 1,
    "text-decoration": "none",
  },
  githubButtonOuter: {
    "text-decoration": "none",
  },
  button: {
    width: "100%",
  },
}));

function ViewCodeButton() {
  const classes = useStyles();

  return (
    <a target="_blank" href={GITHUB_URL} className={classes.githubButtonOuter}>
      <IconButton color="default" size="medium">
        <GitHubIcon />
      </IconButton>
    </a>
  );
}

export default function DownloadButton() {
  const classes = useStyles();
  const [os, setOs] = useState("win");
  const [downloadLink, setDownloadLink] = useState(DOWNLOAD_LINKS.win);

  useEffect(() => {
    const platform = window.navigator.platform;
    if (platform.includes("Mac")) {
      setOs("mac");
    } else if (platform.includes("Win")) {
      setOs("win");
    } else {
      setOs("linux");
    }
  }, []);

  useEffect(() => {
    setDownloadLink(
      DOWNLOAD_LINKS[os as "mac" | "linux" | "win"] || DOWNLOAD_LINKS.win,
    );
  }, [os]);

  return (
    <Box className={classes.outer}>
      <Box className={classes.upperBox}>
        <a href={downloadLink} className={classes.downloadButtonOuter}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            endIcon={<GetAppIcon />}
          >
            Download
          </Button>
        </a>
        <ViewCodeButton />
        <Select
          variant="standard"
          value={os}
          onChange={(event) => setOs(event.target.value as string)}
        >
          <MenuItem value={"linux"}>
            <LinuxIcon />
          </MenuItem>
          <MenuItem value={"mac"}>
            <AppleIcon />
          </MenuItem>
          <MenuItem value={"win"}>
            <WindowsIcon />
          </MenuItem>
        </Select>
      </Box>
      <Typography variant="caption" color="textSecondary">
        <Link target="_blank" href={ALL_DOWNLOADS} color="textSecondary">
          All downloads
        </Link>{" "}
        | v{VERSION} | Current version
      </Typography>
    </Box>
  );
}
