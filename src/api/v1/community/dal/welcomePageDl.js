const db = require("../../../../database/db_config");

const welcomePageData = async (userId) => {
    try {
        const userData = await db.one('SELECT *FROM users WHERE id = $1', [userId])
        const userPoints = await db.one('SELECT *FROM userpoints WHERE id = $1', [userId])
        return { userData, userPoints }
    } catch (error) {
        throw error
    }
}



module.exports = {
    welcomePageData,
}