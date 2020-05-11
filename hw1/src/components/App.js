import React, { useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import mockData from "./common/mockData";
import { makeStyles } from "@material-ui/core/styles";

import LoginPage from "./LoginPage";
import RegisterPage from "./User/RegisterPage";
import HomePage from "./HomePage";
import RecipesPage from "./Recipes/RecipesPage";
import PageNotFound from "./PageNotFound";
import Header from "./common/Header";
import UsersPage from "./Users/UsersPage";
import AddRecipePage from "./Recipe/AddRecipePage";
import ManageRecipesPage from "./ManageRecipesPage";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1%",
    "& > *": {
      margin: "auto",
    },
  },
}));

function App() {
  const classes = useStyles();
  const [user, setUser] = useState({
    username: "",
  });

  const [users, setUsers] = useState(mockData.users);

  const [recipes, setRecipes] = useState(mockData.recipes);

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <div className={classes.root}>
        <Switch>
          <Route exact path="/">
            <HomePage user={user} />
          </Route>
          <Route path="/login">
            <LoginPage setUser={setUser} users={users} />
          </Route>
          <Route path="/user/:id">
            <RegisterPage
              user={user}
              setUser={setUser}
              users={users}
              setUsers={setUsers}
            />
          </Route>
          <Route path="/user">
            <RegisterPage
              user={user}
              setUser={setUser}
              users={users}
              setUsers={setUsers}
            />
          </Route>
          <Route path="/users">
            <UsersPage
              userLoggedId={user.id}
              users={users}
              setUsers={setUsers}
            />
          </Route>

          <Route path="/recipes">
            <RecipesPage
              lastRecipes={recipes
                .slice(Math.max(recipes.length - 10, 0))
                .reverse()
                .map((recipe) => {
                  return {
                    ...recipe,
                    creator: users.find((user) => user.id === recipe.creatorId),
                  };
                })}
            />
          </Route>
          <Route path="/recipe/:id">
            <AddRecipePage recipes={recipes} setRecipes={setRecipes} />
          </Route>
          <Route path="/recipe">
            <AddRecipePage
              userId={user.id || ""}
              recipes={recipes}
              setRecipes={setRecipes}
            />
          </Route>
          <Route path="/manage-recipes">
            <ManageRecipesPage recipes={recipes} setRecipes={setRecipes} />
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
