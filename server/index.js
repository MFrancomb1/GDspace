const express = require("express");
const cors = require("cors");


const app = express();
const port = 8000;

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "Hello World", port: port});
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}.`)
});