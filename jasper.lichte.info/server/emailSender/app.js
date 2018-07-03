const express = require("express");
const socket = require("socket.io");
const JSON = require("circular-json");
const nodemailer = require('nodemailer');

//App setup
const app = express();
const server = app.listen(8421, () => {
  console.log("Listening on port 8421");
});

//nodemailer setup
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'jasper.lichte@gmail.com',
        pass: 'Norwegen01'    
    }
});

//Socket setup
const io = socket(server);

io.on('connection', socket => {
    console.log('New Connection!');

    socket.on("message", data => {
        data = JSON.parse(data);
        let obj = {};

        for (key in data) {
            obj[key] = data[key].val;
        }
        
        let mailOptions = {
            from: `${obj.name} <jasper.lichte@gmail.com>`,
            to: 'jasper.lichte@web.de',
            subject: 'Someone sent you an eMail via lichte.info',
            text: `${JSON.stringify(obj)}

            ---------------------------------------------
            
            ${obj.message}`
        }

        transporter.sendMail(mailOptions, (err, res) => {
            if(err) {
                console.error(err);
            } else {
                console.log('Email sent!');
                io.emit('success', 'eMail Sent!');
            }
        })
        
    });

});
