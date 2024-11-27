const express = require("express");
const app = express ();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.post('/submit', (req, res) => {
    console.log(req.body)
    const request = req.body
    const response = {
        status: 'success',
        message: 'JSON ricevuto',
        data: request
    };
    res.json(response);
});

app.get("/", (req,res) => {
    res.sendFile(__dirname +"/index.html");
});

app.listen(port, () => {
    console.log("Server in ascolto sulla porta " + "//localhost:"+port)
})