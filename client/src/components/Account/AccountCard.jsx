import React from "react";
import { Stack, Box, Typography, Grid } from "@mui/material";
const AccountCard = ({date, total_value}) => {
  return (
    <Stack width="100%" height="150px" pt={2} border="2px solid gray">
    <Grid container justifyContent="space-between">
      <Grid item ml={5}>
        <Typography variant="h6">{date}</Typography>
      </Grid>
      <Grid item mr={5}>
        <Typography variant="h6">{total_value.toLocaleString()} บาท</Typography>
      </Grid>
    </Grid>
  </Stack>
  )
};

export default AccountCard;
