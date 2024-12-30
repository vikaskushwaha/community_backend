const db = require("../../../../database/db_config");

const totaluserPointsData = async (userId) => {
    try {
        const result = await db.one(`SELECT  total_points FROM userpoints WHERE id= $1`, [userId])
        return result
    } catch (error) {
        throw error
    }

}

module.exports = {
    totaluserPointsData
}