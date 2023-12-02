import React from "react";
import { Order, OrderStatus } from "./Orders";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

interface Props {
  order: Order;
  fetchOrders: () => Promise<void>;
}

const OrdersRow = ({ order, fetchOrders }: Props) => {
  const changeStatus = (newStatus: OrderStatus) => {
    return async () => {
      await fetch(`${process.env.REACT_APP_API_HOST}/order/${order.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchOrders();
    };
  };

  const handleStatusChange = (e: SelectChangeEvent) => {
    console.log(e.target.value);
    changeStatus(Number(e.target.value))();
  };

  return (
    <TableRow>
      <TableCell>{order.id || ""}</TableCell>
      <TableCell>
        {order.items.map((item) => (
          <Typography key={item.id}>
            {item.name} - {item.order_count}
          </Typography>
        ))}
      </TableCell>
      <TableCell>
        <Select value={order.status as any} onChange={handleStatusChange}>
          <MenuItem value={OrderStatus.NEW}>Новий</MenuItem>
          <MenuItem value={OrderStatus.FINISHED}>Завершений</MenuItem>
          <MenuItem value={OrderStatus.CANCELED}>Відхилений</MenuItem>
        </Select>
      </TableCell>
      <TableCell>-</TableCell>
    </TableRow>
  );
};

export default OrdersRow;
