const { nanoid } = require("nanoid");

function referalLink(ulid) {
    const baseUrl = process.env.REFFERAL_LINK;
    const fullUrl = `${baseUrl}?referral_id=${ulid}`
    return (fullUrl);
}


function urlShortener() {
    const shortenedPath = nanoid(8);
    const baseURL = process.env.REFFERAL_LINK;
    const shortenedURL = `${baseURL}${shortenedPath}`
    return shortenedURL;
}



module.exports = {
    urlShortener,
    referalLink
}