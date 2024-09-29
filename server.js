const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5500;
const mysql = require('mysql');

// Middleware to parse JSON data from the client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (your HTML, CSS, and JS files)
app.use(express.static('public'));

// API route to handle user signup
app.post('/signup', (req, res) => {
  const { username, email, password, class: userClass, rollno } = req.body;

  // For now, we'll just log the data and send a success response
  console.log('User Data:', { username, email, password, userClass, rollno });

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "bhavinishere123@@",
    database: "users"
  });
  // In a real-world app, you would store this data in a database (like MongoDB or MySQL)
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO user (username,email,password) VALUES (?,?,?)";
    con.query(sql,[username,email,password] ,function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
  
  res.json({ message: 'User registered successfully', user: req.body });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


