import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RecipesCards from "./RecipesCards";
import RecipesSearchBar from "./RecipesSearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .recipes-cards": {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexWrap: "wrap",
      maxWidth: "70%",
      margin: "auto",
    },
    "& .recipes-cards > *": {
      width: 500,
      margin: "1%",
    },

    "& .recipes-search > *": {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      margin: "auto",
      width: "60%",
    },
  },
}));

export default function RecipesPage({ lastRecipes }) {
  const classes = useStyles();

  const [recipesToShow, setRecipesToShow] = React.useState([...lastRecipes]);

  return (
    <div className={classes.root}>
      <div className="recipes-search">
        <RecipesSearchBar
          setRecipes={setRecipesToShow}
          lastRecipes={lastRecipes}
        />
      </div>
      <div className="recipes-cards">
        <RecipesCards recipes={recipesToShow} />
      </div>
    </div>
  );
}
