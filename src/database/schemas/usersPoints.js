const ulid = require('ulid')
const db = require("../db_config");
const { ParameterizedQuery, TableName } = require("pg-promise");

async function createUsersPointsTable(req, res) {
    const createTable =
        (`CREATE TABLE IF NOT EXISTS userpoints(
            id CHAR(26) PRIMARY KEY,
            email VARCHAR(255) UNIQUE,
            prev_date_of_video_watch  DATE,
            curr_date_of_video_watch  DATE,
            streak_days INT,
            total_points INT 
        
    ) `)
    try {
        await db.none(createTable);
        res.status(200)
        res.json({
            status: "success",
            message: "table created succesfully"
        })
    } catch (error) {
        res.status(500)
        res.json({
            status: "failed",
            message: "internal"
        })
    }
}

async function user_video_activity(req, res) {
    const userEmail = req.body.email;
    const date = req.body.date;

}

module.exports = {
    createUsersPointsTable
}