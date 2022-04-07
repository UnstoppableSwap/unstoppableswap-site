import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
  useTheme,
  useMediaQuery,
  DialogActions,
  Button,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import ProviderInfo from "./ProviderInfo";
import AddIcon from "@material-ui/icons/Add";
import useStore from "../../store";

const useStyles = makeStyles({
  dialogContent: {
    padding: 0,
  },
});

export const ProviderSelectDialog = ({ open, onClose, onSubmitDialogOpen }) => {
  const classes = useStyles();
  const providerList = useStore((state) => state.providerList);
  const setCurrentProvider = useStore((state) => state.setCurrentProvider);
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down("sm"));

  const handleProviderChange = (provider) => {
    setCurrentProvider(provider);
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} fullScreen={smallDevice}>
      <DialogTitle>Select a swap provider</DialogTitle>

      <DialogContent className={classes.dialogContent} dividers>
        <List>
          {providerList.map((provider) => (
            <ListItem
              button
              onClick={() => handleProviderChange(provider)}
              key={provider.multiAddr}
            >
              <ProviderInfo provider={provider} key={provider.multiAddr} />
            </ListItem>
          ))}
          <ListItem autoFocus button onClick={onSubmitDialogOpen}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Submit a swap provider" />
          </ListItem>
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProviderSelectDialog;
