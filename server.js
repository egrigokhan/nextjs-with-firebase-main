const express = require("express");
const next = require("next");
const vhost = require("vhost");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const MAINServer = express();
  const mainServer = express();
  const studioServer = express();

  mainServer.get("/", (req, res) => {
    return app.render(req, res, "/", req.query);
  });

  mainServer.get("/*", (req, res) => {
    return app.render(req, res, `/${req.path}`, req.query);
  });

  mainServer.all("*", (req, res) => {
    return handle(req, res);
  });

  studioServer.get("/", (req, res) => {
    return app.render(req, res, "/studio", req.query);
  });

  studioServer.get("/*", (req, res) => {
    return app.render(req, res, `/studio`, req.query);
  });

  studioServer.all("*", (req, res) => {
    return handle(req, res);
  });

  MAINServer.use(vhost("studio.shil.me", studioServer));
  MAINServer.use(vhost("shil.me", mainServer));
  MAINServer.use(vhost("www.shil.me", mainServer));
  MAINServer.listen(port, (err) => {
    if (err) throw err;

    console.log(`> Ready on https://shil.me:${port}`);
  });
});
