const db = require("../db_config");

async function createUsersPointsTable(req, res) {
    const createTable = `
        CREATE TABLE IF NOT EXISTS userpoints (
            id CHAR(26), -- Foreign key reference to users(id)
            email VARCHAR(255) UNIQUE,
            prev_date_of_video_watch DATE,
            curr_date_of_video_watch DATE,
            streak_days INT,
            total_points INT,
            watched_video TEXT[],
            CONSTRAINT fk_user FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
        )
    `;

    try {
        await db.none(createTable);  // Executes the query to create the table
        res.status(200).json({
            status: "success",
            message: "Table created successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failed",
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    createUsersPointsTable
};
