import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Field, FieldArray, Form, Formik, FormikProps } from "formik";
import SelectFormik from "../../libs/components/SelectFormik";
import { Item } from "../Warehouse/ItemsTable/ItemsTable";
import OrdersTable from "./OrdersTable";

export interface OrderItem extends Item {
  order_count: number;
}

export interface Order {
  id?: number;
  status: OrderStatus;
  created_at: string;
  items: Array<OrderItem>;
}

export enum OrderStatus {
  NEW = 0,
  FINISHED,
  CANCELED,
}

export interface OrderForm {
  status: OrderStatus;
  items: Array<{ id: number; count: number }>;
}

const initialFormValue: OrderForm = {
  status: OrderStatus.NEW,
  items: [],
};

const Orders = () => {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [items, setItems] = useState<Array<Item>>([]);

  const handleModalClose = () => {
    setOrderModalOpen(false);
  };

  const handleAddClick = () => {
    setOrderModalOpen(true);
  };

  const fetchOrders = useCallback(async () => {
    const { data } = await (
      await fetch(`${process.env.REACT_APP_API_HOST}/order`)
    ).json();
    setOrders(data);
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      await fetch(`${process.env.REACT_APP_API_HOST}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
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
    fetchItems();
    fetchOrders();
  }, [fetchItems, fetchOrders]);

  return (
    <>
      <Button variant="contained" onClick={handleAddClick}>
        Додати +
      </Button>
      <OrdersTable orders={orders} fetchOrders={fetchOrders} />
      <Modal open={orderModalOpen} onClose={handleModalClose}>
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
            Створення замовлення
          </Typography>
          <Formik
            initialValues={initialFormValue}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {(props: FormikProps<OrderForm>) => {
              return (
                <Form style={{ display: "flex", flexDirection: "column" }}>
                  <Field
                    onChange={props.handleChange}
                    id="status"
                    name="status"
                    component={SelectFormik}
                    label="Назва"
                    sx={{ marginTop: 2 }}
                    multiline
                  >
                    <MenuItem value={OrderStatus.NEW}>Новий</MenuItem>
                    <MenuItem value={OrderStatus.FINISHED}>Завершений</MenuItem>
                    <MenuItem value={OrderStatus.CANCELED}>Відхилений</MenuItem>
                  </Field>
                  <FieldArray
                    name="items"
                    render={({ move, swap, push, insert, unshift, pop }) => (
                      <>
                        {props.values.items.map((item, index) => (
                          <div key={index}>
                            <Field
                              onChange={props.handleChange}
                              id={`items[${index}].id`}
                              name={`items[${index}].id`}
                              component={SelectFormik}
                              label="Товар"
                              sx={{ marginTop: 2 }}
                              multiline
                            >
                              {items.map((item) => (
                                <MenuItem value={item.id}>{item.name}</MenuItem>
                              ))}
                            </Field>
                            <Field
                              type="number"
                              onChange={props.handleChange}
                              id={`items[${index}].count`}
                              name={`items[${index}].count`}
                              component={TextField}
                              label="Кількість"
                              sx={{ marginTop: 2 }}
                            />
                          </div>
                        ))}
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => push({ id: -1, count: 0 })}
                          sx={{ marginTop: 2 }}
                        >
                          Додати товар
                        </Button>
                      </>
                    )}
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

export default Orders;
