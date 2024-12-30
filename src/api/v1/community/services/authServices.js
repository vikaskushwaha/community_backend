const tokenGenerator = require("../../../../utils/jwtTokenGenerator");
const { urlShortener, referalLink } = require("../../../../utils/url_services");
const { signupDatainsertion, insertSingUpPoints } = require("../dal/authDal");
const { ulid } = require("ulid");

const loginServices = async (userEmail, newId) => {

    const token = tokenGenerator({ ulid: newId, userEmail });
    return token;

}

const signupServices = async (name, email, phone) => {
    try {
        const newId = ulid();
        const refLink = referalLink(newId)
        const shortenedURL = urlShortener();
        await signupDatainsertion(newId, name, email, phone, refLink, shortenedURL)
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