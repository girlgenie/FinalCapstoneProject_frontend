import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFound";
import { AboutPage } from "./pages/About";

export const Routes = () => {
  return (
    <Router>
      <Route path="./pages/About">
        <AboutPage />
      </Route>
    </Router>
  );
};
