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

export interface Item {
  id: number;
  name: string;
  description: string;
  count: number;
  min_count: number;
  net_price: number;
  retail_price: number;
  wholesale_price: number;
  provider_id: number;
  created_at: string;
  updated_at: string;
}

const ItemsTable = () => {
  // console.log(process.env.REACT_APP_API_HOST);
  const [items, setItems] = useState<Array<Item>>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await (
        await fetch(`${process.env.REACT_APP_API_HOST}/items`)
      ).json();
      setItems(data);
    };
    fetchItems();
  });

  return (
    <TableContainer component={Paper}>
      <Table>
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
            <ItemTableRow item={item} key={item.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
