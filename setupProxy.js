const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Ajusta esta ruta para que coincida con la ruta que usas para la API
    createProxyMiddleware({
      target: 'http://api.zeno.fm', // El dominio de tu API
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Reescribe la URL para eliminar `/api`
      },
    })
  );
};
