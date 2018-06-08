const hamburger_nodes = {
    nav : document.querySelector('nav'),
    close : document.querySelector('nav #close'),
    open : document.getElementById('hamburger_open')
};
if (window.innerWidth <= 500) {
    hamburger_nodes.nav.style.left = '-100vw';
} else {
    hamburger_nodes.nav.style.left = '-400px';
}

hamburger_nodes.close.addEventListener('click', e => {
    if (window.innerWidth <= 500) {
        hamburger_nodes.nav.style.left = '-100vw';
    } else {
        hamburger_nodes.nav.style.left = '-400px';
    }
});

hamburger_nodes.open.addEventListener('click', e => {
    hamburger_nodes.nav.style.left = '0';
});

addEventListener('resize', e => {
    if (window.innerWidth <= 500) {
        hamburger_nodes.nav.style.left = '-100vw';
    } else {
        hamburger_nodes.nav.style.left = '-400px';
    }
})