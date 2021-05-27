const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

var messages = [
    {
        user: "Gilang",
        text: "data awal"
    },
    {
        user: "Gilang",
        text: "data kedua"
    },
];
var users = [
    {
        username: "Gilang",
        password: "1"
    }
];

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.get('/messages/:id', (req, res) => {
    console.log(req.params.id);
    res.send(messages[req.params.id]);
});

app.post('/messages', (req, res) => {
    const userId = req.header('Authorization');
    const user = users[userId];
    let msg = {user: user.username, text: req.body.message};
    messages.push(msg);
    res.json(msg);
});

app.post('/register', (req, res) => {
    let registerData = req.body;
    let newIndex = users.push(registerData);
    registerData.id = newIndex - 1;
    console.log(registerData);
    res.json(registerData);
});

app.listen(port, () => console.log('app running'));