import React,{useState}from "react";
import './styles/App.css'
import Navbar from "./components/Navbar";
import SubjectList from "./components/SubjectList";
import AllNotes from "./components/AllNotes";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NotesTake from "./components/NotesTake";
function App() {
const [subject,setSubject]=useState(localStorage?.getItem('subject'))
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/home">
          <SubjectList setSubject={setSubject}/>
          <AllNotes />
        </Route>
        <Route exact path="/math">
          <NotesTake Subject={subject}/>
        </Route>
        <Route exact path="/science">
          <NotesTake Subject={subject}/>
        </Route>
        <Route exact path="/english">
          <NotesTake Subject={subject}/>
        </Route>
        <Route exact path="/history">
          <NotesTake Subject={subject}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
