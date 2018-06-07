const hamburger_nodes = {
    nav : document.querySelector('nav'),
    close : document.querySelector('nav #close'),
    open : document.getElementById('hamburger_open')
};

hamburger_nodes.close.addEventListener('click', e => {
    hamburger_nodes.nav.style.display = 'none';
});

hamburger_nodes.open.addEventListener('click', e => {
    hamburger_nodes.nav.style.display = 'block';
});