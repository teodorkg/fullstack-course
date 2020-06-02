import React from "react";
import { Redirect } from "react-router-dom";

const HomePage = ({ user }) => {
  return (
    <>
      {(user && user.username) || localStorage.getItem("user") ? (
        <Redirect to="/recipes" />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default HomePage;
