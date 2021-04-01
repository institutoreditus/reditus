import React from "react";
import { Box } from "@material-ui/core";
import DefaultCard from "../DefaultCard";

export const StatusCard = ({ children }: any) => {
  return (
    <DefaultCard>
      <Box>
        <Box>{children}</Box>
      </Box>
    </DefaultCard>
  );
};

export default StatusCard;
