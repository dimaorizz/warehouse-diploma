import React from "react";
import { Select } from "@mui/material";

const SelectFormik = ({ children, form, field, sx }: any) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <Select
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
      sx={sx}
    >
      {children}
    </Select>
  );
};

export default SelectFormik;
