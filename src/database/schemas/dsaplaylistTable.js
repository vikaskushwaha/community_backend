const db = require("../db_config");

const dsaPlaylistTable = async (req, res) => {
    const createTable = `
        CREATE TABLE IF NOT EXISTS dsaPlaylist (
            id INT PRIMARY KEY,
            title TEXT NOT NULL,
            videoid TEXT NOT NULL,
            duration TEXT,
            iswatched BOOLEAN DEFAULT false
        );
        `;
    try {
        await db.none(createTable)
        res.status(200).json({
            status: "success",
            message: "Table created successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: "Internal  Server Error"
        })

    }
}

module.exports = dsaPlaylistTable