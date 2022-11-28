const jwt = require('jsonwebtoken')

module.exports = function(req, res, next)  {
    const token = req.headers['access-token'];

    // validar o token
    if(!token) {
        return res.status(403).json({msg: "unauthorized"})
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.id
    next();
}