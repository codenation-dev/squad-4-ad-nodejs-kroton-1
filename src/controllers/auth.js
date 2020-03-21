const jwt = require('jsonwebtoken')

let Auth = {}

Auth.getToken = (req, res, next) => {
        const password = req.body.password

    //if(req.body.user === 'raul' && req.body.password === 'code123'){    
        const name  = req.body.user
        const token = jwt.sign({name}, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
        res.status(200).send({ token: token });
    //}
    
    //res.status(401).send({"error": "Invalid user or password."})
    
}

module.exports = Auth
