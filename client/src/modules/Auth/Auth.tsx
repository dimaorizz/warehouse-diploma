import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_HOST}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = await response.json();
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TextField
        label="Логін"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Пароль"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Log in
      </Button>
    </>
  );
};

export default Auth;
