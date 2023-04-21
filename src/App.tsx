import NoRows from "./comonents/NoRows";
// App.tsx
import React, { useState } from "react";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";

import "./App.css";
import { Box, Button } from "@mui/material";

interface SendDataProps {
  rowData: unknown[];
  columnData: unknown[];
}

const SendData: React.FC<SendDataProps> = ({ rowData, columnData }) => {
  const handleButtonPress = () => {
    console.log(rowData);
    console.log(columnData);
    // Implement logic to send parsed data
  };
  return (
    <GridToolbarContainer>
      <Button onClick={handleButtonPress} variant="outlined">
        Send Data
      </Button>
    </GridToolbarContainer>
  );
};

const App: React.FC = () => {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<unknown[]>([]);

  return (
    <Box className="App" sx={{ width: "80vw" }}>
      <Box
        style={{
          height: 400,
          width: "100%",
          marginTop: 16,
          background: "white",
        }}
      >
        <DataGrid
          slots={{ noRowsOverlay: NoRows, toolbar: SendData }}
          slotProps={{
            toolbar: {
              rowData: rows,
              columnData: columns,
            },
            noRowsOverlay: {
              onColumnsProcessed: setColumns,
              onFileProcessed: setRows,
            },
          }}
          rows={rows}
          columns={columns}
        />
      </Box>
    </Box>
  );
};
export default App;
