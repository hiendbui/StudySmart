const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const quizzes = require("./routes/api/quizzes");
const User = require('./models/User');
const bodyParser = require('body-parser');

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ 
    extended: false
}));

// app.get('/', (req, res) => {
//     const user = new User({
//         username: 'test',
//         password: 'password',
//         type: 'instructor'
//     })
//     user.save();
//     res.send("Hello World!");
// });

app.use("/api/users", users);
app.use("/api/quizzes", quizzes);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)});