const tokenGenerator = require("../../../../utils/jwtTokenGenerator");
const { urlShortener, referalLink } = require("../../../../utils/url_services");
const { signupDatainsertion, insertSingUpPoints, singupRefferalUrlSearch, findUser } = require("../dal/authDal");
const { ulid } = require("ulid");
const visitedByReference = require("./referrals/visitedByReference");


const loginServices = async (userEmail) => {
    try {
        const user = await findUser(userEmail);
        console.log(user);

        if (!user) {
            throw new Error("user not found with this email")
        }
        const newId = user.id;

        const token = tokenGenerator({ ulid: newId, userEmail });
        return { token, newId };

    } catch (error) {
        throw error
    }


}

const signupServices = async (requestUrl, path, name, email, phone) => {
    try {
        let referralId;
        if (path) {
            let searchedUrl = process.env.SEARCHED_URL + requestUrl;
            const result = await singupRefferalUrlSearch(searchedUrl)
            if (result) {
                const parsedUrl = new URL(result.referralurl);
                const params = new URLSearchParams(parsedUrl.search);
                referralId = params.get('referral_id');
                if (referralId) {
                    visitedByReference(referralId)
                }
            }
        }
        const newId = ulid();
        const refLink = referalLink(newId)
        const shortenedURL = urlShortener();
        await signupDatainsertion(newId, name, email, phone, refLink, shortenedURL)
        await singUpPoints(newId, email)

        const token = tokenGenerator({ ulid: newId, email });
        return {
            token, newId
        };
    } catch (error) {
        throw error

    }
}

const singUpPoints = async (newId, email) => {
    try {
        await insertSingUpPoints(newId, email)
    } catch (error) {
        throw error
    }
}

module.exports = {
    loginServices,
    signupServices,
    singUpPoints
}