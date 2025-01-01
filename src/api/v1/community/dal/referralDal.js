const db = require("../../../../database/db_config");

const updateReferredCount = async (referralId, date) => {
    try {
        const query = `
        UPDATE users
        SET referredCount = 
            CASE
                WHEN referredCount IS NULL THEN  -- If referredCount is NULL, initialize with the key
                    hstore($2, '1')  
                WHEN referredCount ? $2 THEN
                    referredCount || hstore($2, (CAST((referredCount -> $2)::int + 1 AS text)))  -- Increment the value by 1
                ELSE
                   hstore($2, '1')   --suppose user referred today also  and tomorrow also   then for tomorrow i don't want today's data and since it had some data so it shoud not be null 
                  
            END
        WHERE id = $1;
    `;
        await db.none(query, [referralId, date]);
    } catch (error) {
        throw error
    }

}


const getReferralCount = async (referralId, date) => {
    try {
        let total_referal;
        const referalCountQuery = `
        SELECT referredcount->$2 FROM users
        WHERE  id = $1;
    
    `;
        const data = await db.oneOrNone(referalCountQuery, [referralId, date])
        total_referal = data['?column?'];
        total_referal = parseInt(total_referal, 10);
        return total_referal;
    } catch (error) {
        throw error
    }

}

const getTotalPoints = async (referralId) => {
    try {
        let { value: totalPointsOfReferringUser } = await db.one(`SELECT total_points AS VALUE FROM userpoints WHERE id = $1`, [referralId])
        console.log("totalPointsOfReferringUser", totalPointsOfReferringUser);
        return totalPointsOfReferringUser;
    } catch (error) {
        throw error
    }

}

const updateReferralPoints = async (referralId, referralPoints) => {
    try {
        const updateReferralPoints = `
        UPDATE userpoints
        SET total_points = $2
        WHERE id = $1;
    `;
        await db.none(updateReferralPoints, [referralId, referralPoints])
    } catch (error) {
        throw error
    }

}

module.exports = {
    updateReferredCount,
    getReferralCount,
    getTotalPoints,
    updateReferralPoints


}