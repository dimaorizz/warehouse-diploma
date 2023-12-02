import React, { useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import ProvidersRow from "./ProvidersRow";

export interface Provider {
  id: number;
  country: string;
  name: string;
  email: string;
  phone: string;
}

interface Props {
  providers: Array<Provider>;
  fetchProviders: () => void;
}

const ProvidersTable = ({ providers, fetchProviders }: Props) => {
  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ border: "1px solid #000", marginTop: "16px" }}>
        <TableHead>
          <TableRow>
            <TableCell>Назва</TableCell>
            <TableCell>Країна</TableCell>
            <TableCell>Пошта</TableCell>
            <TableCell>Телефон</TableCell>
            <TableCell>Дії</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {providers.map((provider) => (
            <ProvidersRow
              fetchProviders={fetchProviders}
              provider={provider}
              key={provider.id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProvidersTable;
