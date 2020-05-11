import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AddRecipeMainForm from "./AddRecipeMainForm";
import AddRecipeIngredients from "./AddRecipeIngredients";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",

    margin: "2%",
    marginTop: "5%",

    "& > form": {
      marginRight: "1%",
      display: "flex",
      flexWrap: "wrap",
    },
    "& > form > div": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    "& > form > div > *": {
      margin: theme.spacing(1),
    },

    "& .main-form .MuiInputBase-input": {
      width: 400,
    },

    "& [type=submit]": {
      alignSelf: "center",
    },
  },
}));

export default function AddRecipePage({ userId, recipes, setRecipes }) {
  const classes = useStyles();
  let { id } = useParams();
  let history = useHistory();

  const [recipeToAdd, setRecipeToAdd] = useState({
    id: "",
    creatorId: "",
    title: "",
    shortDescription: "",
    minutesNeeded: "",
    ingredients: {},
    pictureSrc: "",
    description: "",
    tags: "",
    timeCreated: "",
    timeLastMod: "",
  });

  if (id && recipeToAdd.id !== id) {
    setRecipeToAdd({
      ...recipeToAdd,
      ...recipes.find((recipe) => recipe.id === id),
    });
  }

  const [errors, setErrors] = useState({
    title: false,
    shortDescription: false,
    minutesNeeded: false,
    ingredients: {},
    pictureSrc: false,
    description: false,
    tags: false,
  });

  function findNextIndex() {
    const maxIndex = recipes
      .map((recipe) => recipe.id)
      .reduce((prevId, nextId) => (prevId < nextId ? nextId : prevId));
    return 1 + parseInt(maxIndex);
  }

  function isTitleFree() {
    return !recipes.find((recipe) => recipe.title === recipeToAdd.title);
  }

  function isFormValid() {
    const {
      title = "",
      shortDescription = "",
      minutesNeeded = "",
      ingredients = {},
      pictureSrc = "",
      description = "",
      tags = "",
    } = recipeToAdd;
    let hasErrors = false;

    if (title.length > 80) {
      setErrors((errors) => {
        return { ...errors, title: true };
      });
      hasErrors = true;
    }
    if (shortDescription.length > 256) {
      setErrors((errors) => {
        return { ...errors, shortDescription: true };
      });
      hasErrors = true;
    }
    if (pictureSrc === "" || pictureSrc.length > 250) {
      setErrors((errors) => {
        return { ...errors, pictureSrc: true };
      });
      hasErrors = true;
    }
    if (description.length > 2048) {
      setErrors((errors) => {
        return { ...errors, description: true };
      });
      hasErrors = true;
    }
    if (tags.length > 200) {
      setErrors((errors) => {
        return { ...errors, tags: true };
      });
      hasErrors = true;
    }

    const minutes = parseInt(minutesNeeded);
    if (!minutes || minutes < 0 || minutes > 600) {
      setErrors((errors) => {
        return { ...errors, minutesNeeded: true };
      });
      hasErrors = true;
    }

    for (const ingredient in ingredients) {
      if (ingredient.length > 30 || ingredients[ingredient].length > 10) {
        setErrors((errors) => {
          return {
            ...errors,
            ingredients: { ...errors.ingredients, [ingredient]: true },
          };
        });
        hasErrors = true;
      }
    }

    return !hasErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrors({
      title: false,
      shortDescription: false,
      minutesNeeded: false,
      ingredients: false,
      pictureSrc: false,
      description: false,
      tags: false,
    });
    if (isFormValid()) {
      const now = new Date();
      const nowFormated = now.toLocaleString();
      if (recipeToAdd.id) {
        setRecipeToAdd({ ...recipeToAdd, timeLastMod: nowFormated });
        setRecipes((recipes) =>
          recipes.map((recipe) => {
            return recipe.id === recipeToAdd.id
              ? { ...recipeToAdd, timeLastMod: nowFormated }
              : recipe;
          })
        );
      } else {
        if (isTitleFree()) {
          setRecipes((recipes) => {
            return [
              ...recipes,
              {
                ...recipeToAdd,
                id: findNextIndex(),
                creatorId: userId,
                timeCreated: nowFormated,
                timeLastMod: nowFormated,
              },
            ];
          });
          history.push("/recipes");
        } else {
          setErrors((errors) => {
            return { ...errors, title: true };
          });
        }
      }
    }
  }

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <div className="main-form">
          <AddRecipeMainForm
            recipeToAdd={recipeToAdd}
            setRecipeToAdd={setRecipeToAdd}
            handleSubmit={handleSubmit}
            errors={errors}
          />
        </div>
        <div>
          <AddRecipeIngredients
            recipeToAdd={recipeToAdd}
            setRecipeToAdd={setRecipeToAdd}
            errors={errors}
            setErrors={setErrors}
          />
          <Button type="submit" variant="contained" color="primary">
            {recipeToAdd.id ? "Modify" : "Add"}
          </Button>
        </div>
      </form>
    </div>
  );
}
