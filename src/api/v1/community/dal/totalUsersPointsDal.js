const db = require("../../../../database/db_config");

const totaluserPointsData = async (emailId) => {
    try {
        const result = await db.one(`SELECT  total_points FROM userpoints WHERE email= $1`, [emailId])
        return result
    } catch (error) {
        throw error
    }

}

module.exports = {
    totaluserPointsData
}