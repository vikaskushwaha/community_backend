const db = require("../database/db_config");
const { ParameterizedQuery, TableName } = require("pg-promise");



async function searchUser(shortendLink) {
    const findLink = new ParameterizedQuery({ text: 'SELECT * FROM users WHERE  shortenedurl = $1;', values: [shortendLink] })
    try {
        const result = await db.oneOrNone(findLink);

        return result;
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}

function claculatePoints(total_referal) {
    let total_points = 0;
    if (total_referal < 5) {
        total_points = 50 * total_referal;

    }
    else if (total_referal > 5 && total_referal < 10) {
        total_points = 500;
        total_points += (total_referal - 5) * 50;

    }
    else if (total_referal == 5) {
        total_points = 500;
    }
    else if (total_referal == 10) {
        total_points = 1500;
    }
    return total_points;

}

async function visitedByReference(referralId) {
    const date = new Date().toISOString().slice(0, 10);
    // const date = JSON.stringify(req.body);
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

    let total_referal;
    const referalCountQuery = `
        SELECT referredcount->$2 FROM users
        WHERE  id = $1;
    
    `;
    const data = await db.oneOrNone(referalCountQuery, [referralId, date])
    total_referal = data['?column?'];
    total_referal = parseInt(total_referal, 10);
    if (total_referal <= 10) {
        const total_points = claculatePoints(total_referal);
        console.log("totalPoints", total_points);

        const updateReferralPoints = `
        UPDATE userpoints
        SET referral_points = $2
        WHERE id = $1;
    `;
        await db.none(updateReferralPoints, [referralId, total_points])

    }
}

module.exports = {
    searchUser,
    visitedByReference
}