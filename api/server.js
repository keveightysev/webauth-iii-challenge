const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./auth/route.js');
const restricted = require('./auth/restricted.js');
const usersRouter = require('./users/route.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, usersRouter);

server.get('/', (req, res) => {
	res.send(`
        <h1>This is my server</h1>
        <h2>There are others like it but this one is mine</h2>
    `);
});

module.exports = server;
