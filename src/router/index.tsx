import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditProfile from "../pages/EditProfile";
import Home from "../pages/Home";
import Page from "../pages/Page";
import ViewProfile from "../pages/ViewProfile";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/pages/:id">
          <Page />
        </Route>
        <Route path="/:id">
          <ViewProfile />
        </Route>
        <Route path="/profile">
          <EditProfile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
