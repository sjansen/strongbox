const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  if (process.env.STRONGBOX_API_BASE) {
    app.use(proxy('/api/', {
      target: process.env.STRONGBOX_API_BASE,
      changeOrigin: true,
      logLevel: "debug",
    }));
  }
};
