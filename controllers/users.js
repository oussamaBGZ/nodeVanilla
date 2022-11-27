const { response } = require("../utils/res")
const fs = require('fs')
const { hash } = require("../utils/hash")
const crypto = require('crypto')

const getUser = (req, res) => {
    const { query } = req
    const filepath = __dirname + '/../data/users/' + query.get('username') + ".json"

    try {
        const user = fs.readFileSync(filepath, 'utf8')
        return response(res, user, 200)
    } catch (err) {
        return response(res, JSON.stringify(err.message), 400)
    }
}

const postUser = (req, res) => {
    const {
        payload
    } = req

    if (!payload) return response(res, "missing payload", 400)

    const { username, password, phone } = JSON.parse(payload)

    if (!username || !password || !phone) return response(res, "username or password or phone is missing", 400)

    const filepath = __dirname + '/../data/users/' + username + ".json"
    const checkifuser = fs.existsSync(filepath)

    if (checkifuser) return response(res, "username is already exist", 400)

    const data = {
        username,
        phone,
    }
    data.password = hash(JSON.stringify(password))

    try {
        fs.writeFileSync(filepath, JSON.stringify(data))
        return response(res, "user is added", 200)
    } catch (err) {
        console.error(err)
    }
}

const putUser = async (req, res) => {
    const {
        payload
    } = req

    if (!payload) return response(res, "missing payload", 400)

    const data = JSON.parse(payload)
    if (!data?.username) return response(res, "username phone is missing", 400)

    const filepath = __dirname + '/../data/users/' + data.username + ".json"
    const checkifuser = fs.existsSync(filepath)
    if (!checkifuser) return response(res, "user is not found", 400)

    if (data.hasOwnProperty("password")) data.password = hash(JSON.stringify(data.password))

    try {
        const user = fs.readFileSync(filepath, 'utf8')
        const resData = { ...JSON.parse(user), ...data }
        fs.writeFileSync(filepath, JSON.stringify(resData))
        return response(res, JSON.stringify(resData), 200)
    } catch (err) {
        console.error(err)
    }
}

const deleteUser = async (req, res) => {
    const { query } = req

    const filepath = __dirname + '/../data/users/' + query.get('username') + ".json"
    const checkifuser = fs.existsSync(filepath)
    if (!checkifuser) return response(res, "user is not found", 400)

    try {
        fs.unlinkSync(filepath)
        return response(res, "user deleted", 200)
    } catch (err) {
        console.error(err)
    }
}



const login = async (req, res) => {
    const {
        payload
    } = req

    if (!payload) return response(res, "missing payload", 400)

    const data = JSON.parse(payload)
    if (!data?.username || !data?.password) return response(res, "username or phone is missing", 400)

    const { username, password } = data

    const userPath = __dirname + '/../data/users/' + username + ".json"


    if (!fs.existsSync(userPath)) return response(res, "username is wrong", 400)

    const user = fs.readFileSync(userPath, 'utf8')
    const userParsed = JSON.parse(user)

    const checkIfPasswordMatch = hash(JSON.stringify(data.password)) === userParsed.password

    if (!checkIfPasswordMatch) return response(res, "password is wrong", 400)

    const token = crypto.randomBytes(20).toString("hex")

    const filepath = __dirname + '/../data/tokens/' + token + ".json"

    const content = {
        username,
        expireDate: Date.now() + 360000
    }

    try {
        fs.writeFileSync(filepath, JSON.stringify(content))
        return response(res, JSON.stringify({ token }), 200)
    } catch (err) {
        console.error(err)
        return response(res, err, 500)
    }

}

const authonticated = (req, res, cb) => {
    const {
        headers,
    } = req;
    const tokenPath = __dirname + '/../data/tokens/' + headers.token + ".json"

    if (!fs.existsSync(tokenPath)) return response(res, 'token not found', 400)

    try {
        const tokenData = fs.readFileSync(tokenPath)
        if (JSON.parse(tokenData).expireDate < Date.now()) return response(res, 'You are not authonticated', 400)

        cb(JSON.parse(tokenData).username)
    }
    catch (err) {
        console.error(err)
    }
}

const authorized = (req, res, user, cb) => {
    const {
        payload,
    } = req;

    if (JSON.parse(payload).username !== user) return response(res, 'You are not authorized data belongs to other user', 403)
    cb()
}

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser,
    login,
    authorized,
    authonticated
}