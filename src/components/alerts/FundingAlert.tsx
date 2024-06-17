import { Alert, AlertTitle } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

export default function FundingAlert() {
  return (
    <Alert severity="info">
      <AlertTitle>We need your support</AlertTitle>
      This project is still under active development. Please visit the COMIT
      team's Github repository if you are a developer and would like to help.
      You can also help us fund our operations by directly donating to:
      <TextField
        label="Monero Donation Address"
        fullWidth
        value="49LEH26DJGuCyr8xzRAzWPUryzp7bpccC7Hie1DiwyfJEyUKvMFAethRLybDYrFdU1eHaMkKQpUPebY4WT3cSjEvThmpjPa"
      />
      <TextField
        label="Bitcoin Donation Address"
        fullWidth
        value="bc1q8hj4aq59fucrhz59rxpqnwgy8y6spxxvq4wcj2"
      />
    </Alert>
  );
}
