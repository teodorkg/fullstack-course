import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import mockData from "./mockData";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
//import RecipesPage from "./RecipesPage";
//import ManageRecipePage from "./ManageRecipePage";
import PageNotFound from "./PageNotFound";
import Header from "./Header";
import UsersPage from "./UsersPage";

function App() {
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
      <Switch>
        <Route exact path="/">
          <HomePage user={user} />
        </Route>
        <Route path="/login">
          <LoginPage setUser={setUser} users={users} />
        </Route>
        <Route path="/register">
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

        {/*<Route path="/courses" component={RecipesPage} />
         <Route path="/course/:slug" component={ManageRecipePage} />
        <Route path="/course" component={ManageRecipePage} /> */}
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
