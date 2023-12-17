import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login, {isLoggedIn} from "./Login/login";
import Header from "./Header/header";
import Home from "./Home/home";
import AddQueue from "./AddQueue/AddQueue";
import AddGroup from "./AddGroup/AddGroup";
import AddStudent from "./AddStudent/AddStudent"
import Queue from "./Queue/queue";
import {useEffect, useState} from "react";
import Group from "./Group/group";



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
        <Route path="/" element= {loggedIn ? <Home /> : <Login />}/>
        <Route path="/login" element = {<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path= "/queue/:queueId" element= {<Queue/>}/>
        <Route path="/add-queue" element={<AddQueue/>}/>
        <Route path="/add-group" element={<AddGroup/>}/>
        <Route path="/add-student" element={<AddStudent/>}/>
        <Route path= "/groups" element= {<Group/>}/>
      {/*<AddQueue></AddQueue>*/}
     </Routes>
    </div>
   </Router>
  );
}

export default App;
