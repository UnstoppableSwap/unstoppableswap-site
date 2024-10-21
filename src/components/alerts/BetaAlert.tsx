import { Alert, AlertTitle } from '@mui/material';
import { TextField } from "@mui/material";

export default function BetaAlert() {
  return (
    <Alert severity="warning">
      <AlertTitle>This project is still in beta</AlertTitle>
      This project is still in beta, and as always with experimental software,
      there is some risk (including loss of funds). Use at your own risk.
    </Alert>
  );
}
