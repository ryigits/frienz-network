function userLogedIn(req, res, next) {

    next();
}

function userLogedOut(req, res, next) {
    next();
}


module.exports = {
    userLogedIn,
    userLogedOut,
};