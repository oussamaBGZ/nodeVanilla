const { response } = require("../utils/res")
const fs = require('fs')
const crypto = require('crypto')

const addChecks = (req, res) => {
    const { payload, user } = req
    const data = JSON.parse(payload)
    if (!data.statusCode || !data.url) return response(res, 'status or url not found', 400)
    const userPath = __dirname + '/../data/users/' + user+".json"
    const currentUser = JSON.parse(fs.readFileSync(userPath))
    if (currentUser?.checks?.length === 5) return response(res, 'u reached the maximus checks for the current user', 400)
    const id = crypto.randomBytes(20).toString("hex")
    data.id = id

    currentUser.checks = currentUser.checks && Array.isArray(currentUser.checks) ? [...currentUser?.checks, id]: [id]
    try {
        const filepath = __dirname + '/../data/checks/' + id+'.json'
        fs.writeFileSync(filepath, JSON.stringify(data))
        fs.writeFileSync(userPath, JSON.stringify(currentUser))
        return response(res, 'check added', 200)
    } catch (err) {
        console.error(err)
    }

}

module.exports = {
    addChecks
}