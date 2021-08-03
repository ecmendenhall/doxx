import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditPage from "../pages/EditPage";
import EditProfile from "../pages/EditProfile";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Page from "../pages/Page";
import ViewProfile from "../pages/ViewProfile";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/edit/:id">
          <EditPage />
        </Route>
        <Route exact path="/pages/:id">
          <Page />
        </Route>
        <Route exact path="/:id">
          <ViewProfile />
        </Route>
        <Route exact path="/profile">
          <EditProfile />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
