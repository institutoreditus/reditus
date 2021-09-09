import * as React from "react";
import { DataGrid, useGridSlotComponentProps } from "@mui/x-data-grid";
// import { useDemoData } from "@mui/x-data-grid-generator";
import { createTheme, Theme } from "@material-ui/core/styles";
import { createStyles, makeStyles } from "@material-ui/styles";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
//import { Box, Typography } from "@material-ui/core";

function customCheckbox(theme: Theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 16,
      height: 16,
      backgroundColor: "transparent",
      border: `1px solid ${
        theme.palette.type === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"
      }`,
      borderRadius: 2,
    },
    "& .MuiCheckbox-root svg path": {
      display: "none",
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "#1890ff",
      borderColor: "#1890ff",
    },
    "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
      position: "absolute",
      display: "table",
      border: "2px solid #fff",
      borderTop: 0,
      borderLeft: 0,
      transform: "rotate(45deg) translate(-50%,-50%)",
      opacity: 1,
      transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
      content: '""',
      top: "50%",
      left: "39%",
      width: 5.71428571,
      height: 9.14285714,
    },
    "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
      {
        width: 8,
        height: 8,
        backgroundColor: "#1890ff",
        transform: "none",
        top: "39%",
        border: 0,
      },
  };
}

const defaultTheme = createTheme();
/*const useStyle = makeStyles({
  label: {
    textTransform: "uppercase",
    fontSize: 15,
    fontWeight: 300,
  },
});*/
const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        border: 0,
        color:
          theme.palette.type === "light"
            ? "rgba(0,0,0,.85)"
            : "rgba(255,255,255,0.85)",
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Open sans",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
        WebkitFontSmoothing: "auto",
        letterSpacing: "normal",
        "& .MuiDataGrid-columnsContainer": {
          backgroundColor:
            theme.palette.type === "light" ? "#f7fafc" : "#1d1d1d",
        },
        "& .MuiDataGrid-iconSeparator": {
          display: "none",
        },
        "& .MuiDataGrid-columnHeader": {
          fontFamily: "Rubik",
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "12px",
          lineHeight: "16px",
          letterSpacing: "1.12px",
          textTransform: "uppercase",
          color: "#BFC5D2",
        },  
        "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
          borderRight: "none",
        },
        "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-cell": {
          fontFamily: "Rubik",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "13px",
          lineHeight: "22px",
          height: "auto",
          [theme.breakpoints.down("md")]: {
            width: "100% !important",
          },
          paddingLeft: "15px",
        },
        "& .MuiDataGrid-root, .MuiDataGrid-row": {
          backgroundColor: "#fff",
          marginBottom: "10px !important",
          border: "1px solid rgba(46, 91, 255, 0.08)",
          boxSizing: "border-box",
          boxShadow: "none",
          borderRadius: "1px",
        },
        "& .MuiDataGrid-window .MuiDataGrid-dataContainer .MuiDataGrid-viewport":
          {
            height: "650px",
          },
        "& .MuiDataGrid-row": {
          height: "100px !important",
          padding: "37px 0",
          alignItems: "center",
          marginRight: "-40px",
        },
        "& .MuiDataGrid-renderingZone": {
          // width: "100% !important",
        },
        "& .MuiPaginationItem-root": {
          borderRadius: 0,
        },
        ...customCheckbox(theme),
      },
    }),
  { defaultTheme }
);

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "donationType", headerName: "Tipo de doação", width: 290 },
  { field: "amount", headerName: "Valor", width: 300 },
  { field: "date", headerName: "Data", width: 370 },
  { field: "status", headerName: "Situação", width: 150},
];

const rows = [
  { id: 0, donationType: "Contribuição pontual", amount: 120, date: "03/05/2020", status: "Concluída" },
  { id: 1, donationType: "Contribuição pontual", amount: 120, date: "03/05/2020", status: "Concluída" },
  { id: 2, donationType: "Assinatura", amount: 120, date: "03/05/2020", status: "Ativa" },
  { id: 3, donationType: "Assinatura", amount: 120, date: "03/05/2020", status: "Ativa" },
  { id: 4, donationType: "Contribuição pontual", amount: 120, date: "03/05/2020", status: "Concluída" },
  { id: 5, donationType: "Contribuição pontual", amount: 120, date: "03/05/2020", status: "Concluída" },
  { id: 6, donationType: "Contribuição pontual", amount: 120, date: "03/05/2020", status: "Concluída" },
  { id: 7, donationType: "Assinatura", amount: 120, date: "03/05/2020", status: "Inativa" },
  { id: 8, donationType: "Contribuição pontual", amount: 120, date: "03/05/2020", status: "Concluída" },
];

function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={state.pagination.page}
      count={state.pagination.pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem type="page" {...props2} disableRipple />}
      onChange={(_event, value) => apiRef.current.setPage(value)}
    />
  );
}

export default function LargeTable() {
  // To use Demo dataset
  /* const { data } = useDemoData({
    dataSet: "Employee",
    rowLength: 10,
    maxColumns: 15,
  });*/

  const classes = useStyles();
  //const customClasses = useStyle();

  return (
    <>
      {/*<Box marginBottom={3}>
        <Typography className={customClasses.label} variant="body2">
          Assinaturas & Contribuições
        </Typography>
        </Box>*/}

      <div style={{ height: 550, width: "100%" }}>
        <DataGrid
          className={classes.root}
          checkboxSelection
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{
            Pagination: CustomPagination,
          }}
          rows={rows}
          columns={columns}
        />
      </div>
    </>
  );
}
