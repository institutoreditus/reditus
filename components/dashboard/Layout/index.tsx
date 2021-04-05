import React from "react";
import clsx from "clsx";
import { Grid, Paper, Button } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
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
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import { useRouter } from "next/router";
import Image from "next/image";
import Avatar from "@material-ui/core/Avatar";
import TimelineRoundedIcon from "@material-ui/icons/TimelineRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import { DashboardIcon } from "../assets/DashboardIcon";
import { MenuCollapseIcon } from "../assets/MenuCollapseIcon";
import CreditCardIcon from "@material-ui/icons/CreditCardOutlined";
import Footer from "../Footer";

// import useStyles from "./styles";
// import useDarkMode from "use-dark-mode";
import { useSpring, animated } from "react-spring";

import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 302;
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
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
  donationButton: {
    boxShadow: "5px 6px 10px rgba(33, 150, 243, 0.31)",
    borderRadius: 4,
    color: "#fff",
    width: 240,
    height: 54,
    top: -5.375,
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
    zIndex: 2,
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
  drawerPaper: {
    width: drawerWidth,
    paddingTop: 180,
    border: "none",
    overflow: "hidden",
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
    "&:hover": {
      color: "#00d4ff",
    },
    "&:active": {
      color: "#0E0B1F",
    },
  },
  overlayIconActive: {
    backgroundColor: "#0E0B1F !important",
    borderRadius: 3,
  },
  overlayIcon: {
    backgroundColor: "#fff",
    border: "none",
    height: 55,
    width: 55,
    paddingTop: 6,
    marginLeft: -16,
    zIndex: 1,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeIn,
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
  sectionDesktop: {
    width: "100%",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    width: "100%",
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const path = [
  {
    id: 1,
    nome: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 2,
    nome: "Contribuições",
    url: "/dashboard/contribuicoes",
  },
  {
    id: 3,
    nome: "Perfil",
    url: "/dashboard/perfil",
  },
];

export const Layout = ({ children }: any) => {
  const userName = "Cláudia Milano";
  const classes = useStyles();

  const router = useRouter();

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  // const { value: isDark, toggle: toggleDarkMode } = useDarkMode();

  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // const [expand, setExpand] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  // const [activePath, setActivePath] = React.useState("");

  // const handleClickExpand = () => {
  //  setExpand(!expand);
  // };
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Meu perfil</MenuItem>
      <MenuItem onClick={handleLogout}>Desconectar</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* Messages and notifications ->
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
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
          <div className={classes.grow} />
          {/* <Switch checked={isDark} onChange={toggleDarkMode} />*/}

          <div className={classes.sectionDesktop}>
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
            {/* Messages and notifications ->
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            */}

            <Typography className={classes.userName} color="textSecondary">
              Olá, {userName}
            </Typography>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              disableFocusRipple={true}
              disableRipple={true}
              className={classes.iconButton}
            >
              <Avatar className={classes.avatarAccount}>CM</Avatar>
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
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

            <Typography className={classes.userName} color="textSecondary">
              Olá, {userName}
            </Typography>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              className={classes.iconButton}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer
        variant="permanent"
        anchor="left"
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
      >
        <List component="div">
          {path.map((path: any, index: number) => (
            <ListItem
              onClick={() => {
                setIsActive(isActive === true ? false : true);
                // setActivePath(`${path.url}`);
                router.push(`${path.url}`);
              }}
              key={path.id}
              className={classes.drawerMenuItem}
              button={true}
              selected={path.index == path.id ? true : false}
            >
              <ListItemIcon className={clsx(classes.drawerMenuIcon)}>
                <>
                  {
                    {
                      0: (
                        <DashboardIcon
                          color="#2E384D"
                          className={classes.icon}
                        />
                      ),
                      1: <TimelineRoundedIcon className={classes.icon} />,
                      2: <PersonRoundedIcon className={classes.icon} />,
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
            </ListItem>
          ))}
        </List>
        <div className={classes.drawerBottom}>
          <IconButton
            disableRipple={true}
            disableFocusRipple={true}
            className={classes.drawerMenuIcon}
            onClick={open == true ? handleDrawerClose : handleDrawerOpen}
          >
            <MenuCollapseIcon />
          </IconButton>
        </div>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {/* Menu central da aplicação */}
        <Grid item xs={12}>
          <Paper className={classes.defaultPaper}>
            <Box display="flex" width={1}>
              <Typography variant="body2">Painel</Typography>
              <Box marginLeft="auto">
                <Button
                  className={classes.donationButton}
                  endIcon={<CreditCardIcon />}
                >
                  Doar agora
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <animated.div style={springProps}>{children}</animated.div>
        <Box marginTop={8.5}>
          <Footer />
        </Box>
      </main>
    </div>
  );
};

export default Layout;
