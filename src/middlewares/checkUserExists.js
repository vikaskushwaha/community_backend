const db = require('../database/db_config')

async function checkUserExists(req, res, next) {
    const userEmail = req.body.email;
    if (!userEmail) {
        return res.status(400).json({
            status: "failed",
            message: "Email is required",
        });
    }
    try {
        const query = `
            SELECT EXISTS (
                SELECT 1 
                FROM  users
                WHERE email = $1
            ) AS exists;
        `;
        const user = await db.oneOrNone(query, [userEmail]);
        if (!user.exists) {
            return res.status(404).json({ error: 'Email does not exist. Please register' });
        }
        req.user = user;
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