addEventListener('load', () => {

    const socket = io.connect('http://jasper.lichte.info:3001');
    const messagesNode = document.querySelector('.messages');

    socket.on('message', data => {
        data = JSON.parse(data).data;
        let msgNode = document.createElement('DIV');
        msgNode.appendChild(document.createTextNode(data));
        messagesNode.appendChild(msgNode);
    });

    socket.emit('message', 'huhu');

});