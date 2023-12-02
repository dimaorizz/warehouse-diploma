import React, { useCallback, useEffect, useMemo, useState } from "react";
import ProvidersTable, { Provider } from "./ProvidersTable/ProvidersTable";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";

const initialFormValue: Omit<Provider, "id"> = {
  name: "",
  country: "",
  email: "",
  phone: "",
};

const Providers = () => {
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [providers, setProviders] = useState<Array<Provider>>([]);

  const handleModalClose = () => {
    setAddItemOpen(false);
  };

  const handleAddClick = () => {
    setAddItemOpen(true);
  };

  const handleSubmit = async (values: Omit<Provider, "id">) => {
    try {
      await fetch(`${process.env.REACT_APP_API_HOST}/provider/create`, {
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

  const fetchProviders = useCallback(async () => {
    const { data } = await (
      await fetch(`${process.env.REACT_APP_API_HOST}/provider/all`)
    ).json();
    setProviders(data);
  }, []);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  return (
    <>
      <Typography
        component={"h1"}
        sx={{ width: "100%", fontSize: "28px", textAlign: "center" }}
      >
        Постачальники
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
      <ProvidersTable providers={providers} fetchProviders={fetchProviders} />
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
            Додати постачальника
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
                    onChange={props.handleChange}
                    id="country"
                    name="country"
                    component={TextField}
                    label="Країна"
                    sx={{ marginTop: 2 }}
                    multiline
                  />
                  <Field
                    onChange={props.handleChange}
                    id="email"
                    name="email"
                    component={TextField}
                    label="Пошта"
                    sx={{ marginTop: 2 }}
                    multiline
                  />
                  <Field
                    onChange={props.handleChange}
                    id="phone"
                    name="phone"
                    component={TextField}
                    label="Телефон"
                    sx={{ marginTop: 2 }}
                    multiline
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

export default Providers;
