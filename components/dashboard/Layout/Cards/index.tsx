import Box from "@material-ui/core/Box";

import Grid from "@material-ui/core/Grid";

// import { motion } from "framer-motion";
// import { AnimateSharedLayout, AnimatePresence } from "framer-motion";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import DonationChart from "./DonationChart";
import DefaultCard from "./DefaultCard";
import StatusCard from "./StatusCard";
import TableCard from "./TableCard";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

const bannerCard = "/bannerCard.png";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    defaultPaper: {
      color: "#8097B1",
      background: "transparent",
      boxShadow: "none",
      marginBottom: -10,
      border: "none",
    },
    paper: {
      color: "#8097B1",
      padding: theme.spacing(2),
      marginTop: 14,
      border: "1px solid rgba(46, 91, 255, 0.08)",
      boxSizing: "border-box",
      boxShadow: "none",
      borderRadius: "1px",
      height: "12rem",
    },
    wrapper: {
      [theme.breakpoints.down("lg")]: {
        display: "flex !important",
        flexDirection: "column-reverse !important",
      },
    },
    cardBanner: {
      backgroundImage: `url(${bannerCard})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: 288,
      // filter: "drop-shadow(0px 10px 31px rgba(128, 151, 177, 0.2))",
      borderRadius: 2,
    },
    donationButton: {
      boxShadow: "5px 6px 10px rgba(33, 150, 243, 0.31)",
      borderRadius: 4,
      color: "#fff",
      width: 240,
      height: 54,
      top: -5.375,
    },
    currencyText: {
      fontSize: 45.4,
      fontWeight: 300,
      color: "#231F20",
    },
    iconCard: {
      color: "#231F20",
      fontSize: 46,
      borderRadius: 50,
      padding: 8,
      backgroundColor: "#d9fbff",
    },
  })
);

export const Cards = () => {
  const classes = useStyles();
  // const [selectedId, setSelectedId] = useState(null);

  // let fromDate: Date | undefined = undefined;
  // let toDate: Date | undefined = undefined;
  // let groupBy: BalanceGrouping | undefined = undefined;

  // TODO: Get data from getBalance api
  const totalDonationAmountValue = 1.4;
  const totalUserDonationAmountValue = 1245;

  return (
    <>
      <Box width={1} height={1}>
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={5}>
              <Typography>Evolução do montante doado</Typography>
              <DonationChart alt="Donation chart" />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Box marginTop={4.7}>
                <StatusCard cardLabel="Total gerenciado pelo fundo">
                  <PublicOutlinedIcon className={classes.iconCard} />
                  <Typography variant="body2" className={classes.currencyText}>
                    ${totalDonationAmountValue}mi
                  </Typography>
                  <Typography>Total gerenciado pelo fundo</Typography>
                </StatusCard>
                <StatusCard>
                  <CheckCircleOutlineOutlinedIcon
                    className={classes.iconCard}
                  />
                  <Typography variant="body2" className={classes.currencyText}>
                    ${totalUserDonationAmountValue}
                  </Typography>
                  <Typography>Quanto eu já doei</Typography>
                </StatusCard>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>Minhas atividades</Typography>
              <TableCard />
            </Grid>

            <Grid item xs={12} className={classes.cardBanner}>
              <DefaultCard anotherClasses={classes.cardBanner}>
                <Box borderRadius={0.25}>Banner text</Box>
              </DefaultCard>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
};

export default Cards;
