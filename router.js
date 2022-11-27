const { getUser, postUser, putUser, deleteUser, login } = require("./controllers/users");
const { home, notFound } = require("./handlers");
const routes = {
  "GET": {
    "/": home,
    "/user":getUser
  },
  "POST": {
    "/user": postUser,
    "/login": login
  },
  "PUT": {
    "/user": putUser,
  },
  "DELETE": {
    "/user": deleteUser,
  },
  
  "notfound": notFound,
};

module.exports = routes;
