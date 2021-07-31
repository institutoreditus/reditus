import React from "react";
import clsx from "clsx";
import { Grid, Paper, Button } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import { useRouter } from "next/router";
import Image from "next/image";
import Avatar from "@material-ui/core/Avatar";
import { Timeline } from "@styled-icons/material/Timeline";
// import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import { Person } from "@styled-icons/material-rounded/Person";
import { DashboardCustomize } from "@styled-icons/material/DashboardCustomize";
import { MenuCollapseIcon } from "../assets/MenuCollapseIcon";
import CreditCardIcon from "@material-ui/icons/CreditCardOutlined";
import Hidden from "@material-ui/core/Hidden";
import Footer from "../Footer";

import Link from "../Link/";

// import useStyles from "./styles";
// import useDarkMode from "use-dark-mode";
import { useSpring, animated } from "react-spring";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Form from "../../Form";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const drawerWidth = 270;
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  root: {
    display: "flex",
  },
  defaultPaper: {
    color: "#8097B1",
    background: "transparent",
    boxShadow: "none",
    marginBottom: -10,
    border: "none",
  },
  headerWrapper: {
    [theme.breakpoints.down("md")]: {
      // position: "fixed !important",
      // paddingTop: "85vh",
      position: "sticky",
      display: "inline-block",
      marginTop: 0,
      paddingTop: 0,
    },
  },
  buttonsWrapper: {
    [theme.breakpoints.up("md")]: {
      marginTop: 8.5,
    },
  },
  donationButton: {
    // boxShadow: "5px 6px 10px rgba(33, 150, 243, 0.31)",
    borderRadius: 4,
    color: "#fff",
    width: 240,
    height: 54,
    top: -5.375,
    // //******** */
    [theme.breakpoints.down("md")]: {
      marginTop: "2rem",
      width: "100%",
    },
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 85,
    paddingLeft: 18,
    paddingRight: 35,
    backgroundColor: "#fff",
    boxShadow: "6px 9px 17px rgba(135, 152, 173, 0.04)",
    zIndex: 1201,
  },
  menuProfile: {
    // marginLeft: "22em",
    // marginTop: "68px"
  },
  appBarWrapper: {
    display: "flex",
    marginLeft: "auto",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 1,
    marginRight: 50,
  },
  drawerMobile: {
    display: "grid !important",
    placeContent: "center !important",
    width: "100% !important",
    // ///********* */
    transform: "translate(0px, 0px)",
    transition: "all 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  drawerPaper: {
    width: drawerWidth,
    paddingTop: 180,
    border: "none",
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerBottom: {
    display: "flex",
    marginTop: "auto",
    alignItems: "center",
    paddingLeft: 25,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  checked: {
    background: "red",
  },
  drawerMenuItem: {
    height: 72,
    paddingLeft: 37,
    transition: "1s",
    opacity: 1,
    "&:hover": {
      backgroundColor: "#F7FAFC",
    },
    "&:focus": {
      backgroundColor: "#F7FAFC",
    },
  },
  drawerMenuIcon: {
    color: "#2E384D",
    background: "transparent",
    marginRight: 5,
  },
  drawerMenuText: {
    color: "#B0BAC9",
    fontSize: 15,
    fontWeight: 600,
  },
  drawerMenuTextCollapsed: {
    transition: ".6s",
    opacity: 0,
  },
  icon: {
    color: "#0E0B1F",
  },
  iconActive: {
    color: "#00d4ff",
    padding: 14,
    marginTop: -10,
    marginLeft: -15,
    backgroundColor: "#0E0B1F",
    borderRadius: 3,
    display: "flex",
    position: "absolute",
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 28,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: 136,
    marginRight: 113,
    [theme.breakpoints.down("md")]: {
      marginRight: "auto",
      marginLeft: "auto",
      padding: "10px 3rem",
    },
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  logo: {
    alignItems: "flex-start",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  avatarAccount: {
    width: 46,
    height: 46,
    fontSize: 16,
    fontWeight: 600,
    color: "#95ACC1",
    backgroundColor: "#EDF1F4",
    paddingBottom: 1,
  },
  userName: {
    marginLeft: "auto",
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  section: {
    width: "100%",
    display: "flex",
  },
  sectionMobile: {
    width: "100%",
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9997,
  },
  paper: {
    position: "relative",
    color: "white",
    display: "grid",
    placeContent: "center",
    padding: "4rem",
    width: "35%",
    backgroundColor: "black !important",
    borderRadius: 5,
    // border: '2px solid #000',
    boxShadow: theme.shadows[4],
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));

const path = [
  {
    id: 0,
    nome: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 1,
    nome: "Contribuições",
    url: "/dashboard/contribuicoes",
  },
  {
    id: 2,
    nome: "Perfil",
    url: "/dashboard/perfil",
  },
];

export const Layout = ({ children, user }: any) => {
  const theme = useTheme();
  let userName = "Cláudia Milano";
  if (user) {
    userName = `${user.firstName} ${user.lastName}`;
  }

  type Anchor = "top" | "left" | "bottom" | "right";

  const classes = useStyles();

  const router = useRouter();

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  // const { value: isDark, toggle: toggleDarkMode } = useDarkMode();

  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const mobileMenuId = "primary-search-account-menu-mobile";
  const menuId = "appbar-menu";

  // /new
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // / end new

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // const [expand, setExpand] = React.useState(false);

  // const handleClickExpand = () => {
  //  setExpand(!expand);
  // };
  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileOpen(false);
  };

  const handleMobileMenuOpen = () => {
    setMobileOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = (e: any) => {
    e.preventDefault();
    router.push("/");
  };

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsMobileMenuOpen({ ...isMobileMenuOpen, [anchor]: open });

    open ? setMobileOpen(true) : setMobileOpen(false);
  };

  const drawer = (
    <>
      <Box marginLeft="auto">
        <Hidden lgUp>
          <IconButton
            aria-label="Close mobile menu"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            disableRipple={true}
            disableFocusRipple={true}
            className={classes.drawerMenuIcon}
            onClick={
              mobileOpen == true ? handleMobileMenuClose : handleMobileMenuOpen
            }
          >
            <CloseIcon />
          </IconButton>
        </Hidden>
      </Box>
      <List component="div">
        {path.map((path: any, index: number) => (
          <ListItem key={path.id} className={classes.drawerMenuItem}>
            <Link key={path.id} href={path.url}>
              <ListItemIcon className={clsx(classes.drawerMenuIcon)}>
                <>
                  {
                    {
                      0: (
                        <Link
                          activeClassName={clsx(classes.iconActive)}
                          href={path.url}
                        >
                          <DashboardCustomize size={24} />
                        </Link>
                      ),
                      1: (
                        <Link
                          activeClassName={clsx(classes.iconActive)}
                          href={path.url}
                        >
                          <Timeline size={24} />
                        </Link>
                      ),
                      2: (
                        <Link
                          activeClassName={clsx(classes.iconActive)}
                          href={path.url}
                        >
                          <Person size={24} />
                        </Link>
                      ),
                    }[index]
                  }
                </>
              </ListItemIcon>
              <ListItemText
                className={
                  open == true
                    ? classes.drawerMenuText
                    : classes.drawerMenuTextCollapsed
                }
                primary={path.nome}
              />
            </Link>
          </ListItem>
        ))}
      </List>
      <div className={classes.drawerBottom}>
        <Hidden mdDown>
          <IconButton
            disableRipple={true}
            disableFocusRipple={true}
            className={classes.drawerMenuIcon}
            onClick={open == true ? handleDrawerClose : handleDrawerOpen}
          >
            <MenuCollapseIcon />
          </IconButton>
        </Hidden>
      </div>
    </>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.menuProfile}
    >
      <MenuItem onClick={handleMenuClose}>Meu perfil</MenuItem>
      <MenuItem onClick={handleLogout}>Desconectar</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <div className={classes.section}>
            <IconButton
              edge="start"
              disableFocusRipple={true}
              disableRipple={true}
              className={clsx(classes.iconButton, classes.logo)}
              aria-label="Logo"
            >
              <Image
                src="/logo.svg"
                alt="Picture of the website logo"
                width="18px"
                height={"auto"}
                loading="eager"
              />
            </IconButton>

            <div className={classes.appBarWrapper}>
              <Hidden smDown>
                <Typography className={classes.userName} color="textSecondary">
                  Olá, {userName}
                </Typography>
                <IconButton
                  edge="end"
                  aria-haspopup="true"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  disableFocusRipple={true}
                  disableRipple={true}
                  className={classes.iconButton}
                >
                  <Avatar className={classes.avatarAccount}>CM</Avatar>
                </IconButton>
              </Hidden>

              {renderMenu}

              <Hidden lgUp>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  disableRipple={true}
                  disableFocusRipple={true}
                  className={classes.drawerMenuIcon}
                  onClick={
                    mobileOpen == true
                      ? handleMobileMenuClose
                      : handleMobileMenuOpen
                  }
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <nav>
        <Hidden lgUp>
          <SwipeableDrawer
            variant="temporary"
            open={mobileOpen}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </SwipeableDrawer>
        </Hidden>

        <Hidden mdDown>
          <Drawer
            variant="permanent"
            open={open}
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx(
                {
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                },
                classes.drawerPaper
              ),
            }}
            anchor={theme.direction === "rtl" ? "right" : "left"}
            onClose={handleDrawerToggle}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {/* Menu central da aplicação */}
        <Grid item xs={12}>
          <Paper className={classes.defaultPaper}>
            <Box display="flex" width={1} className={classes.headerWrapper}>
              <Typography variant="body2">Painel</Typography>
              <Box marginLeft="auto">
                <Button
                  className={classes.donationButton}
                  endIcon={<CreditCardIcon />}
                  onClick={handleOpenModal}
                >
                  Doar agora
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <animated.div style={springProps}>{children}</animated.div>
        {/* <Box className={classes.buttonsWrapper}>
          <Hidden lgUp>
            <Button
              className={classes.donationButton}
              endIcon={<CreditCardIcon />}
              onClick={handleOpenModal}
            >
              Doar agora
            </Button>
          </Hidden>
          <Footer />
      </Box>*/}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div className={classes.paper}>
            <Fade in={openModal}>
              <Form />
            </Fade>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default Layout;
