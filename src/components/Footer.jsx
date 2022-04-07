import { Box, makeStyles } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";

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

  return (
    <Box className={classes.root}>
      <IconButton
        onClick={() =>
          window.open("https://github.com/comit-network/xmr-btc-swap")
        }
      >
        <GitHubIcon />
      </IconButton>
    </Box>
  );
};

export default Footer;
