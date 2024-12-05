

function setAuthTokenCookie(res, token) {
    res.cookie('auth_token', token, {
        httpOnly: true,
        secure: false, // Set to true in production
        sameSite: 'Strict',
        maxAge: 3600000, // 1 hour
    });
}

module.exports = setAuthTokenCookie;