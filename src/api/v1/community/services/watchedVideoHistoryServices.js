const { getCurrentPointsOfUser, checkVideoIsAlreadyWatched, updateVideoList } = require("../dal/watchedVideoHistoryDal")


const watchedVideoHistoryServices = async (userId, videoId) => {
    try {
        let totalPoints = await getCurrentPointsOfUser(userId)
        const result = await checkVideoIsAlreadyWatched(userId, videoId)
        if (!result) {
            totalPoints += 10;
            await updateVideoList(userId, videoId, totalPoints)
        }

    } catch (error) {
        throw error
    }
}

module.exports = {
    watchedVideoHistoryServices
}
