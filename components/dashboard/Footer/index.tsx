import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    zIndex: 2,
  },
  footer: {
    display: "flex",
    marginTop: -50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "#ADBDCE",
    fontSize: 16,
    fontWeight: 400,
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, classes.footer)}>
      <Typography className={classes.footerText}>
        ©Instituto Reditus 2020. Todos os direitos reservados. CNPJ
        34.989.305/0001-90
      </Typography>
    </Box>
  );
};

export default Footer;
