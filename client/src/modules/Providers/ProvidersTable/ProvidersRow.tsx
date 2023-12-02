import React from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import { Provider } from "./ProvidersTable";
import DeleteIcon from "@mui/icons-material/DeleteForever";

interface Props {
  provider: Provider;
  fetchProviders: () => void;
}

const ProvidersRow = ({ provider, fetchProviders }: Props) => {
  const handleDeleteItem = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_HOST}/provider/${provider.id}`, {
        method: "DELETE",
      });
      await fetchProviders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableRow>
      <TableCell>{provider.name}</TableCell>
      <TableCell>{provider.country}</TableCell>
      <TableCell>{provider.email}</TableCell>
      <TableCell>{provider.phone}</TableCell>
      <TableCell>
        <IconButton onClick={handleDeleteItem}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ProvidersRow;
