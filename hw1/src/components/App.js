import React, { useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import mockData from "./mockData";
import { makeStyles } from "@material-ui/core/styles";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import RecipesPage from "./RecipesPage";
//import AddRecipePage from "./AddRecipePage"
//import ManageRecipessPage from "./ManageRecipesPage";
import PageNotFound from "./PageNotFound";
import Header from "./Header";
import UsersPage from "./UsersPage";
import AddRecipePage from "./AddRecipePage";

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
  const [regUser, setRegUser] = useState({
    username: "",
    password: "",
    sex: "",
    isAdmin: false,
    nickname: "",
    avatarSrc: "",
    aboutme: "",
    status: "",
    ...user,
  });
  const [recipes, setRecipes] = useState(mockData.recipes);

  return (
    <div>
      <Header user={user} setUser={setUser} setRegUser={setRegUser} />
      <div className={classes.root}>
        <Switch>
          <Route exact path="/">
            <HomePage user={user} />
          </Route>
          <Route path="/login">
            <LoginPage setUser={setUser} users={users} />
          </Route>
          <Route path="/user">
            <RegisterPage
              user={user}
              setUser={setUser}
              users={users}
              setUsers={setUsers}
              regUser={regUser}
              setRegUser={setRegUser}
            />
          </Route>
          <Route path="/users">
            <UsersPage
              userLoggedId={user.id}
              users={users}
              setUsers={setUsers}
              setRegUser={setRegUser}
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
            <AddRecipePage recipes={recipes} setRecipes={setRecipes} />
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
