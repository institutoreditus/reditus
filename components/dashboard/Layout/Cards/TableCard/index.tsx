import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DefaultCard from "../DefaultCard";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    height: 200,
    paddingBottom: 10,
  },
  label: {
    textTransform: "uppercase",
    fontSize: 17,
    fontWeight: 300,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: 700,
  },
  currencyText: {
    fontWeight: 500,
  },
});

function createData(
  donationType: string,
  donationDate: string,
  donationValue: number
) {
  return { donationType, donationDate, donationValue };
}

const rows = [
  createData("Cláudia Milano - Doação pontual", "09/06/2020", 159),
  createData("Cláudia Milano - Assinatura", "09/06/2020", 237),
  createData("Cláudia Milano - Assinatura", "09/06/2020", 262),
  createData("Cláudia Milano - Doação pontual", "09/06/2020", 305),
  createData("Cláudia Milano - Doação pontual", "09/06/2020", 356),
];

export const TableCard = () => {
  const classes = useStyles();
  return (
    <DefaultCard height="100%">
      <TableContainer>
        <Box marginBottom={3}>
          <Typography className={classes.label} variant="body2">
            Assinaturas & Contribuições
          </Typography>
        </Box>

        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.donationType}>
                <TableCell component="th" scope="row">
                  <Typography className={classes.rowLabel}>
                    {row.donationType}
                  </Typography>
                  <Typography variant="body2">{row.donationDate}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography className={classes.currencyText} variant="body2">
                    ${row.donationValue}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DefaultCard>
  );
};

export default TableCard;
