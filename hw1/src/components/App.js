import React, { useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
//import RecipesPage from "./RecipesPage";
//import ManageRecipePage from "./ManageRecipePage";
import PageNotFound from "./PageNotFound";
import Header from "./Header";

function App() {
  const [user, setUser] = useState({
    //id: "0", // max 24
    username: "", // max 15 word chars (A-Z, a-z, 0-9, _)
    nickname: "",
    password: "", // min 8
    sex: "",
    isAdmin: false,
    avatarSrc: "",
    aboutme: "", // max 512
    status: "", // active, suspended, deactivated
    //timeCreated: "21:40 07.05.2020",
    //timeLastMod: "22:23 07.05.2020",
  });

  const [users, setUsers] = useState([
    {
      id: "0", // max 24
      username: "admin", // max 15 word chars (A-Z, a-z, 0-9, _)
      nickname: "Halata",
      password: "12345678", // min 8
      sex: "female",
      isAdmin: true,
      avatarSrc: "",
      aboutme: "I am 41 and have 1 kid", // max 512
      status: "active", // active, suspended, deactivated
      timeCreated: "21:40 07.05.2020",
      timeLastMod: "22:23 07.05.2020",
    },
  ]);
  const [recipes, setRecipes] = useState([
    {
      id: "0",
      creatorId: "0",
      title: "Meat balls", // max 80
      shortDescription: "Fancy minced meat fried in round shape", // max 256
      minutesNeeded: "20",
      ingredients: ["minced meat", "onion", "sunflower oil", "flour"],
      pictureSrc: "../../imgs/recipes/0.jpg", // required
      description:
        "Mix the minced meat with the cutted onion. Divide the mix into parts of 70-100 grams. Round the chunks into spherical shape and roll them in flour. Put in the frying oil for 50 seconds on each side", // max 2048
      tags: "meat minced_meat meat_balls fry",
      timeCreated: "21:40 07.05.2020",
      timeLastMod: "22:23 07.05.2020",
    },
  ]);

  return (
    <div>
      <Header user={user} setUser={setUser} />
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
