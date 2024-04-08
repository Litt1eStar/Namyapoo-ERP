import React from "react";
import {
  Stack,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Accounting = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Stack height="100%" alignItems="center" justifyContent="flex-start">
      <Button variant="inherit">
        <HomeIcon />
      </Button>

   
    </Stack>
  );
};

export default Accounting;