exports.getTimestamp = () => {
    return Math.floor(Date.now()/1000);
}

exports.encryptMessage = (message) => {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(message).digest("hex")
}

