import { Box, Icon } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import { GITHUB_URL } from "./DownloadDialog";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import DiscordIcon from "./icons/DiscordIcon";

const TWITTER_URL = "https://twitter.com/UnstoppableSwap";
const YOUTUBE_URL = "https://www.youtube.com/@unstoppableswap6306";
const DISCORD_INVITE_URL = "https://discord.gg/Wpkffvbt";

const useStyles = makeStyles({
  root: {
    bottom: 0,
    padding: 0,
    margin: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

export const Footer = () => {
  const classes = useStyles();

  const links: [JSX.Element, string][] = [
    [<GitHubIcon />, GITHUB_URL],
    [<TwitterIcon />, TWITTER_URL],
    [<YouTubeIcon />, YOUTUBE_URL],
    [<DiscordIcon />, DISCORD_INVITE_URL],
  ];

  return (
    (<Box className={classes.root}>
      {links.map(([icon, link], i) => {
        return (
          (<IconButton key={i} onClick={() => window.open(link, "_blank")} size="large">
            {icon}
          </IconButton>)
        );
      })}
    </Box>)
  );
};

export default Footer;
