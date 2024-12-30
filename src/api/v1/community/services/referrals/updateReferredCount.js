const db = require("../../../../../database/db_config");



async function updateReferredCount(referralId, date) {


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
}

module.exports = updateReferredCount;