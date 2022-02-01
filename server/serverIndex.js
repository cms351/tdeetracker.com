const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors()); 
app.use(express.json()); 

const db = mysql.createConnection ({
    
    
    user: "root",
    host: "localhost",
    password: "password",
    database: "tdeedb", 
    
    
    /*
    user: "cstrike2", 
    host: "localhost", 
    password: "xxx", 
    database: "tdeedb",
    */
    
});

// should be working and finished 
app.post("/checkValidity", (req, res) => {
    const username = req.body.username;  

    db.query(
        "SELECT count(*) AS flag FROM users WHERE username=(?)", 
        [username], 
        (err, result) => {
            if (err) {
                console.log("Error when checking registration validity."); 
                console.log(err); 
            }
            else {
                console.log("made it to the result of checkValidity")
                res.json( { "flag": result[0].flag } );
            }
        }
    );

}); 

app.post("/checkValidityLogin", (req, res) => {

    const username = req.body.username; 
    const password = req.body.password; 

    db.query(
        "SELECT count(*) AS flag FROM users WHERE username=(?) AND password=(?)",
        [username, password], 
        (err, result) => {
            if (err) {
                console.log("Error when checking login validity."); 
                console.log(err); 
            }
            else {
                console.log("made it to else in server"); 
                res.json( { "flag": result[0].flag } ); 
            }
        }

    );
});

// seems to be working correctly
app.post("/login", (req, res) => {
    
    const inputUser = req.body.username;
    const inputPassword = req.body.password; 
    let flag = false; 
    
    db.query(
        "SELECT 1 FROM users WHERE username = (?)", 
        [inputUser], 
        (err, result) => {
            if (err) {
                console.log("Error during login."); 
                console.log(err); 
            }
            else {
                
            }
        }
    )
});

// bug fixed. Needed "res.send" code. 
// seems to work correctly now.
app.post("/register", (req, res)=> {

    const username = req.body.username; 
    const password = req.body.password; 

    console.log("made it into backend register"); 

    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)", 
        [username, password], 
        (err, result) => {
            if (err) {
                console.log("Error during register."); 
                console.log(err); 
            }
            else {
                res.send("Register success!"); 
            }
        }
    );

});

// should be working but work in progress
// fixed bug when creating two entries on the same date with the same user, now it just updates the entry
app.post("/create", (req, res) => {

    const username = req.body.username;
    const weight = req.body.weight; 
    const calories = req.body.calories;
    const date = req.body.date;

    db.query(
        "INSERT INTO tdeetable (username, weight, calories, date) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE weight = ('"+weight+"'), calories = ('"+calories+"')",
        [username, weight, calories, date], 
        (err, result) => {
            if (err) {
                console.log("Error when creating new log entry."); 
                console.log(err); 
            }
            else {
                res.send("Values inserted."); 
            }
        }
    ); 

});

app.post("/submitBug", (req, res) => {
    const description = req.body.description;
    const cause = req.body.cause; 

    db.query(
        'INSERT INTO bugs (description, cause) VALUES (?, ?)',
        [description, cause], 
        (err, result) => {
            if (err) {
                console.log(err); 
                res.json( {"Error": "Error in the backend - submit bug." } ); 
            }
            else {
                res.send("Bug submission successful"); 
            }
        }
    );
});

app.post("/deleteEntry", (req, res) => {

    const username = req.body.username; 
    const deleteDate = req.body.deleteDate; 

    db.query(
        "DELETE FROM tdeetable WHERE username = (?) AND date = (?)", 
        [username, deleteDate], 
        (err, result) => {
            if (err) {
                console.log(err); 
                res.json( { "Error": "Error in the backend - delete entry." } ); 
            }
            else {
                res.send("Delete entry successful"); 
            }
        }
    );
});

app.post("/deleteAll", (req, res) => {

    const username = req.body.username; 

    db.query(
        "DELETE FROM tdeetable WHERE username = (?)", 
        [username],
        (err, result) => {
            if (err) {
                console.log(err); 
                res.json( { "Error": "Error in the backend - delete all entries." } );
            }
            else {
                res.send("Delete all entries successful"); 
            }
        }
    )
})

// bug: breaks the server when I try to access values for a date / username combo that doesn't exist in the server
//
// I know I could do a second query that validates that the date / username combination exists in the 
// server, then run the displayEntry query if it does exist.
//
// but I'd prefer some cleaner way to do it
// I feel like there's some way to just return null or 0 in this query if that username / date combo 
// doesn't exist on the server. Don't know if that's possible though. 
app.post("/displayEntry", (req, res) => {
    const username = req.body.username; 
    const todaysDate = req.body.todaysDate; 
    const startDate = req.body.startDate; 

    db.query(
        "SELECT date, weight, calories FROM tdeetable WHERE username = (?) AND date >= (?) AND date <= (?)", 
        [username, startDate, todaysDate], 
        (err, result) => {
            if (err) {
                console.log(err); 
                res.json( { "Error": "Error in the backend - display entry." } ); 
            }
            else if (result != undefined && result.length > 0) {
                res.json( { "result": result } ); 
            } else {
                res.json( { "Error": "No such user." } ); 
            }
        }
    )
});

// John's code for reference
app.get("/summary", (req, res) => {

    db.query(
        "SELECT min(weight) AS min_weight FROM tdeedb.tdeetable;",
        [], 
        (err, result) => {
            if (err) {
                console.log(err); 
            }
            else {
                res.json( { "min_weight": result[0].min_weight } ); 
            }
        }
    )
    
}); 


app.listen(3001, () => {
    console.log("Yay, the server is running"); 
});