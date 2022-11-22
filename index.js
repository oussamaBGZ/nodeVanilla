const http = require("http");
const routes = require("./router");
const PORT = 3000;
const hostname = "127.0.0.1";
const scheme = "http";

http
  .createServer((req, res) => {
    const url = new URL(scheme + "://" + req.headers.host + req.url);
    const pathName = url.pathname;
    const query = url.searchParams;
    const method = req.method;
    const headers = req.headers;
    let payload = "";
    console.log(method, pathName, routes);
    req.on("data", (raw) => {
      payload += raw.toString("utf-8");
    });

    req.on("end", () => {
      console.log(payload);
      const data = {
        pathName,
        query,
        method,
        headers,
        payload,
      };
      const matchRoute = routes[method][pathName];

      if (matchRoute) return matchRoute(data, res);
      return routes["notfound"](data, res);
    });
  })
  .listen(PORT, hostname, () =>
    console.log("server is runing in port " + PORT)
  );
