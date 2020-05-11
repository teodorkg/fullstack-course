import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: 450,
    backgroundColor: theme.palette.background.default,
    "& .ingredientsInput": {
      width: 100,
      marginRight: 30,
    },
    "& .ingredientsInput .MuiInputBase-input": {
      padding: 4,
      textAlign: "center",
    },
    "& #addIngredient": {
      display: "flex",
      alignItems: "center",
      marginLeft: 10,
    },
  },
}));

export default function AddRecipeIngredients({
  recipeToAdd,
  setRecipeToAdd,
  errors,
  setErrors,
}) {
  const classes = useStyles();
  const [addIngredient, setAddIngredient] = React.useState("");

  function handleChange({ target }) {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setRecipeToAdd((recipeToAdd) => {
      return {
        ...recipeToAdd,
        ingredients: {
          ...recipeToAdd.ingredients,
          [target.name]: value,
        },
      };
    });
  }

  return (
    <div className={classes.root}>
      <List>
        {Object.keys(recipeToAdd.ingredients).map((ingredient, index) => {
          const labelId = `checkbox-list-label-${ingredient}`;

          return (
            <ListItem key={index} role={undefined} dense button>
              <ListItemText id={labelId} primary={ingredient} />
              <TextField
                name={ingredient}
                value={recipeToAdd.ingredients[ingredient] || ""}
                error={errors.ingredients[ingredient]}
                variant="outlined"
                onChange={handleChange}
                className="ingredientsInput"
              />
              <ListItemSecondaryAction>
                <IconButton
                  title="delete ingredient"
                  color="primary"
                  onClick={(event) => {
                    event.preventDefault();
                    setRecipeToAdd((recipeToAdd) => {
                      let newIngredients = { ...recipeToAdd.ingredients };
                      delete newIngredients[ingredient];
                      return {
                        ...recipeToAdd,
                        ingredients: { ...newIngredients },
                      };
                    });
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <div id="addIngredient">
        <TextField
          placeholder="ingredient"
          name="addIngredient"
          value={addIngredient}
          variant="outlined"
          className="ingredientsInput"
          onChange={({ target }) => setAddIngredient(target.value)}
        />
        <IconButton
          title="add ingredient"
          color="primary"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            if (addIngredient) {
              setRecipeToAdd((recipeToAdd) => {
                return {
                  ...recipeToAdd,
                  ingredients: {
                    ...recipeToAdd.ingredients,
                    [addIngredient]: "",
                  },
                };
              });
              setAddIngredient("");
            }
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
}
