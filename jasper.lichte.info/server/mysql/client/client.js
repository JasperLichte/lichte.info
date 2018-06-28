addEventListener('load', () => {

    //Make Connection
    const socket = io.connect('lichte.info:9901/');

    //on Submit
    document.getElementById('form').addEventListener('submit', () => {
        const username = document.querySelector('#form #username').value;
        const email = document.querySelector('#form #email').value;
        const password = document.querySelector('#form #password').value;

        if(username && email && password) {
            const obj = {
                username : username,
                password : password,
                email : email
            };
            sendData(obj);
        }
    });

    //Listen for events
    socket.on('message', data => {
        const obj = JSON.parse(data);
        console.log(obj);
    })

    function sendData(data) {
        socket.emit('message', JSON.stringify(data));
    }

});