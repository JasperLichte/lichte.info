addEventListener('load', () => {

    document.body.querySelector('.inputs > button').addEventListener('click', function() {
        if (this.parentNode.querySelector('input').value !== "") {
            makeRequest(this.parentNode.querySelector('input').value);
            this.parentNode.querySelector('input').value = "";
        }
    });

    document.body.querySelector('.inputs > input').addEventListener('keydown', function(e) {
        if (e.key === "Enter" && this.value !== "") {
            makeRequest(this.value);
            this.value = "";
        }
    });

});

function makeRequest(url) {
    console.log('Loading...');
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            const data = xmlHttp.responseText;

            if (document.body.querySelector('.src')) {
                document.body.querySelector('.src').remove();
            }
            let container = document.createElement('DIV');
            container.setAttribute('class', 'src');
            container.appendChild(document.createElement('H2'));
            container.querySelector('h2').appendChild(document.createTextNode(url));
            container.appendChild(document.createTextNode(data));
            document.body.appendChild(container);
        }
    }
    xmlHttp.open('GET', 'https://cors.io/?http://' + url, true);
    xmlHttp.send(null);
}