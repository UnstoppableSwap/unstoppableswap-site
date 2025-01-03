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

export const GITHUB_URL = "https://github.com/UnstoppableSwap/core";
const FALLBACK_VERSION = "1.0.0-rc.11";

const getDownloadLinks = (version: string) => ({
  win: `${GITHUB_URL}/releases/download/${version}/UnstoppableSwap_${version}_x64-setup.exe`,
  mac: `${GITHUB_URL}/releases/download/${version}/UnstoppableSwap_${version}_x64.dmg`,
  mac_arm: `${GITHUB_URL}/releases/download/${version}/UnstoppableSwap_${version}_aarch64.dmg`,
  linux_deb: `${GITHUB_URL}/releases/download/${version}/UnstoppableSwap_${version}_amd64.deb`,
  linux_appimage: `${GITHUB_URL}/releases/download/${version}/UnstoppableSwap_${version}_amd64.AppImage`,
});

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
  const [version, setVersion] = useState(FALLBACK_VERSION);
  const downloadLink = getDownloadLinks(version)[os as keyof typeof getDownloadLinks];

  // Fetch the latest version from GitHub
  useEffect(() => {
    fetch("https://api.github.com/repos/UnstoppableSwap/core/releases/latest")
      .then((res) => res.json())
      .then((data) => {
        setVersion(data.tag_name);
      })
      .catch((err) => {
        console.error("Error fetching latest version", err);
      });
  }, []);

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
        <Link
          target="_blank"
          href={`${GITHUB_URL}/releases/tag/${version}`}
          color="primary"
        >
          All downloads
        </Link>{" "}
        | v{version} | Current version
      </Typography>
    </Box>
  );
}
