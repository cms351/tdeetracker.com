import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'; 
import {Router, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './App'; 
import createAccount from "./createAccount";
import contact from "./contact";
import trackerPage from "./trackerPage"; 
import helpPage from "./helpPage"; 
import reportBug from "./reportBug"; 

ReactDOM.render(
  <BrowserRouter>
    <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/createAccount" component={createAccount}/>
        <Route exact path="/contact" component={contact}/>
        <Route exact path="/trackerPage" component={trackerPage}/>
        <Route exact path="/helpPage" component={helpPage}/>
        <Route exact path="/reportBug" component={reportBug}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
