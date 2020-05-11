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
import { userConstants } from "../common/magicConstants";

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
  let { id = "" } = useParams();

  const {
    MAX_USERNAME_LEN,
    MIN_PASSWORD_LEN,
    MAX_ABOUTME_LEN,
    MAX_AVATAR_SRC_LEN,
  } = userConstants;

  const [userToReg, setUserToReg] = useState({
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

  if (userToReg.id !== id) {
    setUserToReg(
      id
        ? {
            ...userToReg,
            ...users.find((user) => user.id === id),
          }
        : {
            id: "",
            username: "",
            password: "",
            sex: "",
            isAdmin: false,
            nickname: "",
            avatarSrc: "",
            aboutme: "",
            status: "",
          }
    );
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
    return (1 + parseInt(maxIndex)).toString();
  }

  function isUsernameFree() {
    return !users.find((user) => user.username === userToReg.username);
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
    } = userToReg;
    let hasErrors = false;

    if (
      !/^[a-zA-Z0-9_]+$/.test(username) ||
      username.length > MAX_USERNAME_LEN
    ) {
      setErrors((errors) => {
        return { ...errors, username: true };
      });
      hasErrors = true;
    }
    if (password.length < MIN_PASSWORD_LEN) {
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
    if (avatarSrc.length > MAX_AVATAR_SRC_LEN) {
      setErrors((errors) => {
        return { ...errors, avatarSrc: true };
      });
      hasErrors = true;
    }
    if (aboutme.length > MAX_ABOUTME_LEN) {
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
      if (userToReg.id) {
        if (userToReg.id === user.id) {
          setUser({ ...userToReg, timeLastMod: nowFormated });
        }
        setUserToReg({ ...userToReg, timeLastMod: nowFormated });
        setUsers(
          users.map((user) => {
            return user.id === userToReg.id
              ? { ...userToReg, timeLastMod: nowFormated }
              : user;
          })
        );
      } else {
        if (isUsernameFree()) {
          setUsers((users) => {
            return [
              ...users,
              {
                ...userToReg,
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
    setUserToReg((userToReg) => {
      return {
        ...userToReg,
        [target.name]: value,
      };
    });
  }

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        {userToReg.id && (
          <TextField
            name="id"
            value={userToReg.id}
            label="ID"
            variant="outlined"
            disabled
          />
        )}
        <TextField
          name="username"
          value={userToReg.username || ""}
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
          value={userToReg.password || ""}
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
                checked={userToReg.isAdmin || false}
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
          value={userToReg.nickname || ""}
          label="Nickname"
          variant="outlined"
          onChange={handleChange}
        />
        <FormControl variant="outlined">
          <InputLabel id="sex">Sex</InputLabel>
          <Select
            labelId="sex"
            name="sex"
            value={userToReg.sex || ""}
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
          value={userToReg.avatarSrc || ""}
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
          value={userToReg.aboutme || ""}
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
            value={userToReg.status || ""}
            onChange={handleChange}
            label="Status"
            error={errors.status}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
            <MenuItem value="disabled">Disabled</MenuItem>
          </Select>
        </FormControl>
        {userToReg.id && (
          <TextField
            value={userToReg.timeLastMod}
            label="Date last modification"
            variant="outlined"
            disabled
          />
        )}
        {userToReg.id && (
          <TextField
            value={userToReg.timeCreated}
            label="Date created"
            variant="outlined"
            disabled
          />
        )}
        <Button type="submit" variant="contained" color="primary">
          {userToReg.id ? "Modify" : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
