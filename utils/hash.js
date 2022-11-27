const {createHmac} = require('crypto')
const config = require('../config')

const hash = (password) => {

    return createHmac('sha256', config.SECRET)
        .update(password)
        .digest('hex');
}

module.exports = {
    hash
}