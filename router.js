const { getUser, postUser, putUser, deleteUser, login, authonticated, authorized } = require("./controllers/users");
const { home, notFound } = require("./handlers");
const routes = {
  "GET": {
    "/": home,
    "/user": getUser
  },
  "POST": {
    "/user": postUser,
    "/login": login
  },
  "PUT": {
    "/user": (req, res) => authonticated(req, res, (user) => authorized(req, res, user, () => putUser(req, res))),
  },
  "DELETE": {
    "/user": deleteUser,
  },

  "notfound": notFound,
};

module.exports = routes;
