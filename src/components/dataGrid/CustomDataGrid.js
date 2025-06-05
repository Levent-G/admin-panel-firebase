import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Box } from "@mui/material";
import "./custom-ag-theme.css";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomDataGrid({ rows, columns }) {
  return (
    <Box
      className="ag-theme-alpine"
      sx={{
        height: 550,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "#fff",
        p: 1,
        "& .ag-header": {
          backgroundColor: "#f9fafb",
          height: 50,
          lineHeight: "50px",
        },
        "& .ag-row": {
          height: 50,
          lineHeight: "50px",
        },
        "& .ag-row-hover": {
          backgroundColor: "#eef2ff !important",
        },
        "& .ag-row-selected": {
          backgroundColor: "#6366f1 !important",
          color: "#fff",
        },
        "& .ag-cell": {
          display: "flex",
          alignItems: "center", 
          height: "100%", 
        },
      }}
    >
      <AgGridReact
        rowData={rows}
        columnDefs={columns}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
          flex: 1,
          minWidth: 150,
        }}
        pagination={true}
        paginationPageSize={10}
        rowSelection="single"
        animateRows={true}
        rowHeight={70}
      />
    </Box>
  );
}
