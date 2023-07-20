import DownloadButton from "./DownloadButton";
import { Box, makeStyles } from "@material-ui/core";
import { useState } from "react";
import ReadDocsButton from "./ReadDocsButton";

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
