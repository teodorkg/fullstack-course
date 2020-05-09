import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",

    margin: "2%",
    marginTop: "5%",

    "& > form": {
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
    },

    "& > form > *": {
      margin: theme.spacing(1),
    },

    "& .MuiInputBase-input": {
      width: 400,
    },

    "& .MuiButtonBase-root": {
      width: 130,
      alignSelf: "center",
    },
  },
}));

const LoginPage = ({ setUser, users }) => {
  const classes = useStyles();
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    username: false,
    password: false,
    loginUsername: false,
    loginPassword: false,
  });

  function isFormValid(username, password) {
    let hasErrors = false;
    if (!/^[a-zA-Z0-9_]+$/.test(username) || username.length > 15) {
      setError((error) => {
        return { ...error, username: true };
      });
      hasErrors = true;
    }
    if (password.length < 8) {
      setError((error) => {
        return { ...error, password: true };
      });
      hasErrors = true;
    }

    return !hasErrors;
  }

  function authenticate(username, password) {
    const foundUser = users.find((user) => user.username === username);
    if (foundUser) {
      if (foundUser.password === password) {
        setUser({ ...foundUser });
        return true;
      } else {
        setError((error) => {
          return { ...error, loginPassword: true };
        });
        return false;
      }
    }
    setError((error) => {
      return { ...error, loginUsername: true };
    });
    return false;
  }

  function logIn(event) {
    event.preventDefault();
    setError({
      username: false,
      password: false,
      loginUsername: false,
      loginPassword: false,
    });
    const u = username;
    const p = password;
    if (isFormValid(u, p) && authenticate(u, p)) {
      history.push("/");
    }
  }

  return (
    <div className={classes.root}>
      <form onSubmit={logIn}>
        <TextField
          name="username"
          value={username}
          error={error.username || error.loginUsername}
          label="Username"
          helperText={
            (error.loginUsername && "wrong username") ||
            (error.username && "the username doesn't comply with the rules")
          }
          variant="outlined"
          autoComplete="on"
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          name="password"
          value={password}
          type="password"
          error={error.password || error.loginPassword}
          label="Password"
          helperText={
            (error.loginPassword && "wrong password") ||
            (error.password && "the password doesn't comply with the rules")
          }
          variant="outlined"
          autoComplete="on"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Log in
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
