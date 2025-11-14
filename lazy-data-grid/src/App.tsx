import { Box } from "@mui/material";
import { LazyDataGrid } from "./lazy-load-data-grid/LazyDataGrid";

function App() {
  return (
    <Box height="600px" width="100%" sx={{ backgroundColor: "#efeee8" }}>
      <LazyDataGrid columns={[]} />
    </Box>
  );
}

export default App;
