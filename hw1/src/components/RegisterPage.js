import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
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
  let { id } = useParams();

  const [regUser, setRegUser] = useState({
    id: "",
    username: "",
    password: "",
    sex: "",
    isAdmin: false,
    nickname: "",
    avatarSrc: "",
    aboutme: "",
    status: "",
  });

  if (id && regUser.id !== id) {
    setRegUser({
      ...regUser,
      ...users.find((user) => user.id === id),
    });
  }
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

  function isUsernameFree() {
    return !users.find((user) => user.username === regUser.username);
  }

  function isFormValid() {
    const {
      username = "",
      password = "",
      sex = "",
      isAdmin = false,
      avatarSrc = "",
      aboutme = "",
      status = "",
    } = regUser;
    let hasErrors = false;

    if (!/^[a-zA-Z0-9_]+$/.test(username) || username.length > 15) {
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
    if (!["male", "female", ""].includes(sex)) {
      setErrors((errors) => {
        return { ...errors, sex: true };
      });
      hasErrors = true;
    }
    if (![true, false].includes(isAdmin)) {
      setErrors((errors) => {
        return { ...errors, isAdmin: true };
      });
      hasErrors = true;
    }
    if (avatarSrc.length > 250) {
      setErrors((errors) => {
        return { ...errors, avatarSrc: true };
      });
      hasErrors = true;
    }
    if (aboutme.length > 512) {
      setErrors((errors) => {
        return { ...errors, aboutme: true };
      });
      hasErrors = true;
    }
    if (!["active", "suspended", "disabled"].includes(status)) {
      setErrors((errors) => {
        return { ...errors, status: true };
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
        if (regUser.id === user.id) {
          setUser({ ...regUser, timeLastMod: nowFormated });
        }
        setRegUser({ ...regUser, timeLastMod: nowFormated });
        setUsers(
          users.map((user) => {
            return user.id === regUser.id
              ? { ...regUser, timeLastMod: nowFormated }
              : user;
          })
        );
      } else {
        if (isUsernameFree()) {
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
        } else {
          setErrors((errors) => {
            return { ...errors, username: true };
          });
        }
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
          value={regUser.username || ""}
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
          value={regUser.password || ""}
          type="password"
          error={errors.password}
          helperText={
            errors.password && "the password doesn't comply with the rules"
          }
          label="Password"
          variant="outlined"
          onChange={handleChange}
          autoComplete="on"
          className="passwordField"
        />
        <FormControl error={errors.isAdmin}>
          <FormControlLabel
            control={
              <Checkbox
                checked={regUser.isAdmin || false}
                onChange={handleChange}
                name="isAdmin"
                color="primary"
              />
            }
            label="Admin"
          />
        </FormControl>
        <TextField
          name="nickname"
          value={regUser.nickname || ""}
          label="Nickname"
          variant="outlined"
          onChange={handleChange}
        />
        <FormControl variant="outlined">
          <InputLabel id="sex">Sex</InputLabel>
          <Select
            labelId="sex"
            name="sex"
            value={regUser.sex || ""}
            onChange={handleChange}
            label="Sex"
            error={errors.sex}
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
          value={regUser.avatarSrc || ""}
          label="Avatar url"
          variant="outlined"
          onChange={handleChange}
          error={errors.avatarSrc}
          helperText={
            errors.avatarSrc && "avatar url must be less then 250 chars"
          }
        />
        <TextField
          name="aboutme"
          value={regUser.aboutme || ""}
          label="About me"
          variant="outlined"
          onChange={handleChange}
          multiline
          rows="4"
          error={errors.aboutme}
          helperText={errors.aboutme && "about me can be up to 512 chars"}
        />
        <FormControl variant="outlined">
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            name="status"
            value={regUser.status || ""}
            onChange={handleChange}
            label="Status"
            error={errors.status}
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
