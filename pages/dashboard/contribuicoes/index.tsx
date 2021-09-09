import {
  Container,
  Grid,
  makeStyles,
  Box,
  Typography,
} from "@material-ui/core";
// import MaterialDatatable from "material-datatable";
import Dashboard from "../../../components/dashboard";
import LargeTable from "../../../components/dashboard/Layout/Cards/TableCard/LargeTable";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F7FAFC",
    height: "100vw",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(10),
  },
  wrapper: {
    marginLeft: -26,
    marginRight: -26,
  },
}));

export default function Contribuicoes() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dashboard>
        <Box display="flex" color="#2E384D" fontWeight={300} component="h2">
          <Box fontSize={28} marginRight={2}>
            Minhas contribuições
          </Box>
          <Typography>13 no total</Typography>
        </Box>
        <Container maxWidth="xl">
          <Grid className={classes.container} item xs={12} md={8} lg={12}>
            <Box className={classes.wrapper}>
              <LargeTable />
            </Box>
          </Grid>
        </Container>
      </Dashboard>
    </div>
  );
}
