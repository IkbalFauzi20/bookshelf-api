const Hapi = require('@hapi/hapi');
const routesBooks = require('./routesBooks');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routesBooks);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();