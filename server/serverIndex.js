const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt"); 
const saltRounds = 10; 

app.use(cors()); 
app.use(express.json()); 

// config to create MySQL connections
const dbConfig = {

    user: "root",
    host: "localhost", 
    password: "password",
    database: "tdeedb",   
    
};

// establish initial connection
var connection; 
handleDisconnect(); 

// handle disconnect
function handleDisconnect() {

    connection = mysql.createConnection(dbConfig); 

    connection.connect(function(err) {
        if (err) {
            console.log("Error when connecting to database.", err); 
            setTimeout(handleDisconnect, 2000); 
        }
    }); 

    connection.on("error", function(err) {
        console.log("Database error.", err); 
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handleDisconnect(); 
        }
        else {
            throw err;
        }
    }); 
    
}

// check that username exists in database
app.post("/checkValidity", (req, res) => {
    const username = req.body.username;  

    connection.query(
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

// find username, compare password input to encrypted password stored in the database
app.post("/login", (req, res) => {

    const username = req.body.username; 
    const passwordPreEncryption = req.body.password; 

    connection.query(
        "SELECT password FROM users WHERE username=(?)",
        [username, passwordPreEncryption], 
        async (err, result) => {
            if (err) {
                console.log("Error when checking login validity."); 
                console.log(err); 
            }
            else {
                // if there are matching usernames, compare the password to our encrypted password
                // if matching password, authorize. Otherwise, reject. 
                if (result.length > 0) {
                    const comparison = await bcrypt.compare(passwordPreEncryption, result[0].password);

                    if (comparison) {
                        res.json( { "authorization": 1 } ); 
                    }
                    else {
                        res.json( { "authorization": 0 } ); 
                    }
                }
                else { // reject if there are no matching usernames
                    res.json( { "authorization": 0 } ); 
                }
            }
        }

    );
});

// encrypts password input, inputs username and encrypted password into users database
app.post("/register", async (req, res)=> {

    const username = req.body.username; 
    const passwordToRegister = req.body.password; 
    const password = await bcrypt.hash(passwordToRegister, saltRounds); 

    console.log("made it into backend register"); 

    

    connection.query(
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

// inserts calorie/weight log into tdeetable database under user's username
app.post("/create", (req, res) => {

    const username = req.body.username;
    const weight = req.body.weight; 
    const calories = req.body.calories;
    const date = req.body.date;

    connection.query(
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

// inputs user's bug ticket into bug database
app.post("/submitBug", (req, res) => {
    const description = req.body.description;
    const cause = req.body.cause; 

    connection.query(
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

// removes entries that match inputted username and date in tdeetable database
app.post("/deleteEntry", (req, res) => {

    const username = req.body.username; 
    const deleteDate = req.body.deleteDate; 

    connection.query(
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

// removes all entries from the username in the tdeetable database
app.post("/deleteAll", (req, res) => {

    const username = req.body.username; 

    connection.query(
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

// displays all user entries of the last four weeks under username in tdeetable 
app.post("/displayEntry", (req, res) => {
    const username = req.body.username; 
    const todaysDate = req.body.todaysDate; 
    const startDate = req.body.startDate; 

    connection.query(
        "SELECT date, weight, calories FROM tdeetable WHERE username = (?) AND date >= (?) AND date <= (?)", 
        [username, startDate, todaysDate], 
        (err, result) => {
            if (err) {
                console.log(err); 
                res.json( { "Error": "Error in the backend. Please try again later." } ); 
            }
            else if (result != undefined && result.length > 0) {
                res.json( { "result": result } ); 
            } else {
                res.json( { "Error": "No available user data. Try logging a new entry." } ); 
            }
        }
    )
});

// John's code for reference
app.get("/summary", (req, res) => {

    connection.query(
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