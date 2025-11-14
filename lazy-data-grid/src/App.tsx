import { Box } from "@mui/material";
import { LazyDataGrid } from "./lazy-load-data-grid/LazyDataGrid";
import { dummyColumns } from "./lazy-load-data-grid/dummy-data/dummyColumns";

function App() {
  return (
    <Box
      height="600px"
      width="50%"
      sx={{
        backgroundColor: "#efeee8",
        // display: "flex",
        // justifyContent: "center",
      }}
    >
      <LazyDataGrid columns={dummyColumns} />
    </Box>
  );
}

export default App;
