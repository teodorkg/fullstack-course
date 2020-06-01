import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
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
import ChangePasswordPage from "./ChangePasswordPage";

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
  const [user, setUser] = useState({ username: "" });

  const [users, setUsers] = useState([]);

  const [recipes, setRecipes] = useState([]);

  const localUserString = localStorage.getItem("user");

  useEffect(() => {
    if (localUserString) {
      const localUser = JSON.parse(localUserString);
      if (localUser.expiry < Date.now()) return localStorage.removeItem("user");
      fetch("http://localhost:3001/users/" + localUser.user.id, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((result) => {
          setUser({ ...result, token: localUser.user.token });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setUser({ username: "" });
    }
  }, [localUserString]);

  useEffect(() => {
    fetch("http://localhost:3001/users", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setUsers(result.users);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch("http://localhost:3001/recipes", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setRecipes(result.recipes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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
            <UsersPage user={user} users={users} setUsers={setUsers} />
          </Route>

          <Route path="/recipes">
            <RecipesPage
              lastRecipes={recipes
                .slice(Math.max(recipes.length - 10, 0))
                .reverse()
                .flatMap((recipe) => {
                  const creator = users.find(
                    (user) => user.id === recipe.creatorId
                  );
                  return creator ? [{ ...recipe, creator }] : [];
                })}
            />
          </Route>
          <Route path="/recipe/:recipeId">
            <AddRecipePage
              userLogged={user}
              recipes={recipes}
              setRecipes={setRecipes}
            />
          </Route>
          <Route path="/recipe">
            <AddRecipePage
              userLogged={user}
              recipes={recipes}
              setRecipes={setRecipes}
            />
          </Route>
          <Route path="/manage-recipes">
            <ManageRecipesPage recipes={recipes} setRecipes={setRecipes} />
          </Route>
          <Route path="/change-password">
            <ChangePasswordPage user={user} setUser={setUser} />
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
