import { Alert, AlertTitle } from '@mui/material';
import { TextField } from "@mui/material";

export default function FundingAlert() {
  return (
    (<Alert severity="info">
      <AlertTitle>We need your support</AlertTitle>This project is still under active development. Please visit the COMIT
            team's Github repository if you are a developer and would like to help.
            You can also help us fund our operations by directly donating to:
            <TextField
        variant="standard"
        label="Monero Donation Address"
        fullWidth
        value="49LEH26DJGuCyr8xzRAzWPUryzp7bpccC7Hie1DiwyfJEyUKvMFAethRLybDYrFdU1eHaMkKQpUPebY4WT3cSjEvThmpjPa" />
      <TextField
        variant="standard"
        label="Bitcoin Donation Address"
        fullWidth
        value="bc1qz6lfs0r206396a9psunmkfpqh7sdf2zh3e7tnf" />
    </Alert>)
  );
}
