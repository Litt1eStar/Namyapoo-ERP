import { useNavigate, useParams } from "react-router-dom";
import OrderModal from "../components/Workspace/OrderModal";
import { Box, Button, Card, Stack } from "@mui/material";
import OrderCard from "../components/Workspace/OrderCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Workspace = () => {
  const { workspace_id } = useParams();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrderFromDb = async () => {
    try {
      const res = await fetch(`/api/order/getAllOrder/${workspace_id}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setOrders(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClick = async () => {
    try {
      const transactionData = orders.map((order) => ({ order_id: order._id }));
      const res = await fetch(`/api/transaction/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData)
      });
      const data = await res.json();
      if(data.error)
        throw new Error(data.error)

      navigate(`/transaction/${data._id}`);
    } catch (error) {
      toast.error(error.message)
    }
  };
  useEffect(() => {
    fetchOrderFromDb();
  }, []);

  return (
    <>
      <OrderModal
        workspace_id={workspace_id}
        fetchOrderFromDb={fetchOrderFromDb}
      />

      <div style={{ height: "80%", overflowY: "auto" }}>
        <Stack pt="30px" spacing={2}>
          {orders?.map((order) => (
            <Card variant="outlined" key={order._id}>
              <OrderCard order={order} />
            </Card>
          ))}
        </Stack>
      </div>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          width: "100%",
          height: "130px",
          fontSize: "50px",
          marginTop: "150px",
        }}
        onClick={handleClick}
      >
        คำนวณ
      </Button>
    </>
  );
};

export default Workspace;
