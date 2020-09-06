const jwt = require('jsonwebtoken');

exports.createToken = (payload) => {
    let token = jwt.sign(payload, process.env.secretKey);
    return token;    
}

exports.validateToken = (token) => {
    return new Promise((resolve, reject) => {
        try{
            let decode = jwt.verify(token, process.env.secretKey);
            console.log(decode);
            resolve(decode);
        }catch(error){
            resolve(false);
        }
    })
}