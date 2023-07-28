const express = require("express");
const cors = require("cors");
require('dotenv').config() //.env variables accessed via process.env.KEY
const pool = require('./db');


const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//Create User
app.post("/register", async(req, res) => {
    //TODO: validate incoming username and email. Hash password.
    try {
        const {username, email, password} = req.body;
        const newPlayer = await pool.query(
            'INSERT INTO player (username, email, password) VALUES ($1, $2, $3) RETURNING *;',
            [username, email, password]
            );

        res.json(newPlayer.rows[0]);

    } catch (error) {
        console.log(error.message);
    }
});

//get user
app.get("/players/:playerid", async(req, res) => {
    try {
        const { playerid } = req.params.playerid;
        const allPlayers = await pool.query(
            "SELECT * FROM player WHERE player_id = $1;",
            [playerid]
        );
        res.json(allPlayers.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//update user
app.put("/players/:playerid", async(req, res) => {
    try {
        const { playerid } = req.params.playerid;
        const {email} = req.body
        const updatedPlayer = await pool.query(
            "UPDATE player SET email=$1 WHERE player_id=$2 RETURNING *;",
            [email, req.params.playerid]
            );
        
        res.json(updatedPlayer.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
});

//delete user
app.delete("/players/:playerid", async (req, res) => {
    try {
        const {playerid} = req.params;
        console.log(playerid);
        const deletedPlayer = await pool.query(
            "DELETE FROM player WHERE player_id=$1 RETURNING *;",
            [playerid]
        );

        res.json({deleted_player: deletedPlayer.rows[0]});

    } catch (error) {
        console.error(error.message);
    }
});

//login

app.get('/', (req, res) => {
    res.json({message: "Hello World", port: port});
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}.`)
});
