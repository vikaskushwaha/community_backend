async function login() {

}
async function insertUserDetails(req, res) {
    try {
        const path = req.params.shortenedPath;
        let referralId = req.query.referral_id;
        if (path) {
            let searchedUrl = "http://localhost:2000" + req.url;
            const result = await searchUser(searchedUrl)
            if (result) {
                const parsedUrl = new URL(result.ogreferralurl);
                const params = new URLSearchParams(parsedUrl.search);
                referralId = params.get('referral_id');
            }
        }
        const newId = ulid();
        const refLink = referalLink(newId)
        const { name, email, phone } = req.body
        const shortenedURL = urlShortener();

        const insert = 'INSERT INTO signedup(id,name,email,phone,ogreferralurl, shortenedurl) VALUES($1,$2,$3,$4,$5,$6)'
        await db.none(insert, [newId, name, email, phone, refLink, shortenedURL])
        const token = jwt.sign({ ulid: newId, email: email }, SECRET_KEY);
        if (referralId) {
            visitedByReference(referralId)
        }
        const insertFirstLoginPoints = 'INSERT INTO  userpoints(id,email,total_points) VALUES($1,$2,$3)'
        await db.none(insertFirstLoginPoints, [newId, email, 50])
        res.status(200);
        res.json({
            status: "success",
            message: `${newId} ${token} "userloggedin`
        })
    } catch (error) {
        console.log(error);
        res.status(500)
        res.json({
            status: "failed",
            message: "internal"
        })
    }
}

module.exports = {
    login
}