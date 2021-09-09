import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import DefaultCard from "../../DefaultCard";
import { Box, makeStyles, TableContainer, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  label: {
    textTransform: "uppercase",
    fontSize: 15,
    fontWeight: 300,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: 700,
    display: "flex",
  },
  rowTable: {
    border: "none !important",
  },
});

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function LargeTable() {
  const classes = useStyles();
  return (
    <DefaultCard height="100%">
      <TableContainer>
        <Box marginBottom={3}>
          <Typography className={classes.label} variant="body2">
            Assinaturas & Contribuições
          </Typography>
        </Box>

        <div style={{ height: "400px", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            className={classes.rowTable}
          />
        </div>
      </TableContainer>
    </DefaultCard>
  );
}
