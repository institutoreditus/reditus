import React from "react";
import DefaultCard from "../DefaultCard";

import { Line } from "react-chartjs-2";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    chart: {
      position: "relative",
    },
  })
);

const data = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,

      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "#00d4ff",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#2E384D",
      pointBackgroundColor: "black",
      pointBorderWidth: 2,

      pointHoverBackgroundColor: "black",
      pointHoverBorderColor: "black",

      pointRadius: 1,
      pointHitRadius: 5,

      data: [60, 70, 75, 80, 90, 100, 110, 115],
    },
  ],
};

const options = {
  gridLines: {
    display: false,
  },
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
          minor: {
            lineHeight: 4,
          },
        },
      },
    ],
  },
};

export const DonationChart = (props: any) => {
  const classes = useStyles();

  return (
    <DefaultCard alt={props.alt}>
      <Box className={classes.chart}>
        <Line data={data} height={200} options={options} />
      </Box>
    </DefaultCard>
  );
};

export default DonationChart;
