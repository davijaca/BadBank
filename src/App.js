import React, { useState, useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './Functions/home';
import CreateAccount from './Functions/createaccount';
import Login from './Functions/login';
import Deposit from './Functions/deposit';
import Withdraw from './Functions/withdraw';
import AllData from './Functions/alldata';
import NavBar from './Functions/navbar';
import { UserContext } from './Functions/context';
//const { UserContext } = require('./Functions/context');

function App() {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
      async function getData() {
          const response = await fetch('./users.json', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
          const json     = await response.json();
          setData(json);
          setLoaded(true);
      }
      getData();
  },[])

  return (
    <HashRouter>
    {loaded &&
      <UserContext.Provider value={data.users}>
        <NavBar/>
          <Routes className="container" style={{padding: "20px"}}>
            <Route path="/" exact element={<Home/>} />
            <Route path="/createAccount/" element={<CreateAccount/>} />
            <Route path="/login/" element={<Login/>} />
            <Route path="/deposit/" element={<Deposit/>} />
            <Route path="/withdraw/" element={<Withdraw/>} />
            <Route path="/allData/" element={<AllData/>} />
          </Routes>
        </UserContext.Provider>
    }
    </HashRouter>
  );
}

export default App;
