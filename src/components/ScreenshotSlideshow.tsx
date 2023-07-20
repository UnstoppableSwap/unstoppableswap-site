import Page1Screenshot from "../page_1_gui.png";
import Page2Screenshot from "../page_2_gui.png";
import Page3Screenshot from "../page_3_gui.png";
import Page4Screenshot from "../page_4_gui.png";
import Page5Screenshot from "../page_5_gui.png";
import Page7Screenshot from "../page_7_gui.png";

import { Box, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  outer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  innerImg: {
    width: "min(1000px, 100%)",
    minHeight: "150px",
    margin: "-3%",
    marginBottom: "-4%",
  },
  pagination: {},
}));

export default function ScreenshotSlideshow() {
  const classes = useStyles();
  const images = [
    Page1Screenshot,
    Page2Screenshot,
    Page3Screenshot,
    Page4Screenshot,
    Page5Screenshot,
    Page7Screenshot,
  ];
  const [page, setPage] = useState(0);
  const [showPagination, setShowPagination] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage((page + 1) % images.length); // Go to the next page, wrap to the beginning if necessary
    }, 5000); // 8 seconds

    return () => {
      clearTimeout(timer); // Clear the timer whenever the page changes or the component unmounts
    };
  }, [page, images.length]); // Re-run the effect whenever the page changes or the number of images changes

  return (
    <Box className={classes.outer}>
      <img src={images[page]} alt="" className={classes.innerImg} />
      <Pagination
        onMouseEnter={() => setShowPagination(true)}
        onMouseLeave={() => setShowPagination(false)}
        disabled={!showPagination}
        siblingCount={2}
        className={classes.pagination}
        size="small"
        count={images.length}
        shape="rounded"
        onChange={(e, page) => setPage(page - 1)}
        page={page + 1}
      />
    </Box>
  );
}
