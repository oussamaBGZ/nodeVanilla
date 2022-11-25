
const variables = {
    'prod': {
        PORT: 3000,
        envName:"prod"
    },
    'staging': {
        PORT: 3001,
        envName:"staging"
    }
}
const mode = process.env.NODE_ENV && variables.hasOwnProperty(process.env.NODE_ENV.toLowerCase()) ? variables[process.env.NODE_ENV.toLowerCase()] : variables.staging

module.exports = mode
