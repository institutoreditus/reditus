import {Container, Grid, makeStyles, Paper} from "@material-ui/core";
import {Box} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import { useState } from "react";

// import MaterialDatatable from "material-datatable";
import Dashboard from "../../../components/dashboard/";

const useStyles = makeStyles((lightTheme) => ({
    root: {
        backgroundColor: "#F7FAFC",
        height: "100%"
    },
    paper: {
        marginLeft: -26,
        marginRight: -26,
        marginTop: 60,
        padding: lightTheme.spacing(8)
    },
    headerPaper: {
      marginTop: "auto",
    },
    avatar: {
        padding: "3.5rem",
        fontSize: "2.5rem",
        backgroundColor: "#EDF1F4",
        fontWeight: 400,
        color: "#95ACC1"
    },
    button: {
        background: "transparent",
        width: "10rem",
        marginLeft: "50px",
    },
    wrapper: {
      marginTop: "4rem",
    },
    form: {
      opacity: 1,
      transition: lightTheme.transitions.create("opacity", {
        easing: lightTheme.transitions.easing.easeIn,
        duration: lightTheme.transitions.duration.leavingScreen,
      }),
    },
    title: {
      fontSize: 10,
      textTransform: "uppercase",
      fontWeight: 600,
      color: "#B0BAC9"
    },
    content: {
      fontSize: "15px",
      lineHeight: "22px",
      color: "#2E384D",
    },
    items: {
      marginTop: ".8rem",
    },
    underline: {
      height: 1,
      width: "calc(100% - 50rem)",
      position: "absolute",
      marginLeft: "50px",
      background: "#E4E8F0",
    }
}));

export default function Perfil() {
  const classes = useStyles();

  const [editProfile, setEditProfile] = useState(false);
  const userName = "Cláudia";
  const userLastName = "Milano";
  const email = "claudiamilano@milano.com";
  const degree = "Engenharia Eletrônica e de Computação";
  const entry = 2011;
  const university = "Universidade Federal do Rio de Janeiro (UFRJ)";

  return (
    <div className={classes.root}>
        <Dashboard>
            <>
            <Box color="#2E384D" fontSize={28} fontWeight={300} component="h2">
                Perfil
            </Box>
            <Container maxWidth="xl">
                <Grid item xs={12} md={8} lg={12}>
                    <Paper className={classes.paper}>
                        <Box display="flex" flexDirection="row">
                            <Avatar className={classes.avatar}>{userName[0]+userLastName[0]}</Avatar>
                            <div className={classes.headerPaper}>
                              <Button className={classes.button} onClick={() => setEditProfile(!editProfile)}>Editar perfil</Button>
                              <div className={classes.underline}></div>
                            </div>
                        </Box>
                        <Box className={classes.wrapper}>
                        {editProfile? 
                        
                            <form className={classes.form} noValidate autoComplete="off">
                                <div>
                                    <TextField
                                        id="filled-read-only-input"
                                        label="Read Only"
                                        defaultValue="Hello World"
                                        InputProps={{
                                        readOnly: true
                                    }}
                                    />
                                 
                                </div>
                            </form>
                      : <Box>
                          <div className={classes.items}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                              Nome
                            </Typography>
                            <Typography className={classes.content} variant="h5" component="h2">
                              {userName}
                            </Typography>
                          </div>
                          <div className={classes.items}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                              Sobrenome
                            </Typography>
                            <Typography className={classes.content} variant="h5" component="h2">
                              {userLastName}
                            </Typography>
                          </div>
                          <div className={classes.items}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                              Email
                            </Typography>
                            <Typography className={classes.content} variant="h5" component="h2">
                              {email}
                            </Typography>
                          </div>
                          <div className={classes.items}>
                            <Grid container spacing={8}>
                              <Grid item >
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                  Curso
                                </Typography>
                                <Typography className={classes.content} variant="h5" component="h2">
                                  {degree}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                  Ano de entrada
                                </Typography>
                                <Typography className={classes.content} variant="h5" component="h2">
                                  {entry}
                                </Typography>
                              </Grid>
                            </Grid>
                          </div>
                          <div className={classes.items}>
                              <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Universidade
                              </Typography>
                              <Typography className={classes.content} variant="h5" component="h2">
                                {university}
                              </Typography>
                            </div>
                        </Box>
                      }
                      </Box>
                    </Paper>
                </Grid>
            </Container>
            </>
        </Dashboard>
    </div>
  );
}
