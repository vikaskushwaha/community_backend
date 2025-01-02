const { dateIndianFormat } = require("../../../../utils/date_format");
const { getUserActivityData, updateStreak, streakPoints } = require("../dal/videoStreakDal");


const videoStreakTrackServices = async (emailId) => {
    try {
        const date = new Date();
        let currentDate = dateIndianFormat(date)
        const usersActivityData = await getUserActivityData(emailId)
        let { streak_days, total_points, prev_date_of_video_watch, curr_date_of_video_watch } = usersActivityData;
        if (prev_date_of_video_watch === null && curr_date_of_video_watch === null) {
            streak_days = 1;
            await updateStreak(emailId, streak_days, currentDate, null)
        }
        else {
            let prevDate = dateIndianFormat(curr_date_of_video_watch)
            prevDate = new Date(prevDate)
            currentDate = new Date(currentDate)
            const diffTime = Math.abs(currentDate - prevDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                if (streak_days === 7) {
                    total_points += 50;
                    await streakPoints(emailId, total_points)
                }
                if (streak_days === 30) {
                    total_points += 100;
                    await streakPoints(emailId, total_points)
                }
                if (streak_days === 100) {
                    total_points += 500;
                    await streakPoints(emailId, total_points)
                }
                streak_days += 1;
                await updateStreak(emailId, streak_days, currentDate, prevDate)
            }
            else if (diffDays > 1) {
                streak_days = 1;
                await updateStreak(emailId, streak_days, currentDate, prevDate)
            }

        }
    } catch (error) {
        throw error
    }

}

module.exports = {
    videoStreakTrackServices
}

