import React from "react";
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

export default function UsersPage({ userLoggedId, users, setUsers }) {
  const classes = useStyles();
  let history = useHistory();

  function handleModify(userId) {
    history.push("/user/" + userId);
  }

  function handleDelete(id) {
    setUsers(users.filter((user) => user.id !== id));
  }

  return (
    <List dense className={classes.root}>
      {users.map((user) => {
        const labelId = user.id;
        return userLoggedId === user.id ? (
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
