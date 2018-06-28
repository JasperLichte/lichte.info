addEventListener('load', () => {

    //Make Connection
    const socket = io.connect('http://lichte.info:3001/');

    //change Background
    function changeBackground() {
        const a = Math.round(Math.random() * 100);
        const b = Math.round(Math.random() * 100);
        document.querySelector('main .output').style.backgroundPosition = `${a}% ${b}%`;
    }
    changeBackground();

    //Send Message
    document.querySelector('.inputs .message-button').addEventListener('click', e => {
        const message = document.querySelector('.inputs .message-input').value;
        if (message) {
            document.querySelector('.inputs .message-input').value = '';
            socket.emit('message', message);
        }
    });

    //Listen for events
    socket.on('message', data => {
        const obj = JSON.parse(data);
        const message = obj.data;
        const sock = obj.socket;
        if (message && sock) {
            //Display Message
            const outputNode = document.querySelector('.output');
            let div = document.createElement('DIV');
            div.appendChild(document.createTextNode(message));

            if (sock.id === socket.id) {
                div.setAttribute('class', 'me');
            } else {
                div.setAttribute('class', 'not-me');
            }

            div.setAttribute('class', 'message ' + div.getAttribute('class'));

            outputNode.appendChild(div);
        }
    })

});