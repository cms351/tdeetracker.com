import './App.css';
import Axios from 'axios';
import React from "react";
import {useHistory } from "react-router-dom"; 


const HomePage = () => {

    // changes tab name in browser
    document.title = "Log In - TDEETracker.com"; 

    // allows us to redirect between pages
    let history = useHistory(); 
    
    // username/password variables
    const [logUsername, setLogUsername] = React.useState(""); 
    const [logPassword, setLogPassword] = React.useState(""); 

    // necessary variable to prevent multiple calls to database at once
    var executed = false; 

    // if already logged in, push them to the tracker page
    if (localStorage.getItem("user")) 
    {
        history.push("/trackerPage"); 
    }

    // log in query
    function logIn() {
        
        // implementation that prevents multiple calls to the database at once
        if (!executed) {
            executed = true; 
            // check for obvious issues before querying the database
            if (logUsername.length < 6 || logPassword.length < 6) {
                alert("Incorrect username or password."); 
                // allow another call to the database
                setTimeout(() => { executed = false }, 200); 
                return; 
            }

            if (logUsername === logPassword) {
                alert("Incorrect username or password."); 
                setTimeout(() => { executed = false }, 200); 
                return; 
            }

            Axios.post("http://tdeetracker.com:3001/login", {
                username: logUsername, 
                password: logPassword, 
            }
            ).then((response) => {
                // allow another call to the database
                executed = false; 

                if (response.data.authorization === 0) { // if backend rejects input, deny access
                    alert("Error. Incorrect username or password.");
                    setTimeout(() => { executed = false }, 200); 
                    return; 
                }
                else { // if backend accepts
                    // save username locally
                    // this signals to the other pages that the user is logged in already
                    localStorage.setItem('user', logUsername); 
                    // push the user to the tracker page
                    history.push("/trackerPage"); 
                }
            }).catch((error) => { 
                setTimeout(() => { executed = false }, 2000); 
                console.log(error);
            });
        }
    };

    // opens up the menu
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

    // closes the menu
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

    // submit logIn form if user presses enter
    document.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); 
            document.getElementById("login-button").click(); 
        }
    });


    return (
        <>

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
            <a class="w3-bar-item w3-button w3-hover-black" href="/createAccount">Register New Account</a>
            <a class="w3-bar-item w3-button w3-hover-black" href="/helpPage">Help</a>
            <a class="w3-bar-item w3-button w3-hover-black" href="/contact">Developer Info</a>
            <a class="w3-bar-item w3-button w3-hover-black" href="/reportBug">Report Bug</a>
        </nav>

        {/* overlay effect when opening sidebar on small screens */ }
        <div class="w3-overlay w3-hide-large" onClick={w3_close} title="closing side menu" id="myOverlay"></div>

        {/* Main content - shift to right 250px when the sidebar is visible */ } 

        <div class="w3-main" id="main">

            <div class="w3-row w3-padding-64">
                <div class="w3-container">
                    <h1 class="w3-text-teal">Hello! Welcome to TDEETracker.com.</h1>
                    <p>
                        This website is designed
                        to track your total daily energy expenditure, or TDEE. TDEE is
                        the total number of calories you burn each day.
                    </p>
                    <h3 class="w3-text-teal">How It Works</h3>
                    <p>
                        Simply input your weight and calorie intake each day. After about two weeks, 
                        this website will provide you with a calculation of your TDEE (Total Daily Energy Expenditure).
                        Generally, this is
                        the most accurate method of calculating your TDEE, as your result is based on your 
                        actual weight 
                        gain or loss, not on a general formula. This website does not require payment, 
                        nor an email address - it exists solely to provide a free way to calculate and track your 
                        TDEE as it changes over time. If you need more information on how to use this site, 
                        check out the help section linked on the side for additional resources. 
                    </p>
                    <h3 class="w3-text-teal">Why This Site Exists</h3>
                    <p>
                        Once upon a time, somebody made a spreadsheet that allowed you to calculate your TDEE 
                        just by logging your weight and calorie intake each day.  It was very popular and incredibly 
                        accurate. Unfortunately, 
                        this spreadsheet was taken down by its original creator - it's assumed that it was meant to 
                        be built into an app that never ended up being released. 
                        Since then, myself and others online have kept ahold of copies of that original 
                        spreadsheet for personal use. That's worked fine, but I wanted there to be a more permanent
                        place that you could easily track your TDEE. I hope this site can be that permanent place.
                    </p>
                    <h3 class="w3-text-teal">Log in</h3>
                    <label htmlFor="username">Username: </label>
                    <br/><br/>
                    <input 
                        type="text"
                        value={logUsername}
                        placeholder="Enter a username"
                        onChange={ ( { target }) => setLogUsername(target.value)}
                    />
                    <br/><br/>       
                    <label htmlFor="password">Password: </label>
                    <br/><br/>
                    <input 
                        type="password" 
                        value={logPassword}
                        placeholder="Enter a password"
                        onChange={ ( { target }) => setLogPassword(target.value)}
                        id="passwordInput" 
                    />
                    <button class="w3-button w3-green w3-round w3-tiny" type="submit" id="login-button" onClick={logIn}>Login</button>
                </div>
            </div>
        </div>
        </>
        )
}

export default HomePage; 