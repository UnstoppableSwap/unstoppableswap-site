import { Alert, AlertTitle, Typography } from '@mui/material';
import { TextField } from "@mui/material";

export default function FundingAlert() {
  return (
    <Alert severity="info">
      <AlertTitle>Thank you for your support!</AlertTitle>
      <Typography>
      We have received funding (through CCS) to work on the project full-time for the next 6 months! 
      Believe me when I say we do not take this for granted. We care deeply about making sure Monero 
      remains accessible to everyone. Over the coming months, we'll be releasing a rewrite of the GUI 
      with native rust bindings and support for iOS and Android. Stay tuned!
      <br/>
      <br/>
      If you'd still like to support our ongoing work, you can donate to the following addresses:
      </Typography>
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
    </Alert>
  );
}
