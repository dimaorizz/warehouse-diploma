import React from "react";
import { TableRow, TableCell } from "@mui/material";
import { Item } from "./ItemsTable";

interface Props {
  item: Item;
}

const ItemTableRow = ({ item }: Props) => {
  return (
    <TableRow>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.provider_id}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>{item.count}</TableCell>
      <TableCell>{item.min_count}</TableCell>
      <TableCell>{item.retail_price}</TableCell>
      <TableCell>{item.wholesale_price}</TableCell>
      <TableCell>{item.net_price}</TableCell>
      <TableCell>Actions</TableCell>
    </TableRow>
  );
};

export default ItemTableRow;
