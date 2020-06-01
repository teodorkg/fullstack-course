import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";

import UserAvatar from "../common/UserAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 1000,
    backgroundColor: theme.palette.background.paper,
    "& .button-users": {
      marginLeft: 5,
    },
  },
}));

export default function UsersPage({ user, users, setUsers }) {
  const classes = useStyles();
  let history = useHistory();
  const [userLogged, setUserLogged] = useState({});
  useEffect(() => setUserLogged({ ...user }), [user]);

  function handleModify(userId) {
    history.push("/user/" + userId);
  }

  function handleDelete(id) {
    fetch("http://localhost:3001/users/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: userLogged.token,
      },
    })
      .then((response) => {
        if (!response.ok) throw Error(response);
        return response.json();
      })
      .then((result) => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <List dense className={classes.root}>
      {users.map((user) => {
        const labelId = user.id;
        return !userLogged || userLogged.id === user.id ? (
          ""
        ) : (
          <ListItem key={labelId} button>
            <ListItemAvatar>
              <UserAvatar
                nickname={user.nickname || user.username}
                avatarSrc={user.avatarSrc}
                sex={user.sex}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={user.username} />
            <ListItemSecondaryAction>
              <Button
                className="button-users"
                variant="outlined"
                onClick={() => handleModify(user.id)}
              >
                Modify
              </Button>
              <Button
                className="button-users"
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
