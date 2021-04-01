import { Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { Box } from "@material-ui/core";
// import MaterialDatatable from "material-datatable";
import Dashboard from "../../../components/dashboard/";

const useStyles = makeStyles((lightTheme) => ({
  root: {
    backgroundColor: "#F7FAFC",
    height: "100vw",
  },
  paper: {
    height: 500,
    marginLeft: -26,
    marginRight: -26,
    padding: lightTheme.spacing(4),
  },
}));

export default function Perfil() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dashboard>
        <Box color="#2E384D" fontSize={28} fontWeight={300} component="h2">
          Meu perfil
        </Box>
        <Container maxWidth="xl">
          <Grid item xs={12} md={8} lg={12}>
            <Paper className={classes.paper}>
              Test table
              {/*
              <MaterialDatatable
                title={"Perfil"}
                data={data}
                columns={columns}
                options={options}
              />
              */}
            </Paper>
          </Grid>
        </Container>
      </Dashboard>
    </div>
  );
}
