const { nanoid } = require("nanoid");

function referalLink(ulid) {
    const baseUrl = "http://localhost:2000/auth/signup"
    const fullUrl = `${baseUrl}?referral_id=${ulid}`
    return (fullUrl);
}


function urlShortener() {
    const shortenedPath = nanoid(8);
    const baseURL = "http://localhost:2000/auth/signup/";
    const shortenedURL = `${baseURL}${shortenedPath}`
    return shortenedURL;
}



module.exports = {
    urlShortener,
    referalLink
}