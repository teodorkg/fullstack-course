import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AddRecipeMainForm from "./AddRecipeMainForm";
import AddRecipeIngredients from "./AddRecipeIngredients";
import Button from "@material-ui/core/Button";
import { recipeConstants } from "../common/magicConstants";

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

export default function AddRecipePage({ userLogged, recipes, setRecipes }) {
  const classes = useStyles();
  let history = useHistory();

  const { recipeId = "" } = useParams();
  const {
    MAX_TITLE_LEN,
    MAX_SHORT_DESCRIP_LEN,
    MAX_DESCRIP_LEN,
    MAX_MINUTES,
    MAX_PICTURE_SRC_LEN,
    MAX_TAGS_LEN,
    MAX_INGREDIENT_LEN,
  } = recipeConstants;

  const [recipeToAdd, setRecipeToAdd] = useState({
    id: "",
    creatorId: "",
    title: "",
    shortDescription: "",
    minutesNeeded: "",
    ingredients: [],
    pictureSrc: "",
    description: "",
    tags: "",
    timeCreated: "",
    timeLastMod: "",
  });

  useEffect(() => {
    if (recipeId || !userLogged) return;
    setRecipeToAdd((recipeToAdd) => {
      return { ...recipeToAdd, creatorId: userLogged.id };
    });
  }, [userLogged, recipeId]);

  useEffect(() => {
    if (!recipeId) return;
    fetch(`http://localhost:3001/recipes/${recipeId}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) throw Error(response);
        return response.json();
      })
      .then((result) => {
        setRecipeToAdd((recipeToAdd) => {
          return {
            ...recipeToAdd,
            ...result,
          };
        });
      })
      .catch((err) => {
        console.log("No such id");
        return false;
      });
  }, [recipeId]);

  const [errors, setErrors] = useState({
    title: false,
    shortDescription: false,
    minutesNeeded: false,
    ingredients: [],
    pictureSrc: false,
    description: false,
    tags: false,
  });

  function isTitleFree() {
    return !recipes.find((recipe) => recipe.title === recipeToAdd.title);
  }

  function isFormValid() {
    const {
      title = "",
      shortDescription = "",
      minutesNeeded = "",
      ingredients = [],
      pictureSrc = "",
      description = "",
      tags = "",
    } = recipeToAdd;
    let hasErrors = false;

    if (title.length > MAX_TITLE_LEN) {
      setErrors((errors) => {
        return { ...errors, title: true };
      });
      hasErrors = true;
    }
    if (shortDescription.length > MAX_SHORT_DESCRIP_LEN) {
      setErrors((errors) => {
        return { ...errors, shortDescription: true };
      });
      hasErrors = true;
    }
    if (pictureSrc === "" || pictureSrc.length > MAX_PICTURE_SRC_LEN) {
      setErrors((errors) => {
        return { ...errors, pictureSrc: true };
      });
      hasErrors = true;
    }
    if (description.length > MAX_DESCRIP_LEN) {
      setErrors((errors) => {
        return { ...errors, description: true };
      });
      hasErrors = true;
    }
    if (tags.length > MAX_TAGS_LEN) {
      setErrors((errors) => {
        return { ...errors, tags: true };
      });
      hasErrors = true;
    }

    const minutes = parseInt(minutesNeeded);
    if (!minutes || minutes < 0 || minutes > MAX_MINUTES) {
      setErrors((errors) => {
        return { ...errors, minutesNeeded: true };
      });
      hasErrors = true;
    }

    for (let i = 0; i < ingredients.length; i += 1) {
      const ingredient = ingredients[i];
      if (
        ingredient.name.length > MAX_INGREDIENT_LEN ||
        ingredient.amount.length > MAX_INGREDIENT_LEN
      ) {
        setErrors((errors) => {
          return {
            ...errors,
            ingredients: [...errors.ingredients, i],
          };
        });
        hasErrors = true;
      }
    }

    return !hasErrors;
  }

  function patchRecipe() {
    fetch(
      `http://localhost:3001/recipes/${recipeToAdd.creatorId}/${recipeId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: userLogged.token,
        },
        body: JSON.stringify(recipeToAdd),
      }
    )
      .then((response) => {
        if (!response.ok) throw Error(response);
        return response.json();
      })
      .then((result) => {
        setRecipeToAdd({ ...recipeToAdd, timeLastMod: result.timeLastMod });
        setRecipes((recipes) =>
          recipes.map((recipe) => {
            return recipe.id === recipeToAdd.id
              ? { ...recipeToAdd, timeLastMod: result.timeLastMod }
              : recipe;
          })
        );
      })
      .catch((err) => {
        setErrors((errors) => {
          return { ...errors, title: true };
        });
      });
  }

  function postRecipe() {
    fetch(`http://localhost:3001/recipes/${userLogged.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userLogged.token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(recipeToAdd),
    })
      .then((response) => {
        if (!response.ok) throw Error(response);
        return response.json();
      })
      .then((result) => {
        setRecipes((recipes) => {
          return [
            ...recipes,
            {
              ...recipeToAdd,
              id: result.id,
              timeCreated: result.timeCreated,
              timeLastMod: result.timeCreated,
            },
          ];
        });
        history.push("/recipes");
      })
      .catch((err) => {
        setErrors((errors) => {
          return { ...errors, title: true };
        });
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrors({
      title: false,
      shortDescription: false,
      minutesNeeded: false,
      ingredients: [],
      pictureSrc: false,
      description: false,
      tags: false,
    });
    if (isFormValid()) {
      if (recipeToAdd.id) {
        patchRecipe();
      } else {
        if (isTitleFree()) {
          postRecipe();
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
