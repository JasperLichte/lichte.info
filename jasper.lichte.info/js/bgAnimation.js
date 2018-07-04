
class Particle {
  constructor() {
    this.node = document.createElement("DIV");
    this.setSize();
    this.node.setAttribute("class", "particle");
    this.node.style.width = this.width + "px";
    this.node.style.height = this.height + "px";
    this.x = Math.random() * 100;
    this.node.style.left = this.x + "%";
    this.y = Math.random() * window.innerHeight;
    this.node.style.top = this.y + "px";
    this.v = Math.random() * 3 + 1;

    let animate = () => {
      this.node.style.top = this.y + "px";
      this.node.style.left = this.x + "%";

      requestAnimationFrame(animate);
      if (this.y <= window.innerHeight) {
        this.y += this.v;
        this.v *= 1.005;
      } else {
        this.y = this.height * -1;
        this.v = Math.random() * 3 + 1;
        this.x = Math.random() * 100;
      }
    };

    animate();
  }

  setSize() {
    this.width = Math.round(Math.random() * 20 + 5);
    this.height = this.width;
  }
}

if (!detectIE()) {
  for (let i = 0; i < window.innerWidth / 175; i++) {
    let particle = new Particle();
    document.body.appendChild(particle.node);
  }
}

function detectIE() {
  let ua = window.navigator.userAgent;

  let msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }

  let trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    let rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }

  let edge = ua.indexOf("Edge/");
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
  }

  // other browser
  return false;
}
