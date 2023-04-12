import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashbaord, Login } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <Dashbaord />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
