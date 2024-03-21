import React from "react";
import {
  Button,
  Typography,
  CardActions,
  CardContent,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  return (
    <>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize={70}>{order.product_name}</Typography>
          <Typography fontSize={70} color='InfoText'>{order.quantity} Unit</Typography>
        </Stack>
      </CardContent>
    </>
  );
};

export default OrderCard;
