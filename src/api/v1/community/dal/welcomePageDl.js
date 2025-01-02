const db = require("../../../../database/db_config");

const welcomePageData = async (emailId) => {
    try {
        const userPoints = await db.oneOrNone(`
          SELECT u.id, u.name, u.shortenedurl, up.total_points, up.watched_video,up.streak_days
          FROM users u
          JOIN userpoints up ON u.id = up.id
          WHERE u.email = $1`, [emailId]
        );

        return { userPoints }
    } catch (error) {
        throw new Error("not able to fetch users data from db from welcomePageData")
    }
}


module.exports = {
    welcomePageData,
}



