function claculateReferralPoints(total_referal, totalPointsOfReferringUser) {

    if (total_referal % 5 != 0) {
        totalPointsOfReferringUser += 50;
    }
    else {
        if ((total_referal / 5) % 2 == 0) {
            totalPointsOfReferringUser += 800;
        }
        else {
            totalPointsOfReferringUser += 300;
        }
    }
    return totalPointsOfReferringUser;

}

module.exports = claculateReferralPoints;