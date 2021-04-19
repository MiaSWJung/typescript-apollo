import React, { Component } from "react";
import CreateLink from "./CreateLink";
import { Switch, Route, Redirect } from "react-router-dom";
import "../styles/App.css";
import Header from "./Header";
import LinkList from "./LinkList";
import Login from "./Login";
import Search from "./Search";

const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-grey">
        <Switch>
          <Route exact path="/" component={LinkList} />
          {/*<Route exact path='/' render={() => <Redirect to="/new/1" />} />*/}
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/new/:page" component={LinkList} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
