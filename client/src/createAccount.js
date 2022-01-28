import React from 'react'; 
import { useState } from 'react'; 
import {Link} from 'react-router-dom'; 
import Axios from 'axios'; 
import trackerPage from "./trackerPage"; 
import {Route} from 'react-router-dom'; 
import { useHistory } from 'react-router-dom'; 
import "./createAccount.css"; 



function CreateAccount() {

    let history = useHistory();  

    const [usernameToRegister, setUsername] = React.useState(""); 
    const [passwordToRegister, setPassword] = React.useState(""); 

    if (localStorage.getItem("user")) {
        history.push("/trackerPage"); 
    }

    // this seems to work correctly after testing
    // calls register function if username is unique, sends an error if it is not unique
    function checkValidity() {

        if (passwordToRegister.length < 6 || usernameToRegister.length < 6 || passwordToRegister.length > 15 || usernameToRegister.length > 15) {
            alert("Error. Both username and password must between 6 and 15 characters in length."); 
            return; 
        }

        Axios.post("http://localhost:3001/checkValidity", {
            username: usernameToRegister, 
            password: passwordToRegister, 
        }
        ).then((response) => {
            console.log(response.data.flag); 
            if (response.data.flag != 0) {
                alert("Error. Username already exists.");
            }
            else {
                register(); 
            }
        }).catch((error) => { console.log(error) } ); 
    }

    // updates SQL server correctly but does not save the username to local storage correctly
    // log in seems to do so perfectly fine
    // validation seems to work
    function register() {
        console.log("made it to register"); 
        Axios.post("http://localhost:3001/register", {
            username: usernameToRegister, 
            password: passwordToRegister, 
        }
        ).then((response) => {
            console.log("made it to register response"); 
            console.log(response); 
            localStorage.setItem('user', usernameToRegister); 
            console.log(localStorage.getItem('user'));
            history.push('/trackerPage'); 
        }).catch((error) => { console.log(error) } );
    }; 

    return <div className = "createAccountPage">

        {/* external stylesheets */ }
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-black.css"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        
        {/*navbar at top */}
        <div className = "w3-top">
            <div className= "w3-bar w3-theme w3-top w2-left-align w3-large">
                <a class="w3-bar-item w3-button w3-right w3-hide-large w3-hover-white w3-large w3-theme-l1" href="javascript:void(0)" onclick="w3_open()"><i class="fa fa-bars"></i></a>
                <a href="/" class="w3-bar-item w3-button w3-theme-l1">TDEETracker.com</a>
            </div>
        </div>

        {/* sidebar */}
        <nav class="w3-sidebar w3-bar-block w3-collapse w3-large w3-theme-l5 w3-animate-left" id="mySidebar">
            <a href="javascript:void(0)" onclick="w3_close()" class="w3-right w3-xlarge w3-padding-large w3-hover-black w3-hide-large" title="Close Menu">
                <i class="fa fa-remove"></i>
            </a>
            <h4 class="w3-bar-item"><b>Menu</b></h4>
            <a class="w3-bar-item w3-button w3-hover-black" href="/">Log In</a>
            <a class="w3-bar-item w3-button w3-hover-black" href="/helpPage">Help</a>
            <a class="w3-bar-item w3-button w3-hover-black" href="/contact">Developer Info</a>
            <a class="w3-bar-item w3-button w3-hover-black" href="/reportBug">Report Bug</a>
        </nav>

        {/* overlay effect when opening sidebar on small screens */ }
        <div class="w3-overlay w3-hide-large" onclick="w3_close()" title="closing side menu" id="myOverlay"></div>

        {/* Main content - shift to right 250px when the sidebar is visible */ } 

        <div class="w3-main">

            <div class="w3-row w3-padding-64">
                <div class="w3-container">
                    <h1 class="w3-text-teal">Register New Account</h1>
                    <p>
                        Create an account below. We do not require an email, 
                        nor any payment information - just a username
                        and password to save your progress to a personalized profile. 
                    </p>
                <label>Username: </label>
                <input 
                    type = "text"
                    placeholder = "Enter a username"
                    onChange={(e) => {
                        setUsername(e.target.value); 
                    }}
                />
                <label> Password: </label>
                <input 
                    type = "password"
                    placeholder = "Enter a password"
                    onChange={(e) => {
                        setPassword(e.target.value); 
                    }}
                />
                <button class="w3-btn w3-green w3-round w3-tiny" id="register" onClick = { checkValidity }>Register</button>
                </div>
            </div>
        </div>

    </div>
}
export default CreateAccount; 