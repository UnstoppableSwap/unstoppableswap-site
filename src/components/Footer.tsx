import { Box, Icon, makeStyles } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";
import { GITHUB_URL } from "./DownloadDialog";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
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
    <Box className={classes.root}>
      {links.map(([icon, link], i) => {
        return (
          <IconButton key={i} onClick={() => window.open(link, "_blank")}>
            {icon}
          </IconButton>
        );
      })}
    </Box>
  );
};

export default Footer;
