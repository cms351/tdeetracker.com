import React from "react";
import { useState } from "react";
import homePage from "./App.js"; 
import {BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom"; 
import Axios from 'axios';

function ReportBug () {
    const [characterCount, setCharacterCount] = useState(0); 
    const [characterCount2, setCharacterCount2] = useState(0); 
    const [description, setDescription] = useState("");
    const [cause, setCause] = useState("");  


    function submitBug() {
        if (characterCount > 255 || characterCount2 > 255) {
            alert("Error. Please limit text submissions to 255 characters."); 
            return; 
        }
        else if (characterCount < 30 || characterCount2 < 30) {
            alert("Error. Please provide more detail in your report."); 
            return; 
        }
        else {
            document.getElementById("confirmation").innerHTML = "Loading..."; 

            Axios.post("http://localhost:3001/submitBug", {
                description: description,
                cause: cause,
            }
            ).then((response) => {
                document.getElementById("confirmation").innerHTML = "Submission successful"; 
            }).catch((error) => { console.log(error) } ); 
        }
    };

    return <div>

         
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
            <a class="w3-bar-item w3-button w3-hover-black" href="/">Home</a>
            <a class="w3-bar-item w3-button w3-hover-black" href="/helpPage">Help</a>
            <a class="w3-bar-item w3-button w3-hover-black" href="/contact">Developer Info</a>
        </nav>

        {/* overlay effect when opening sidebar on small screens */ }
        <div class="w3-overlay w3-hide-large" onclick="w3_close()" title="closing side menu" id="myOverlay"></div>

        {/* Main content - shift to right 250px when the sidebar is visible */ } 

        <div class="w3-main">

            <div class="w3-row w3-padding-64">
                <div class="w3-container">
                    <h1 class="w3-text-teal">Report Bug</h1>
                    <p>
                        Thanks for reporting the bug you found, it makes my life a lot
                        easier. Below, please include a description (what the bug is)
                        and a cause (what you did to encounter the bug, and how I 
                        can try to replicate it). Each text box only accepts up to 
                        255 character submissions, so please keep that in mind.
                    </p>
                    <h3 class="w3-text-teal">Description: </h3>
                    <h6 class="w3-text-teal">{characterCount}/255</h6>
                    <textarea
                        placeholder = "What is the bug?"
                        onChange={(e) => { 
                            setCharacterCount(e.target.value.length); 
                            setDescription(e.target.value);
                        }}
                    ></textarea>
                    <h3 class="w3-text-teal">Cause: </h3>
                    <h6 class="w3-text-teal">{characterCount2}/255</h6>
                    <textarea
                        placeholder = "How did you trigger the bug?"
                        onChange={(e) => { 
                            setCharacterCount2(e.target.value.length);
                            setCause(e.target.value);
                        }}
                    ></textarea>
                    <br/>
                    <button class="w3-button w3-green w3-round w3-small" type="submit" onClick={submitBug}>Submit</button>
                    <p id="confirmation"></p>
                </div>
            </div>
        </div>
    </div>

}
export default ReportBug; 