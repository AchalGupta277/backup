const publicRoutes = require(__basePath + 'utility/publicRoutes');
const { validateToken } = require(__basePath + `services/token`);

const authenticate = async (req, res, next) => {
    const pathUrl = req.path;
    if (publicRoutes.includes(pathUrl)) {
        next();
    } else {
        // validate token
        if (req.headers['token']) {
            // token present
            let token = await validateToken(req.headers['token']);
            if (token) {
                // put user in request
                req.user = {
                    email: token.email,
                    user_id: token.user_id
                }
                next();
            } else {
                // unauthorised
                return res.sendStatus(401);
            }
        } else {
            // unauthorised
            return res.sendStatus(401);
        }
    }
}

module.exports = authenticate