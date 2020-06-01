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

const ChangePasswordPage = ({ user, setUser }) => {
  const classes = useStyles();
  let history = useHistory();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState({ original: "", repeat: "" });
  const [error, setError] = useState({
    oldPassword: false,
    newPasswordOriginal: false,
    newPasswordRepeat: false,
  });

  function isFormValid() {
    let hasErrors = false;
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        oldPassword
      )
    ) {
      setError((error) => {
        return { ...error, oldPassword: true };
      });
      hasErrors = true;
    }
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        newPassword.original
      )
    ) {
      setError((error) => {
        return { ...error, newPasswordOriginal: true };
      });
      hasErrors = true;
    }
    if (newPassword.original !== newPassword.repeat) {
      setError((error) => {
        return { ...error, newPasswordRepeat: true };
      });
      hasErrors = true;
    }

    return !hasErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError({
      oldPassword: false,
      newPassword: false,
      loginOldPassword: false,
      loginPassword: false,
    });
    if (isFormValid()) {
      fetch("http://localhost:3001/users/change-password/" + user.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword: newPassword.original,
        }),
      })
        .then((response) => {
          if (!response.ok) throw Error(response);
          return response.json();
        })
        .then((result) => {
          setUser({ ...user, timeLastMod: result.timeLastMod });
          history.push("/");
        })
        .catch((err) => {
          setError((error) => {
            return { ...error, oldPassword: true };
          });
          return false;
        });
    }
  }

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="oldPassword"
          value={oldPassword}
          type="password"
          error={error.oldPassword}
          label="OldPassword"
          helperText={error.oldPassword && "wrong old password"}
          variant="outlined"
          autoComplete="on"
          onChange={({ target }) => setOldPassword(target.value)}
        />
        <TextField
          name="newPassword"
          value={newPassword.original}
          type="password"
          error={error.newPasswordOriginal}
          label="NewPassword"
          helperText={
            error.newPasswordOriginal &&
            "the new password doesn't comply with the rules"
          }
          variant="outlined"
          autoComplete="on"
          onChange={({ target }) =>
            setNewPassword({ ...newPassword, original: target.value })
          }
        />
        <TextField
          name="newPasswordRep"
          value={newPassword.repeat}
          type="password"
          error={error.newPasswordRepeat}
          label="NewPassword"
          helperText={error.newPasswordRepeat && "the passwords do not match"}
          variant="outlined"
          autoComplete="on"
          onChange={({ target }) =>
            setNewPassword({ ...newPassword, repeat: target.value })
          }
        />
        <Button type="submit" variant="contained" color="primary">
          Change password
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
