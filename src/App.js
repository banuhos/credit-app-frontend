import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import UserInformationForm from './components/UserInformationForm';

function App() {
  return (
    <div>
    <nav className="navbar navbar-expand navbar-light " style={{backgroundColor: "#e3f2fd"}}>
      <div className="navbar-nav">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
                Kredi Hesapla           
           </Link>
          </li>
     </div>
     </nav>

     <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={UserInformationForm} />
          </Switch>
        </div>

     </div>
  );
}

export default App;
