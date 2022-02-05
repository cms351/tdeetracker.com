import React from "react";
import { useState } from "react";
import Axios from 'axios';

function ReportBug () {

    // retitle tab name in browser
    document.title = "Report Bug - TDEETracker.com"; 

    // necessary variables for SQL Query
    const [characterCount, setCharacterCount] = useState(0); 
    const [characterCount2, setCharacterCount2] = useState(0); 
    const [description, setDescription] = useState("");
    const [cause, setCause] = useState(""); 
    
    // necessary variable to prevent multiple calls to database at once
    var executed = false; 


    // query to submit bug ticket
    function submitBug() {
        // implementation to prevent multiple calls to the database at once
        if (!executed) {
            executed = true; 
            // reject too short or too long responses
            if (characterCount > 255 || characterCount2 > 255) {
                alert("Error. Please limit text submissions to 255 characters."); 
                // allow another call to the database
                setTimeout(() => { executed = false }, 200);  
                return; 
            }
            else if (characterCount < 30 || characterCount2 < 30) {
                alert("Error. Please provide more detail in your report."); 
                setTimeout(() => { executed = false }, 200); 
                return; 
            }
            else { // when ticket is accepted
                // display loading text while querying
                document.getElementById("confirmation").innerHTML = "Loading..."; 

                Axios.post("http://tdeetracker.com:3001/submitBug", {
                    description: description,
                    cause: cause,
                }
                ).then((response) => {
                    document.getElementById("confirmation").innerHTML = "Submission successful"; // confirm submission successful
                    // allow another call to the database
                    setTimeout(() => { executed = false }, 400); 
                }).catch((error) => { 
                    document.getElementById("confirmation").innerHTML = "Error. Please try again later."; // Report error if error
                    console.log(error);
                    setTimeout(() => { executed = false }, 400);
                }); 
            }
        }
    };

    // open menu function
    function w3_open() {
        
        if (
            document.getElementById("mySidebar") &&
            document.getElementById("main")
        ) {
            document.getElementById("main").style.marginLeft = "25%";
            document.getElementById("mySidebar").style.width = "25%"; 
            document.getElementById("mySidebar").style.display = "block"; 
        }
    }

    // close menu function
    function w3_close() {
        if (
            document.getElementById("mySidebar") &&
            document.getElementById("main") &&
            document.getElementById("myOverlay")
        ) {
            document.getElementById("main").style.marginLeft = "0%"; 
            document.getElementById("mySidebar").style.width = "0%"; 
            document.getElementById("mySidebar").style.display = 'none'; 
            document.getElementById("myOverlay").style.display = 'none'; 
        }
    }

    // submit bug ticket if user presses enter
    document.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            // event.preventDefault(); 
            document.getElementById("submit-ticket").click(); 
        }
    });


    return <div>

         
        {/* external stylesheets */ }
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-black.css"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        
        {/*navbar at top */}
        <div className = "w3-top">
            <div className= "w3-bar w3-theme w3-top w2-left-align w3-large">
                <a class="w3-bar-item w3-button w3-right w3-hide-large w3-hover-white w3-large w3-theme-l1" onClick={w3_open}><i class="fa fa-bars"></i></a>
                <a href="/" class="w3-bar-item w3-button w3-theme-l1">TDEETracker.com</a>
            </div>
        </div>

        {/* sidebar */}
        <nav class="w3-sidebar w3-bar-block w3-collapse w3-large w3-theme-l5 w3-animate-left" id="mySidebar">
            <a onClick={w3_close} class="w3-right w3-xlarge w3-padding-large w3-hover-black w3-hide-large" title="Close Menu">
                <i class="fa fa-remove"></i>
            </a>
            <h4 class="w3-bar-item"><b>Menu</b></h4>
            <a class="w3-bar-item w3-button w3-hover-black" href="/">Home</a>
            <a class="w3-bar-item w3-button w3-hover-black" href="/helpPage">Help</a>
            <a class="w3-bar-item w3-button w3-hover-black" href="/contact">Developer Info</a>
        </nav>

        {/* overlay effect when opening sidebar on small screens */ }
        <div class="w3-overlay w3-hide-large" onClick={w3_close} title="closing side menu" id="myOverlay"></div>

        {/* Main content - shift to right 250px when the sidebar is visible */ } 

        <div class="w3-main" id="main">

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
                    <button class="w3-button w3-green w3-round w3-small" type="submit" onClick={submitBug} id="submit-ticket">Submit</button>
                    <p id="confirmation"></p>
                </div>
            </div>
        </div>
    </div>

}
export default ReportBug; 