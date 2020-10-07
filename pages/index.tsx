import React from "react";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { Hidden } from "@material-ui/core";
import { StateMachineProvider } from "little-state-machine";
import Stepper from "../src/Stepper";
import useStyles from "./styles";

export default function Index() {
  const classes = useStyles();

  return (
    <StateMachineProvider>
      <Grid container>
        <Hidden only={["xs", "sm", "md"]}>
          <Grid container item xs={4} justify="center" alignItems="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              className={[classes.box, classes.leftBox].join(" ")}
            >
              <Box display="block">
                <List className={classes.list}>
                  <ListItem>
                    <ListItemText primary="Tornando-se parte dessa iniciativa você..." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon className={classes.icon}>
                      <RadioButtonCheckedIcon />
                    </ListItemIcon>
                    <ListItemText primary="retorna um bem a comunidade de alunos e ex-alunos da UFRJ" />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon className={classes.icon}>
                      <RadioButtonCheckedIcon />
                    </ListItemIcon>
                    <ListItemText primary="ajuda a fomentar uma estrutura de auxílio a alunos e equipes de competição" />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon className={classes.icon}>
                      <RadioButtonCheckedIcon />
                    </ListItemIcon>
                    <ListItemText primary="perpetua uma cultura de retribuição" />
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Grid>
        </Hidden>

        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            className={[classes.box, classes.rightBox].join(" ")}
          >
            <Box
              display="flex"
              flexDirection="column"
              textAlign="left"
              className={classes.rightWrapper}
            >
              <img
                className={classes.logo}
                src="logoReditusWhite.png"
                alt="Instituto Reditus"
              />

              <Stepper />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </StateMachineProvider>
  );
}
