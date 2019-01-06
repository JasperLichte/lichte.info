(_ => {
  const hamburger_nodes = {
    nav: document.querySelector('nav'),
    close: document.querySelector('nav #close'),
    open: document.getElementById('hamburger_open')
  };

  if (!hamburger_nodes.nav || !hamburger_nodes.close || !hamburger_nodes.open) {
    return;
  }

  if (window.innerWidth <= 500) {
    hamburger_nodes.nav.style.left = '-100vw';
  } else {
    hamburger_nodes.nav.style.left = '-400px';
  }
  
  hamburger_nodes.close.addEventListener('click', _ => {
    if (window.innerWidth <= 500) {
      hamburger_nodes.nav.style.left = '-100vw';
    } else {
      hamburger_nodes.nav.style.left = '-400px';
    }
    setTimeout(_ => {
      hamburger_nodes.open.style.display = 'inline-block';
    }, 700);
  });
  
  hamburger_nodes.open.addEventListener('click', _ => {
    hamburger_nodes.nav.style.left = '0';
    hamburger_nodes.open.style.display = 'none';
  });
  
  addEventListener('resize', e => {
    if (window.innerWidth <= 500) {
      hamburger_nodes.nav.style.left = '-100vw';
    } else {
      hamburger_nodes.nav.style.left = '-400px';
    }
  });
})();
