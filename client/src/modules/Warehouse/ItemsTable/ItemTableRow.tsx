import React from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import { Item } from "./ItemsTable";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import WarningIcon from "@mui/icons-material/Warning";

interface Props {
  item: Item;
  fetchItems: () => void;
}

const ItemTableRow = ({ item, fetchItems }: Props) => {
  const handleDeleteItem = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_HOST}/items/${item.id}`, {
        method: "DELETE",
      });
      await fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableRow>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>
        {item.provider.name} - {item.provider.country}
      </TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>
        <div style={{ display: "flex", alignItems: "center" }}>
          {item.count}
          {item.count <= item.min_count && (
            <WarningIcon color="error" sx={{ marginLeft: 1 }} />
          )}
        </div>
      </TableCell>
      <TableCell>{item.min_count}</TableCell>
      <TableCell>{item.retail_price}</TableCell>
      <TableCell>{item.wholesale_price}</TableCell>
      <TableCell>{item.net_price}</TableCell>
      <TableCell>
        <IconButton onClick={handleDeleteItem}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ItemTableRow;
