import { Box, Button } from "@mui/material";
import { LazyDataGrid } from "./lazy-load-data-grid/LazyDataGrid";
import { dummyColumns } from "./lazy-load-data-grid/dummy-data/dummyColumns";
import { fetchData } from "./dummyData";
import type { LazyDataGridApi } from "./lazy-load-data-grid/types/LazyDataGridApi";
import { useRef } from "react";

function App() {
  const apiRef = useRef<LazyDataGridApi>(null);
  const dataSource = {
    getRows: async (
      startIndex: number,
      endIndex: number
    ): Promise<{
      rows: any[];
      totalRowCount: number;
    }> => {
      const rows = await fetchData(startIndex, endIndex);

      return {
        rows,
        totalRowCount: 500,
      };
    },
  };
  return (
    <>
      <Button
        onClick={() => {
          apiRef.current.scrollToIndex(44);
        }}
        variant="contained"
        sx={{ mb: 2 }}
      >
        Scroll to 44
      </Button>
      <Button
        onClick={() => {
          apiRef.current?.reloadData();
        }}
        variant="contained"
        sx={{ mb: 2 }}
      >
        Reload DAta
      </Button>
      <Box
        height="600px"
        width="50%"
        sx={{
          backgroundColor: "#efeee8",
          // display: "flex",
          // justifyContent: "center",
        }}
      >
        <LazyDataGrid
          ref={apiRef}
          uniqueDataKey="docId"
          dataSource={dataSource}
          columns={[
            {
              field: "docId",
              // headerName: "sldfjkasdfjksfjskdfjskfjskfjskdfjskfd",
              minWidth: 200,
              flex: 1,
            },
            {
              field: "name",
              minWidth: 200,
              flex: 1,
              headerName: "sldfjkasdfjksfjskdfjskfjskfjskdfjskfd",
              renderCell: ({ row }) => {
                return <>{row.name}</>;
              },
            },
            { field: "address", minWidth: 200, flex: 1 },
          ]}
          pageSize={100}
        />
      </Box>
    </>
  );
}

export default App;
