import { Container, Grid, makeStyles, Paper } from "@material-ui/core";
import clsx from "clsx";
// import MaterialDatatable from "material-datatable";
import Dashboard from "../../../components/dashboard/";

const useStyles = makeStyles((lightTheme) => ({
  root: {
    backgroundColor: "#F7FAFC",
    height: "100vw",
  },
  container: {
    paddingTop: lightTheme.spacing(4),
    paddingBottom: lightTheme.spacing(4),
  },
  fixedHeight: {
    height: 500,
  },
}));

export default function Perfil() {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.fixedHeight);
  return (
    <div className={classes.root}>
      <Dashboard>
        <Container>
          <Grid item xs={12} md={8} lg={12}>
            <Paper className={fixedHeightPaper}>
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
