const { totaluserPointsData } = require("../dal/totalUsersPointsDal")

const totalUserPointsServices = async (userId) => {
    try {
        const result = await totaluserPointsData(userId)
        const totalPointsOfUser = result.total_points
        return totalPointsOfUser;
    } catch (error) {
        throw error
    }
}

module.exports = {
    totalUserPointsServices
}