const db = require("../database/db_config");
const { ParameterizedQuery, TableName } = require("pg-promise");



async function searchUser(shortendLink) {
    const findLink = new ParameterizedQuery({ text: 'SELECT * FROM users WHERE  shortenedurl = $1;', values: [shortendLink] })
    try {
        const result = await db.oneOrNone(findLink);

        return result;
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}





module.exports = {
    searchUser,
}