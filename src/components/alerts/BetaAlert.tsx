import { Alert, AlertTitle } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

export default function BetaAlert() {
  return (
    <Alert severity="warning">
      <AlertTitle>This project is still in beta</AlertTitle>
      This project is still in beta, and as always with experimental software,
      there is some risk (including loss of funds). Use at your own risk.
    </Alert>
  );
}
