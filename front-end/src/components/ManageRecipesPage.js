import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 1000,
    backgroundColor: theme.palette.background.paper,
    "& .button-recipes": {
      marginLeft: 5,
    },
  },
}));

export default function ManageRecipesPage({ recipes, setRecipes }) {
  const classes = useStyles();
  let history = useHistory();

  function handleDelete(id) {
    setRecipes((recipes) => recipes.filter((recipe) => recipe.id !== id));
  }

  return (
    <List dense className={classes.root}>
      {recipes.map((recipe) => {
        const labelId = recipe.id;
        return (
          <ListItem key={labelId} button>
            <ListItemAvatar>
              <Avatar
                alt={recipe.title + " avatar"}
                src={recipe.pictureSrc}
                variant="rounded"
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={recipe.title} />
            <ListItemSecondaryAction>
              <Button
                className="button-recipes"
                variant="outlined"
                onClick={() => history.push("/recipe/" + recipe.id)}
              >
                Modify
              </Button>
              <Button
                className="button-recipes"
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(recipe.id)}
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
