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
        fullWidth
        value="87jS4C7ngk9EHdqFFuxGFgg8AyH63dRUoULshWDybFJaP75UA89qsutG5B1L1QTc4w228nsqsv8EjhL7bz8fB3611Mh98mg"
      />
    </Alert>
  );
}
