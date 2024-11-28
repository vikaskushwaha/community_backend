
const db = require("../db_config");
async function createRegisteredUserTable(req, res) {

    const createTable = `
        CREATE TABLE IF NOT EXISTS users (
            id CHAR(26) PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            phone VARCHAR(255) UNIQUE NOT NULL,
            referralurl VARCHAR(100),
            shortenedurl VARCHAR(100),
            referredCount HSTORE
        )
    `;

    try {
        await db.none(createTable);
        res.status(200)
        res.json({
            status: "success",
            message: "table created succesfully"
        })
    } catch (error) {
        console.log(error);

        res.status(500)
        res.json({
            status: "failed",
            message: "internal"
        })
    }
}

async function insertNewColumn(req, res) {
    const { tableName, columnName, columnValue } = req.body;
    try {
        let alterQuery = `
        ALTER TABLE ${tableName}
        ADD COLUMN ${columnName} ${columnValue}
    `
        await db.none(alterQuery)
        res.send(200)
        res.json({
            status: "success",
            message: "new column created"
        })


    }
    catch (error) {
        res.send(500)
        res.json({
            status: "faliled",
            message: "internal server error"
        })
    }


}

module.exports = {
    createRegisteredUserTable,
    insertNewColumn,
}