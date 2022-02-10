import React from 'react'; 
import Axios from 'axios'; 
import { useHistory } from 'react-router-dom'; 
import "./createAccount.css";





function CreateAccount() {

    // change title of tab in browser
    document.title = "Register - TDEETracker.com";  

    // allow us to redirect the user to other pages
    let history = useHistory();  

    // all the necessary login variables
    const [usernameToRegister, setUsername] = React.useState(""); 
    const [passwordToRegister, setPassword] = React.useState(""); 
    const [confirmPassword, setConfirmPassword] = React.useState(""); 

    // necessary variable to prevent multiple calls to database at once
    var executed = false; 

    // if the users already logged in, push them to tracker page
    if (localStorage.getItem("user")) {
        history.push("/trackerPage"); 
    }


    // function/query to check if username is valid
    function checkValidity() {

        // implementation that prevents multiple calls to the database at once
        if (!executed) {
            executed = true; 
            // check for obvious issues before querying the server
            if (passwordToRegister.length < 6 || usernameToRegister.length < 6 || passwordToRegister.length > 15 || usernameToRegister.length > 15) {
                alert("Error. Both username and password must between 6 and 15 characters in length."); 
                // allow another call to the database
                setTimeout(() => { executed = false }, 200);  
                return; 
            }

            if (passwordToRegister !== confirmPassword) {
                alert("Error. Passwords do not match."); 
                setTimeout(() => { executed = false }, 200);  
                return; 
            }

            if (passwordToRegister === usernameToRegister) {
                alert("Error. Your username and password cannot be the same."); 
                setTimeout(() => { executed = false }, 200); 
                return; 
            }
        
            // query server
            Axios.post("http://tdeetracker.com:3001/checkValidity", {
                username: usernameToRegister, 
            }
            ).then((response) => {
                if (response.data.flag !== 0) { // if it does not return 0 results for that username
                    alert("Error. Username already exists."); // tell user issue
                    setTimeout(() => { executed = false }, 200);  
                    return; 
                }
                else {
                    register(); 
                }
            }).catch((error) => { 
                console.log(error);
                setTimeout(() => { executed = false }, 200);  
            }); 
        }
    }


    // function/query to actually register new user
    function register(req, res) {

        Axios.post("http://tdeetracker.com:3001/register",  {
            username: usernameToRegister,
            password: passwordToRegister,
        }
        ).then((response) => { // if no issues registering the user
            // save username locally, this is how we tell a user is logged in already
            localStorage.setItem('user', usernameToRegister); 
            // push the user to the tracker page
            history.push('/trackerPage'); 
            // allow another call to the database
            executed = false; // not using a timeout for this one because we're pushed to another page
        }).catch((error) => { 
            console.log(error);
            setTimeout(() => { executed = false }, 200);   
        });
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

    // submit registration form if user presses enter
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); 
            if (document.getElementById("register")) {
                document.getElementById("register").click(); 
            } 
        }
    });

    return <div className = "createAccountPage">

        {/* external stylesheets */ }
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-black.css"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        
        {/*navbar at top */}
        <div className = "w3-top">
            <div className= "w3-bar w3-theme w3-top w2-left-align w3-large">
                <a className="w3-bar-item w3-button w3-right w3-hide-large w3-hover-white w3-large w3-theme-l1" onClick={w3_open}><i className="fa fa-bars"></i></a>
                <a href="/" className="w3-bar-item w3-button w3-theme-l1">TDEETracker.com</a>
            </div>
        </div>

        {/* sidebar */}
        <nav className="w3-sidebar w3-bar-block w3-collapse w3-large w3-theme-l5 w3-animate-left" id="mySidebar">
            <a onClick={w3_close} className="w3-right w3-xlarge w3-padding-large w3-hover-black w3-hide-large" title="Close Menu">
                <i className="fa fa-remove"></i>
            </a>
            <h4 className="w3-bar-item"><b>Menu</b></h4>
            <a className="w3-bar-item w3-button w3-hover-black" href="/">Log In</a>
            <a className="w3-bar-item w3-button w3-hover-black" href="/helpPage">Help</a>
            <a className="w3-bar-item w3-button w3-hover-black" href="/contact">Developer Resumé</a>
            <a className="w3-bar-item w3-button w3-hover-black" href="/reportBug">Report Bug</a>
        </nav>

        {/* overlay effect when opening sidebar on small screens */ }
        <div className="w3-overlay w3-hide-large" onClick={w3_close} title="closing side menu" id="myOverlay"></div>

        {/* Main content - shift to right 250px when the sidebar is visible */ } 

        <div className="w3-main" id="main">

            <div className="w3-row w3-padding-64">
                <div className="w3-container">
                    <h1 className="w3-text-teal">Register New Account</h1>
                    <p>
                        Create an account below. We do not require an email, 
                        nor any payment information. We just require a username
                        and password to save your progress to a personalized profile. 
                        Don't worry - your password is encrypted before ever being
                        stored in our database. 
                    </p>
                <label>Username: </label>
                <br/><br/>
                <input 
                    type = "text"
                    placeholder = "Enter a username"
                    onChange={(e) => {
                        setUsername(e.target.value); 
                    }}
                />
                <br/><br/>
                <label> Password: </label>
                <br/><br/>
                <input 
                    type = "password"
                    placeholder = "Enter a password"
                    onChange={(e) => {
                        setPassword(e.target.value); 
                    }}
                />
                <br/><br/>
                <label> Confirm Password: </label>
                <br/><br/>
                <input
                    type = "password"
                    placeholder = "Confirm password"
                    onChange={(e) => {
                        setConfirmPassword(e.target.value); 
                    }}
                />
                <br/><br/>
                <button className="w3-btn w3-green w3-round w3-medium" id="register" onClick = { checkValidity }>Register</button>
                </div>
            </div>
        </div>

    </div>
}
export default CreateAccount; 