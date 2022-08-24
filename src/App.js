import React from "react";
import './styles/App.css'
import Navbar from "./components/Navbar";
import SubjectList from "./components/SubjectList";
import AllNotes from "./components/AllNotes";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  return (
    <Router>
        <Navbar />
        <Switch>
        <Route exact path="/home">
          <SubjectList/>
            <AllNotes/>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
