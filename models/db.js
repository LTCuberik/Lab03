const { Client } = require('pg');

const client = new Client({
    user: 'u20120319',
    host: 'localhost',
    database: 'wad2231db',
    password: 'A65OY4@Y',
    port: 5433,
});

client.connect();

module.exports = client;