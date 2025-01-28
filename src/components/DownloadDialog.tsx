import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";

export const GITHUB_URL = "https://github.com/UnstoppableSwap/core";

export default function DownloadDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Web UI has been disabled</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The functionality of this website has been deprecated and will be
          removed entirely in the future. It will soon be replaced by a desktop
          app that is currently in active development. The GitHub repository is
          public, so feel free to inspect the code or provide feedback as
          development progresses.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => window.open(GITHUB_URL, "_blank")}>
          View repository
        </Button>
        <Button onClick={onClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
