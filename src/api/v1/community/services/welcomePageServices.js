const { welcomePageData } = require("../dal/welcomePageDl");


const welcomePageServices = async (emailId) => {
    try {
        const { userPoints } = await welcomePageData(emailId);

        let totalpercent;
        if (userPoints.watched_video === null) {
            totalpercent = 0;

        }
        else {
            totalpercent = Math.floor((userPoints.watched_video.length * 100) / 112);
        }
        return { userPoints, totalpercent }
    } catch (error) {
        throw error
    }
}

module.exports = {
    welcomePageServices
}