const db = require('../database/db_config')

async function checkUserExists(req, res, next) {
    const userEmail = req.body.email;
    console.log(userEmail);
    try {
        const query = `
            SELECT EXISTS (
                SELECT 1 
                FROM  signedup 
                WHERE email = $1
            ) AS exists;
        `;
        const result = await db.oneOrNone(query, [userEmail]);
        console.log(result);

        if (result.exists) {
            console.log("already exits");
            return res.status(409).json({ error: 'Email already exists' });

        }
        next();
    }
    catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


module.exports = {
    checkUserExists,

}