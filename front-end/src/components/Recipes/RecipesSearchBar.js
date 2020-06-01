import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      flexGrow: "1",
    },
  },
}));

export default function RecipeSearchBar({ setRecipes, lastRecipes }) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === "") {
      setRecipes([...lastRecipes]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchTokens = value.toLowerCase().split(" ");
    setRecipes(
      lastRecipes.filter((recipe) =>
        searchTokens.some(
          (token) =>
            recipe.title.toLowerCase().includes(token) ||
            recipe.tags.toLowerCase().includes(token) ||
            recipe.creator.nickname.toLowerCase().includes(token) ||
            recipe.creator.username.toLowerCase().includes(token)
        )
      )
    );
  };

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Search"
        value={value}
        onChange={handleChange}
        variant="filled"
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </form>
  );
}
