import React from "react";
import { useParams } from "react-router-dom";

const Transaction = () => {
    const { transaction_id } = useParams();
  return <div>{transaction_id}</div>;
};

export default Transaction;
