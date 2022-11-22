const { home, notFound } = require("./handlers");
const routes = {
  "GET": {
    "/": home,
  },
  "notfound": notFound,
};

module.exports = routes;
