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

const VERSION = "1.0.0-rc.11"; // TODO: fetch from Github API?
export const GITHUB_URL = "https://github.com/UnstoppableSwap/core";
const ALL_DOWNLOADS = `${GITHUB_URL}/releases/tag/v${VERSION}`;
const DOWNLOAD_LINKS = {
  // https://github.com/UnstoppableSwap/core/releases/download/1.0.0-alpha.3/UnstoppableSwap_1.0.0-alpha.3_x64-setup.exe
  win: `https://github.com/UnstoppableSwap/core/releases/download/${VERSION}/UnstoppableSwap_${VERSION}_x64-setup.exe`,
  // https://github.com/UnstoppableSwap/core/releases/download/1.0.0-alpha.3/UnstoppableSwap_1.0.0-alpha.3_x64.dmg
  mac: `https://github.com/UnstoppableSwap/core/releases/download/${VERSION}/UnstoppableSwap_${VERSION}_x64.dmg`,
  // https://github.com/UnstoppableSwap/core/releases/download/1.0.0-rc.10/UnstoppableSwap_1.0.0-rc.10_amd64.deb
  linux_deb: `https://github.com/UnstoppableSwap/core/releases/download/${VERSION}/UnstoppableSwap_${VERSION}_amd64.deb`,
  // https://github.com/UnstoppableSwap/core/releases/download/1.0.0-alpha.3/UnstoppableSwap_1.0.0-alpha.3_amd64.AppImage
  linux_appimage: `https://github.com/UnstoppableSwap/core/releases/download/${VERSION}/UnstoppableSwap_${VERSION}_amd64.AppImage`,
  // https://github.com/UnstoppableSwap/core/releases/download/1.0.0-alpha.3/UnstoppableSwap_1.0.0-alpha.3_aarch64.dmg
  mac_arm: `https://github.com/UnstoppableSwap/core/releases/download/${VERSION}/UnstoppableSwap_${VERSION}_aarch64.dmg`,
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
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (platform.includes("Mac")) {
      // Check for Apple Silicon Macs
      if (userAgent.includes("mac") && userAgent.includes("arm64")) {
        setOs("mac_arm");
      } else {
        setOs("mac");
      }
    } else if (platform.includes("Win")) {
      setOs("win");
    } else if (
      platform.includes("Debian") ||
      // Ubuntu, Xubuntu, Kubuntu, etc
      platform
        .toLowerCase()
        .includes("buntu") ||
      platform.includes("Mint")
    ) {
      setOs("linux_deb");
    } else {
      setOs("linux_appimage");
    }
  }, []);

  useEffect(() => {
    setDownloadLink(
      DOWNLOAD_LINKS[
        os as "mac" | "mac_arm" | "linux_deb" | "linux_appimage" | "win"
      ] || DOWNLOAD_LINKS.win,
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
          {[
            { value: "linux_deb", icon: <LinuxIcon />, label: "Deb" },
            { value: "linux_appimage", icon: <LinuxIcon />, label: "AppImage" },
            { value: "mac", icon: <AppleIcon />, label: "Intel" },
            { value: "mac_arm", icon: <AppleIcon />, label: "Silicon" },
            { value: "win", icon: <WindowsIcon />, label: "x64" },
          ].map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              {item.icon}
              {item.label}
            </MenuItem>
          ))}
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
