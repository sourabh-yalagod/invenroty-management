"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetProductsQuery } from "@/state/api";
import { Products } from "@/types/dashboard.types";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 80 },
  {
    field: "name",
    headerName: "Product Name",
    width: 250,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price ($)",
    width: 120,
    editable: true,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 150,
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 250,
  },
];

export default function DataGridDemo() {
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) return <p>Loading...</p>;

  // Ensure each row has a unique `id` field required by MUI DataGrid
  const rows =
    data?.products?.map((product: Products, index: number) => ({
      id: index + 1,
      ...product,
    })) || [];

  return (
    <Box sx={{ height: 800, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
