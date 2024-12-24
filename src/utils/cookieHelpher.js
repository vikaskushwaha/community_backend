

function setAuthTokenCookie(res, token) {
    res.cookie('auth_token', token, {
        httpOnly: true,
        secure: false, // Set to true in production
        sameSite: 'Strict',
        maxAge: 1800000,
    });
}

module.exports = setAuthTokenCookie;