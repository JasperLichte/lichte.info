const express = require('express');
const socket = require('socket.io');
const JSON = require('circular-json');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '139.162.132.71',
    user: 'lichtein_admin',
    password: 'Lichtlein01',
    database: 'lichtein_testing'
});
connection.connect();

//App setup
const app = express();
const port = 9901;
const server = app.listen(port, () => {
    console.log('Listening on port ' + port);
});

//Static Files
app.use(express.static('client'));

//Socket setup
let connections = [];
const io = socket(server);
io.on('connection', socket => {
    connections.push(socket);
    console.log(connections.length + ' Connections');

    socket.on('disconnect', socket => {
        connections.splice(connections.indexOf(socket), 1);
        console.log(connections.length + ' Connections');
    })

    socket.on('message', data => {
        const obj = JSON.parse(data);
        console.log(`New incoming data: ${obj.username} | ${obj.password} | ${obj.email}`);
        insertIntoDB(obj);
    });

});

function insertIntoDB(data) {
    connection.query('insert into user set ?', data, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data stored in DB!');
    });
}