import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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

    "& [type=submit]": {
      width: 130,
      alignSelf: "center",
    },
  },
}));

const RegisterPage = ({ user, setUser, users, setUsers }) => {
  const classes = useStyles();
  let history = useHistory();

  const [regUser, setRegUser] = useState({
    ...user,
  });
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    sex: false,
    isAdmin: false,
    avatarSrc: false,
    aboutme: false,
    status: false,
  });

  function findNextIndex() {
    const maxIndex = users
      .map((user) => user.id)
      .reduce((prevId, nextId) => (prevId < nextId ? nextId : prevId));
    return 1 + parseInt(maxIndex);
  }

  function isFormValid() {
    const {
      username,
      password,
      sex,
      isAdmin,
      avatarSrc,
      aboutme,
      status,
    } = regUser;
    let hasErrors = false;
    if (!username.match(/^[a-zA-Z0-9_]+$/) || username.length > 15) {
      setErrors((errors) => {
        return { ...errors, username: true };
      });
      hasErrors = true;
    }
    if (password.length < 8) {
      setErrors((errors) => {
        return { ...errors, password: true };
      });
      hasErrors = true;
    }
    if (password.length < 8) {
      setErrors((errors) => {
        return { ...errors, password: true };
      });
      hasErrors = true;
    }

    return !hasErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrors({
      username: false,
      password: false,
      sex: false,
      isAdmin: false,
      avatarSrc: false,
      aboutme: false,
      status: false,
    });
    if (isFormValid()) {
      const now = new Date();
      const nowFormated = now.toLocaleString();
      if (regUser.id) {
        setUser({ ...regUser, timeLastMod: nowFormated });
        setRegUser({ ...regUser, timeLastMod: nowFormated });
        setUsers((users) => {
          return [...users, { ...regUser, timeLastMod: nowFormated }];
        });
      } else {
        setUsers((users) => {
          return [
            ...users,
            {
              ...regUser,
              id: findNextIndex(),
              timeCreated: nowFormated,
              timeLastMod: nowFormated,
            },
          ];
        });
        history.push("/login");
      }
    }
  }

  function handleChange({ target }) {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setRegUser((regUser) => {
      return {
        ...regUser,
        [target.name]: value,
      };
    });
  }

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        {regUser.id && (
          <TextField
            name="id"
            value={regUser.id}
            label="ID"
            variant="outlined"
            disabled
          />
        )}
        <TextField
          name="username"
          value={regUser.username}
          error={errors.username}
          label="Username"
          helperText={
            errors.username &&
            "the username doesn't comply with the rules or is taken"
          }
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="password"
          value={regUser.password}
          type="password"
          error={errors.password}
          label="Password"
          helperText={
            errors.password && "the password doesn't comply with the rules"
          }
          variant="outlined"
          onChange={handleChange}
          autoComplete="on"
          className="passwordField"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={regUser.isAdmin}
              onChange={handleChange}
              name="isAdmin"
              color="primary"
            />
          }
          label="Admin"
        />
        <TextField
          name="nickname"
          value={regUser.nickname}
          error={errors.nickname}
          label="Nickname"
          variant="outlined"
          onChange={handleChange}
        />
        <FormControl variant="outlined">
          <InputLabel id="sex">Sex</InputLabel>
          <Select
            labelId="sex"
            name="sex"
            value={regUser.sex}
            onChange={handleChange}
            label="Sex"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="avatarSrc"
          value={regUser.avatarSrc}
          error={errors.avatarSrc}
          label="Avatar url"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          name="aboutme"
          value={regUser.aboutme}
          error={errors.aboutme}
          label="About me"
          variant="outlined"
          onChange={handleChange}
          multiline
          rows="4"
        />
        <FormControl variant="outlined">
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            name="status"
            value={regUser.status}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
            <MenuItem value="disabled">Disabled</MenuItem>
          </Select>
        </FormControl>
        {regUser.id && (
          <TextField
            value={regUser.timeLastMod}
            label="Date last modification"
            variant="outlined"
            disabled
          />
        )}
        {regUser.id && (
          <TextField
            value={regUser.timeCreated}
            label="Date created"
            variant="outlined"
            disabled
          />
        )}
        <Button type="submit" variant="contained" color="primary">
          {regUser.id ? "Modify" : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
