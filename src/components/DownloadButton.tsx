import {
  Box,
  Fab,
  Link,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import AppleIcon from "./icons/AppleIcon";
import WindowsIcon from "./icons/WindowsIcon";
import LinuxIcon from "./icons/LinuxIcon";
import { useEffect, useState } from "react";

const VERSION = "0.4.8";
const ALL_DOWNLOADS = `https://github.com/UnstoppableSwap/unstoppableswap-gui/releases/tag/v${VERSION}`;
const DOWNLOAD_LINKS = {
  win: `https://github.com/UnstoppableSwap/unstoppableswap-gui/releases/download/v${VERSION}/UnstoppableSwap-Setup-${VERSION}.exe`,
  mac: `https://github.com/UnstoppableSwap/unstoppableswap-gui/releases/download/v${VERSION}/UnstoppableSwap-${VERSION}.dmg`,
  linux: `https://github.com/UnstoppableSwap/unstoppableswap-gui/releases/download/v${VERSION}/UnstoppableSwap-${VERSION}.AppImage`,
};

const useStyles = makeStyles((theme) => ({
  outer: {
    paddingTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  upperBox: {
    display: "flex",
    gap: theme.spacing(1),
    width: "100%",
    padding: theme.spacing(0),
  },
  buttonOuter: {
    flex: 1,
    "text-decoration": "none",
  },
  button: {
    width: "100%",
  },
}));

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
      DOWNLOAD_LINKS[os as "mac" | "linux" | "win"] || DOWNLOAD_LINKS.win
    );
  }, [os]);

  return (
    <Box className={classes.outer}>
      <Box className={classes.upperBox}>
        <a href={downloadLink} className={classes.buttonOuter}>
          <Fab variant="extended" color="primary" className={classes.button}>
            <GetAppIcon />
            Install Desktop App
          </Fab>
        </a>
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
