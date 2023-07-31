const express = require("express");
const cors = require("cors");
require('dotenv').config() //.env variables accessed via process.env.KEY
const pool = require('./db');
const bcrypt = require('bcrypt');

const saltRounds = 12;

const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(express.json());


//** API ENDPOINTS **//

//Create User
app.post("/api/addPlayer", async(req, res) => {
    //TODO: validate incoming username and email. Hash password.
    try {
        const {username, email, password} = req.body;

        const hashedPass = await bcrypt.hash(password, saltRounds);
        console.log(hashedPass);
        const newPlayer = await pool.query(
            'INSERT INTO player (username, email, password) VALUES ($1, $2, $3) RETURNING *;',
            [username, email, hashedPass]
            );

        res.json(newPlayer.rows[0]);

    } catch (error) {
        console.log(error.message);
    }
});

//get user
app.get("/api/getPlayer/:playerid", async(req, res) => {
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
app.put("/api/updatePlayer/:playerid", async(req, res) => {
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
app.delete("/api/deletePlayer/:playerid", async (req, res) => {
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
app.get("/api/login/:playerid/:pass", async (req, res) => {
    try {
        const { playerid, pass } = req.params;
        const hashToMatch = await pool.query(
            "SELECT password FROM player WHERE player_id=$1",
            [playerid]
        );
        const isValid = await bcrypt.compare(pass, hashToMatch.rows[0].password);
        res.json(isValid);
    } catch (error) {
        console.error(error.message);
    }
});

//** SERVE STATIC REACT APP **//

//serve static files from React app
//app.use(express.static(path.join(__dirname, '../client/dist')))
//serve the main index.html file for any routes requested,
//react-router-dom will handle client side routing
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'client', 'dist'));
// })


app.listen(port, () => {
    console.log(`Now listening on port ${port}.`)
});
