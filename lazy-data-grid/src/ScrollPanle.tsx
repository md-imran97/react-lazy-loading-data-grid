import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { Box } from "@mui/material";

const ScrollPanle = () => {
  return (
    <Box
      sx={{
        width: 400,
        height: 200,
        border: "1px solid gray",
      }}
    >
      <OverlayScrollbarsComponent
        options={{
          scrollbars: {
            autoHide: "scroll",
            theme: "os-theme-dark", // or 'os-theme-light'
            visibility: "auto",
          },
        }}
      >
        <Box sx={{ height: 600, p: 2 }}>
          {[...Array(30)].map((_, i) => (
            <div key={i}>Row {i + 1}</div>
          ))}
        </Box>
      </OverlayScrollbarsComponent>
    </Box>
  );
};

export default ScrollPanle;
