const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('chat/chat.json');
const middlewares = jsonServer.defaults({static: './chat'});

server.use(middlewares);
server.use(router);
server.listen(5000, () => {
    console.log('JSON Server is running')
})