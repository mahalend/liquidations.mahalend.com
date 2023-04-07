import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import Home from "./home";

const Navigation = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    </>

  );
}

export default Navigation;
