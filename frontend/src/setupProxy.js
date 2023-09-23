const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = {
  target: "http://localhost:5000",
  changeOrigin: true,
};

module.exports = function (app) {
  app.use("/api/auth/", createProxyMiddleware(proxy));
  app.use("/api/course/", createProxyMiddleware(proxy));
  app.use("/api/review/", createProxyMiddleware(proxy));
};
