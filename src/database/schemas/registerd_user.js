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
            referredCount HSTORE,
            referred_user_ids CHAR(26)[]
        )
    `;

    try {
        await db.none(createTable);
        res.status(200).json({
            status: "success",
            message: "Table created successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: "Internal Server Error"
        });
    }
}

async function insertNewColumn(req, res) {
    const { tableName, columnName, columnValue } = req.body;

    try {
        const alterQuery = `
            ALTER TABLE ${tableName}
            ADD COLUMN ${columnName} ${columnValue}
        `;
        await db.none(alterQuery);

        res.status(200).json({
            status: "success",
            message: "New column created"
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
    createRegisteredUserTable,
    insertNewColumn,
};
