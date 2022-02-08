import './trackerPage.css'; 
import React, { useEffect } from 'react'; 
import { useHistory } from 'react-router-dom';
import { useState } from 'react'; 
import Axios from 'axios';

function TrackerPage() {

    // change title of tab in browser
    document.title = "My Tracker - TDEETracker.com";

    // allows us to redirect user to other pages
    let history = useHistory(); 

    // check user is logged in
    useEffect(() => {
        if (!localStorage.getItem("user")) {
            history.push("/"); 
        }
        else {
            // display welcome message
            document.getElementById("welcome").innerHTML = "Welcome back " + username + "!";  
        }
    });

    // log out function
    function logOut () {
        localStorage.clear(); 
        history.push("/"); 
    }

    // set up dates for page
    let newDate = new Date();
    let yyyy = String(newDate.getFullYear()); 
    let mm = String(newDate.getMonth() + 1).padStart(2, '0'); 
    let dd = String(newDate.getDate()).padStart(2, '0');  
    let todaysDate = yyyy + "-" + mm + "-" + dd;
    let startDate = dateMath(todaysDate, -28); 

    // necessary variables for input
    const username = localStorage.getItem('user'); 
    const [inputCalories, setCalories] = useState(""); 
    const [inputWeight, setWeight] = useState(""); 
    const [inputDate, setDate] = useState(""); 
    const [deleteDate, setDeleteDate] = useState(""); 

    // necessary variable to prevent multiple calls to database at once
    var executed = false; 

    // verify input before calling backend
    function verifyInput() {
        if (!executed) {
            executed = true; 
            if (inputWeight < 0 || inputCalories < 0 || inputDate === "" || inputWeight === "" || inputCalories === "" ) {
                alert("Invalid input"); 
                // allow another call to the database
                setTimeout(() => { executed = false }, 200);
                return; 
            }
            else {
                inputEntry(); 
            }
        }
        
    }

    // function/query to input weight/calorie entry
    function inputEntry() {
        Axios.post("http://tdeetracker.com:3001/create", {
            username: username, 
            weight: inputWeight, 
            calories: inputCalories, 
            date: inputDate, 
        }).then((response) => {
            // allow another call to the database
            setTimeout(() => { executed = false }, 200);
            return;  
        }).catch((error) => { 
            console.log(error); 
            setTimeout(() => { executed = false }, 200);
            return; 
        }); 
    }

    // function/query to delete weight/calorie entry
    function deleteEntry() {
        if (!executed) {
            executed = true; 
            if (deleteDate === "") {
                alert("Invalid input"); 
                // allow another call to the database
                setTimeout(() => { executed = false }, 200);
                return; 
            }
            else {
                const confirmBox = window.confirm("You are about to delete this data entry. Click OK to confirm.");
                if (confirmBox === false) {
                    setTimeout(() => { executed = false }, 200);
                    return; 
                }
                Axios.post("http://tdeetracker.com:3001/deleteEntry", {
                    username: username,
                    deleteDate: deleteDate,
                }).then((response) => {
                    setTimeout(() => { executed = false }, 200); 
                }).catch((error) => { 
                    console.log(error);
                    setTimeout(() => { executed = false }, 200);
                }); 
        } 
        }
        
    }

    // function/query to delete ALL weight/calorie entries
    function deleteAll() {
        if (!executed) {
            executed = true; 
            const confirmBox = window.confirm("WARNING: You are about to delete all data entries. Click OK to confirm.");
            if (confirmBox === true) {
                const confirmBox2 = window.confirm("This cannot be undone. Are you sure?");
                if (confirmBox2 === true) {
                    Axios.post("http://tdeetracker.com:3001/deleteAll", {
                        username: username,
                    }).then((response) => {
                        // allow another call to the database
                        setTimeout(() => { executed = false }, 200); 
                    }).catch((error) => {
                        console.log(error); 
                        setTimeout(() => { executed = false }, 200); 
                    }); 
                }
                else {
                    setTimeout(() => { executed = false }, 200); 
                    return; 
                }
            }
            else {
                setTimeout(() => { executed = false }, 200);
                return; 
            }
        }
        
    }

    // function/query to display weight/calorie entries over that past four weeks
    function displayEntry() {
        if (!executed) {
            executed = true; 
            Axios.post("http://tdeetracker.com:3001/displayEntry", {
                username: username, 
                todaysDate: todaysDate,
                startDate: startDate,
            }).then((response) => {
                // clear previously printed results, in case the display data button is hit twice
                document.getElementById("results").innerHTML = ""; 
                // get html string started
                let htmlToAdd = ""; 

                // if we receive an error from the database, print alert to user. 
                if ( response.data.Error ) {
                    alert(response.data.Error); 
                    // allow another call to the database
                    setTimeout(() => { executed = false }, 200);
                    return; 
                }

                // all the variables to figure out average weights, calories, and display past entries
                let thisWeekWeight = 0; 
                let thisWeekCalories = 0;
                let lastWeekWeight = 0; 
                let lastWeekCalories = 0; 
                let thisWeekCount = 0; 
                let lastWeekCount = 0; 
                let j = 0; 
                
                // display past entries, do the first half of finding averages
                let iDate = startDate; 
                for (let i = 0; i < 32; i++) {
                    
                    // when printing 1st box in the row - the start of a new week
                    // get row divs set up 
                    if (i === 0 || i === 8 | i === 16 | i === 24) {
                        // reset calorie/weight averages
                        lastWeekWeight = thisWeekWeight; 
                        lastWeekCalories = thisWeekCalories; 
                        lastWeekCount = thisWeekCount; 
                        thisWeekWeight = 0; 
                        thisWeekCalories = 0; 
                        thisWeekCount = 0; 
                    
                        // start a new row
                        htmlToAdd += "<div class=\"row\">"; 
                    }

                    // when printing 8th box in the row - the week in review box
                    // display TDEE, average calories and weight for week
                    if (i === 7 || i === 15 || i === 23 || i === 31) {
                        // find this week's averages 
                        thisWeekWeight = thisWeekWeight / thisWeekCount; 
                        thisWeekCalories = thisWeekCalories / thisWeekCount; 

                        // if not enough data points don't calculate
                        if (thisWeekCount < 3 || lastWeekCount < 3) { 
                            htmlToAdd += "<div class=\"weekAverage\">"; 
                            htmlToAdd += "<h5><b>TDEE:</b> Not enough data</h5>"; 
                            htmlToAdd += "<p>" + thisWeekCalories + " kcal. average</p>"; 
                            htmlToAdd += "<p>" + thisWeekWeight.toFixed(2) + " lbs. average</p>";
                            htmlToAdd += "</div>"; 
                        }
                        // calculate and display TDEE for the week
                        else { 
                            // calculate approximate calories burned per day
                            let weightDifference = lastWeekWeight - thisWeekWeight; 
                            let calorieDeficit = weightDifference * 500; 
                            let TDEE = lastWeekCalories + calorieDeficit;
                            // add html
                            htmlToAdd += "<div class=\"weekAverage\">"; 
                            htmlToAdd += "<h5><b>TDEE:</b> " + TDEE.toFixed(0) + "</h5>";  
                            htmlToAdd += "<p>" + thisWeekCalories + " kcal. average</p>"; 
                            htmlToAdd += "<p>" + thisWeekWeight.toFixed(2) + " lbs. average</p>";
                            htmlToAdd += "</div>"; 
                        }
                    }
                    // if iteration date doesn't match result date OR all result dates have already been printed
                    else if (j >= response.data.result.length || iDate !== response.data.result[j]['date'].replace("T00:00:00.000Z", "")) {
                        htmlToAdd += "<div class=\"emptyDataPoint\">";
                        htmlToAdd += "<h5>" + iDate + ": </h5>"; 
                        htmlToAdd += "<p>N/A</p>"; 
                        htmlToAdd += "<p>N/A</p>"; 
                        htmlToAdd += "</div>"; 

                        // increment date
                        iDate = dateMath(iDate, 1); 
                    }
                    else {
                        // add html block 
                        htmlToAdd += "<div class=\"dataPoint\">"; 
                        htmlToAdd += "<h5>" + iDate + ": </h5>"; 
                        htmlToAdd += "<p>" + response.data.result[j].calories + " kcal</p>"; 
                        htmlToAdd += "<p>" + response.data.result[j].weight + " lbs</p>";
                        htmlToAdd += "</div>"; 

                        // accumulate weight and calorie totals to appropriate weeks 
                        thisWeekWeight += response.data.result[j].weight; 
                        thisWeekCalories += response.data.result[j].calories; 
                        thisWeekCount++; 

                        // move to next data point
                        j++; 
                        // incremement date 
                        iDate = dateMath(iDate, 1); 
                    }

                    // if 8th box in the row - the week in review box
                    // close up row div, start a new row for the next week
                    if (i === 7 || i === 15 || i === 23 || i === 31) {
                        htmlToAdd += "</div>"; 
                    }
                }

                // add TDEE info html block
                if (thisWeekCount < 3 || lastWeekCount < 3) {
                    htmlToAdd += "<div class=\"endPoint\">"; 
                    htmlToAdd += "<h3>Not enough data.</h3>"; 
                    htmlToAdd += "<h4>To provide an accurate calculation, please provide at least 3 data entries for each of the last two weeks.</h4>";
                    htmlToAdd += "<p>Remember, the more data points you provide, the more accurate your calculations will be.</p>"; 
                }
                else {
                    let weightDifference = lastWeekWeight - thisWeekWeight; 
                    let calorieDeficit = weightDifference * 3500 / 7; 
                    let TDEE = lastWeekCalories + calorieDeficit; 
                    htmlToAdd += "<div class=\"endPoint\">"; 
                    htmlToAdd += "<h3>You burn " + TDEE.toFixed(0) + " calories per day.</h3>"; 
                    htmlToAdd += "<h4>Average calories last week: " + lastWeekCalories + ".</h4>"; 
                    htmlToAdd += "<h4>Average weight last week: " + lastWeekWeight.toFixed(2) + ".</h4>"; 
                    htmlToAdd += "<h4>Average calories this week: " + thisWeekCalories + ".</h4>"; 
                    htmlToAdd += "<h4>Average weight this week: " + thisWeekWeight.toFixed(2) + ".</h4>"; 
                    htmlToAdd += "<p>Remember, the more data points you provide, the more accurate your calculations will be.</p>";  
                }
                htmlToAdd += "</div>";

                // insert HTML code
                document.getElementById("results").innerHTML += htmlToAdd; 
                setTimeout(() => { executed = false }, 200);
            });
        }
    }

    // function for manipulating dates
    function dateMath(date, value) {
        // get rid of any extra text in the string
        date.replace("T05:00:00.000Z", ""); 
        // create a new date object with the string
        date = new Date(date); 
        // for whatever reason, when we turn the string into a date object it pushes the day back by 1. Probably a time zone problem. This corrects that. 
        date.setDate(date.getDate()+1); 
        // increment by the given value 
        // NOTE: subtraction must provide negative value
        date.setDate(date.getDate()+value); 
        // turn the date object back into a string with proper formatting
        let y = String(date.getFullYear()); 
        let m = String(date.getMonth() + 1).padStart(2, '0'); 
        let d = String(date.getDate()).padStart(2, '0');  
        date = y + "-" + m + "-" + d;

        return date; 
    } 

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


    return <div className = "trackerPage">

        {/* external stylesheets */ }
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-black.css"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        
        {/*navbar at top */}
        <div className = "w3-top">
            <div className= "w3-bar w3-theme w3-top w2-left-align w3-large">
                <a class="w3-bar-item w3-button w3-right w3-hover-white w3-large w3-theme-l1 w3-hide-large" onClick={w3_open}><i class="fa fa-bars"></i></a>
                <a href="/" class="w3-bar-item w3-button w3-theme-l1">TDEETracker.com</a>
            </div>
        </div>

        {/* sidebar */}
        <nav class="w3-sidebar w3-bar-block w3-collapse w3-large w3-theme-l5 w3-animate-left" id="mySidebar">
            <a onClick={w3_close} class="w3-right w3-xlarge w3-padding-large w3-hover-black w3-hide-large" title="Close Menu">
                <i class="fa fa-remove"></i>
            </a>
            <h4 class="w3-bar-item"><b>Menu</b></h4>
            <a class="w3-bar-item w3-button w3-hover-black" href="/helpPage">Help</a>
            <a class="w3-bar-item w3-button w3-hover-black" href="/contact">Developer Resumé</a>
            <a class="w3-bar-item w3-button w3-hover-black" href="/reportBug">Report Bug</a>
        </nav>

        {/* overlay effect when opening sidebar on small screens */ }
        <div class="w3-overlay w3-hide-large" onClick={w3_close} title="closing side menu" id="myOverlay"></div>

        {/* Main content - shift to right 250px when the sidebar is visible */ } 

        <div class="w3-main" id="main">

            <div class="w3-row w3-padding-64">
                <div class="w3-container">
                    <h1 class="w3-text-teal">My Tracker</h1>
                    <p id="welcome"></p>
                    <button className="w3-button w3-red w3-tiny w3-round" onClick={logOut}>Log out</button>
                   
                    <hr/>

                    <h3 class="w3-text-teal">Input new log:</h3>
                    <input 
                        type = "date"
                        value = {inputDate}
                        min = "2021-01-01"
                        max = "2049-12-31"
                        onChange = { ( { target } ) => setDate(target.value)} 
                        id = "input"
                    /> 
                    <input 
                        type = "number"
                        value = {inputCalories}
                        placeholder = "Calories"
                        onChange={ ( { target }) => setCalories(target.value)} 
                        id = "input"
                    />
                    <input 
                        type = "number"
                        value = {inputWeight}
                        placeholder = "Weight"
                        onChange={ ( { target }) => setWeight(target.value)}
                        id = "weightInputBox" 
                    />
                    <button class="w3-button w3-green w3-tiny w3-round" id="margin-needed" onClick={verifyInput}>Log entry</button>
                    
                    <hr/>

                    <h3 class="w3-text-teal">Delete a log:</h3>
                    <input
                        type = "date"
                        value = {deleteDate}
                        min = "2021-01-01"
                        max = "2049-01-01"
                        onChange = { ( {target} ) => setDeleteDate(target.value)}
                        id = "input" 
                    />
                    <button class="w3-button w3-red w3-tiny w3-round" id="margin-needed" onClick={deleteEntry}>Delete entry</button>
                    
                    <hr/>

                    <h3 class="w3-text-teal">Display data</h3>
                    <button class="w3-button w3-green w3-tiny w3-round" onClick={displayEntry} id="margin-needed">Display last four weeks of entries</button>
                    <button class="w3-button w3-green w3-tiny w3-round" id="margin-needed" onClick={displayEntry}>Update table</button>
                    <button class="w3-button w3-red w3-tiny w3-round" id="margin-needed" onClick={deleteAll}>Delete all entries</button>
                    <div className="results" id="results"></div>
                </div>
            </div>
        </div>
    </div>
}
export default TrackerPage; 