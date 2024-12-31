const db = require("../../../../database/db_config");
const { ParameterizedQuery, TableName } = require("pg-promise");

const findUser = async (userEmail) => {
    try {
        const query = `
            SELECT * 
            FROM users
            WHERE email = $1;
        `;
        const user = await db.oneOrNone(query, [userEmail]);

        return user;
    } catch (error) {
        throw error
    }

}

const singupRefferalUrlSearch = async (searchedUrl) => {
    const findLink = new ParameterizedQuery({ text: 'SELECT * FROM users WHERE  shortenedurl = $1;', values: [searchedUrl] })
    try {
        const result = await db.oneOrNone(findLink);
        return result;
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}


const signupDatainsertion = async (newId, name, email, phone, refLink, shortenedURL) => {
    try {
        const insert = 'INSERT INTO users(id,name,email,phone,referralurl, shortenedurl) VALUES($1,$2,$3,$4,$5,$6)'
        await db.none(insert, [newId, name, email, phone, refLink, shortenedURL])
    } catch (error) {
        throw error;
    }
}

const insertSingUpPoints = async (newId, email) => {
    try {
        const insertFirstLoginPoints = 'INSERT INTO  userpoints(id,email,total_points) VALUES($1,$2,$3)'
        await db.none(insertFirstLoginPoints, [newId, email, 50])
    } catch (error) {
        throw error
    }

}

module.exports = {
    findUser,
    singupRefferalUrlSearch,
    signupDatainsertion,
    insertSingUpPoints,
}