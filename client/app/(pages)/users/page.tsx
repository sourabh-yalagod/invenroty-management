"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetProductsQuery, useGetUsersQuery } from "@/state/api";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 150 },
  {
    field: "name",
    headerName: "User Name",
    width: 250,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email Adress",
    width: 250,
    editable: true,
  },
];

export default function DataGridDemo() {
  const { data, isLoading } = useGetUsersQuery();
  console.log(data);

  if (isLoading) return <p>Loading...</p>;

  // Ensure each row has a unique `id` field required by MUI DataGrid
  const rows =
    data?.map((user, index) => ({
      id: index + 1,
      ...user,
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
