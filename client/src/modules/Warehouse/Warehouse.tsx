import React, { useEffect, useMemo, useState } from "react";
import ItemsTable, { Item } from "./ItemsTable/ItemsTable";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import SelectFormik from "../../libs/components/SelectFormik";

export interface IItem {
  name: string;
  description: string;
  count: number;
  min_count: number;
  retail_price: number;
  net_price: number;
  wholesale_price: number;
  provider_id: number;
}

const initialFormValue: IItem = {
  name: "",
  description: "",
  count: 0,
  min_count: 0,
  retail_price: 0,
  net_price: 0,
  wholesale_price: 0,
  provider_id: -1,
};

export interface IProvider {
  id: number;
  country: string;
  name: string;
  email: string;
  phone: string;
}

const Warehouse = () => {
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [providers, setProviders] = useState<Array<IProvider>>([]);
  const [items, setItems] = useState<Array<Item>>([]);

  const handleModalClose = () => {
    setAddItemOpen(false);
  };

  const handleAddClick = () => {
    setAddItemOpen(true);
  };

  const handleSubmit = async (values: IItem) => {
    try {
      await fetch(`${process.env.REACT_APP_API_HOST}/items/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      await fetchItems();
      handleModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchItems = useMemo(() => {
    return async () => {
      const { data } = await (
        await fetch(`${process.env.REACT_APP_API_HOST}/items`)
      ).json();
      setItems(data);
    };
  }, []);

  useEffect(() => {
    const fetchProviders = async () => {
      const { data } = await (
        await fetch(`${process.env.REACT_APP_API_HOST}/provider/all`)
      ).json();
      setProviders(data);
    };
    fetchProviders();
  }, []);

  return (
    <>
      <Typography
        component={"h1"}
        sx={{ width: "100%", fontSize: "28px", textAlign: "center" }}
      >
        Склад
      </Typography>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button variant="contained" onClick={handleAddClick}>
          Додати +
        </Button>
      </div>
      <ItemsTable items={items} fetchItems={fetchItems} />
      <Modal open={addItemOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            background: "#fff",
            minWidth: 360,

            padding: 8,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography sx={{ fontSize: 28 }} align="center">
            Додати товар
          </Typography>
          <Formik
            initialValues={initialFormValue}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {(props: FormikProps<any>) => {
              return (
                <Form style={{ display: "flex", flexDirection: "column" }}>
                  <Field
                    onChange={props.handleChange}
                    id="name"
                    name="name"
                    component={TextField}
                    label="Назва"
                    sx={{ marginTop: 2 }}
                    multiline
                  />
                  <Field
                    name="provider_id"
                    component={SelectFormik}
                    label="Постачальник"
                    sx={{ marginTop: 2 }}
                    defaultValue={-1}
                  >
                    <MenuItem value={-1}>Не обрано</MenuItem>
                    {providers.map((provider) => (
                      <MenuItem value={provider.id}>
                        {provider.name} - {provider.country}
                      </MenuItem>
                    ))}
                  </Field>
                  <Field
                    id="description"
                    onChange={props.handleChange}
                    name="description"
                    component={TextField}
                    label="Опис"
                    sx={{ marginTop: 2 }}
                    multiline
                  />
                  <Field
                    onChange={props.handleChange}
                    type="number"
                    name="count"
                    id="count"
                    component={TextField}
                    label="Кількість"
                    sx={{ marginTop: 2 }}
                  />
                  <Field
                    id="min_count"
                    onChange={props.handleChange}
                    type="number"
                    name="min_count"
                    component={TextField}
                    label="Мінімальна кількість"
                    sx={{ marginTop: 2 }}
                  />
                  <Field
                    onChange={props.handleChange}
                    type="number"
                    name="net_price"
                    id="net_price"
                    component={TextField}
                    label="Собівартість"
                    sx={{ marginTop: 2 }}
                  />
                  <Field
                    onChange={props.handleChange}
                    type="number"
                    name="retail_price"
                    id="retail_price"
                    component={TextField}
                    label="Ціна"
                    sx={{ marginTop: 2 }}
                  />
                  <Field
                    onChange={props.handleChange}
                    type="number"
                    name="wholesale_price"
                    id="wholesale_price"
                    component={TextField}
                    label="Оптова ціна"
                    sx={{ marginTop: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ marginTop: 2 }}
                  >
                    Зберегти
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Warehouse;
