import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import OrdersRow from "./OrdersRow";
import { Order } from "./Orders";

interface Props {
  orders: Array<Order>;
  fetchOrders: () => Promise<void>;
}

const OrdersTable = ({ orders, fetchOrders }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ border: "1px solid #000", marginTop: "16px" }}>
        <TableHead>
          <TableRow>
            <TableCell>Номер замовлення</TableCell>
            <TableCell>Товари</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Дії</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <OrdersRow fetchOrders={fetchOrders} order={order} key={order.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
