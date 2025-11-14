import { Box, Button, Paper, Typography } from "@mui/material";
import { useRef, useState } from "react";
// import "./scroll.css";
import "overlayscrollbars/overlayscrollbars.css";
import {
  OverlayScrollbars,
  ScrollbarsHidingPlugin,
  SizeObserverPlugin,
  ClickScrollPlugin,
} from "overlayscrollbars";

const LazyDataGrid1 = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState({ top: 0, bottom: 0 });

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const top = el.scrollTop;
    const bottom = top + el.clientHeight;
    // debugger;
    setVisible({ top, bottom });
  };
  const scrollToPixel = (px: number) => {
    const el = scrollRef.current;
    if (!el) return;

    // Jump instantly
    el.scrollTop = px;

    // Or smooth scroll
    // el.scrollTo({ top: px, behavior: "smooth" });
  };
  return (
    <Box
      //   elevation={3}
      sx={{
        width: 400,
        height: 400,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header (fixed) */}
      <Typography
        variant="h6"
        sx={{
          px: 2,
          py: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          flexShrink: 0,
        }}
      >
        Scrollable Content
      </Typography>
      <Button
        onClick={() => scrollToPixel(170000)}
        variant="contained"
        sx={{ mb: 2 }}
      >
        gsdfg
      </Button>

      {/* Scrollable content */}
      <Box
        className="scroll-container"
        ref={scrollRef}
        onScroll={handleScroll}
        sx={{
          flex: 1, // fills remaining height
          overflowY: "auto", // scrolls correctly
          bgcolor: "background.default",
          //   position: "relative",
        }}
      >
        {/* {Array.from({ length: 50 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              p: 1.2,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            Row {i + 1}
          </Box>
        ))} */}
        <Box
          height="180000px"
          width="700px"
          sx={{ backgroundColor: "lightblue" }}
        >
          <Box paddingTop="170000px">my name is imran</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LazyDataGrid1;
