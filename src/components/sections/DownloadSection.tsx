import DownloadButton from "../DownloadButton";
import { Box } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  outer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    gap: theme.spacing(2),
  },
}));

export default function DownloadSection() {
  const classes = useStyles();

  return (
    <Box className={classes.outer}>
      <DownloadButton />
    </Box>
  );
}
