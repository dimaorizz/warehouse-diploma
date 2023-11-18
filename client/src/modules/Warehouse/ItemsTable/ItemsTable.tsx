import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import ItemTableRow from "./ItemTableRow";
import { IProvider } from "../Warehouse";

export interface Item {
  id: number;
  name: string;
  description: string;
  count: number;
  min_count: number;
  net_price: number;
  retail_price: number;
  wholesale_price: number;
  provider: IProvider;
  provider_id: number;
  created_at: string;
  updated_at: string;
}

interface Props {
  items: Array<Item>;
  fetchItems: () => void;
}

const ItemsTable = ({ items, fetchItems }: Props) => {
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ border: "1px solid #000", marginTop: "16px" }}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={4} />
            <TableCell
              colSpan={2}
              align="center"
              sx={{ background: "#DCDCDC", border: "1px solid #000" }}
            >
              Кількість
            </TableCell>
            <TableCell
              colSpan={3}
              align="center"
              sx={{ background: "#DCDCDC", border: "1px solid #000" }}
            >
              Ціни
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Артикул</TableCell>
            <TableCell>Назва</TableCell>
            <TableCell>Постачальник</TableCell>
            <TableCell>Опис</TableCell>
            <TableCell>Кількість</TableCell>
            <TableCell>Мін. кількість</TableCell>
            <TableCell>Роздрібна ціна</TableCell>
            <TableCell>Оптова ціна</TableCell>
            <TableCell>Собівартість</TableCell>
            <TableCell>Дії</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <ItemTableRow fetchItems={fetchItems} item={item} key={item.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
