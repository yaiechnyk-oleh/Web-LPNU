import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login, {isLoggedIn} from "./Login/login";
import Header from "./Header/header";
import Home from "./Home/home";
import AddQueue from "./AddQueue/AddQueue";
import Queue from "./Queue/queue";
import {useEffect, useState} from "react";
import Group from "./Group/group";
import Groups from "./Groups/groups";


function App() {

    const [loggedIn, setLoggedIn] = useState(isLoggedIn());

    useEffect(() => {
        setLoggedIn(isLoggedIn());
    }, [])




  return (
   <Router>
    <div className = {"globalWrapper"}>
        <Header isLoggedIn = {loggedIn}/>
      <Routes>
        <Route path="/login" element = {<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path= "/queue" element= {<Queue/>}/>
        <Route path= "/group" element= {<Group/>}/>
        <Route path= "/groups" element= {<Groups/>}/>
      {/*<AddQueue></AddQueue>*/}
     </Routes>
    </div>
   </Router>
  );
}

export default App;
