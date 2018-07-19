scrollAnimations();
window.addEventListener("scroll", scrollAnimations);

function scrollAnimations() {
  const headerNode = document.querySelector("header h1");
  const graphNode = document.querySelector("main .section2 .graphic > .data");
  const contactNode = document.querySelector("main .section3 .inputs");

  animateHeader();
  animateContactMe();

  if (
    window.scrollY >=
    getPosition(graphNode).y -
    window.innerHeight +
    graphNode.clientHeight * 0.75
  ) {
    animateGraph();
  }
  function animateHeader() {
    headerNode.style.opacity = 1 - (window.scrollY / window.innerHeight) * 2.5;
  }

  function animateGraph() {
    const dataNodes = graphNode.childNodes;
    dataNodes.forEach((el, i) => {
      if (el.id) {
        let val;
        switch (el.id) {
          case "html5":
            val = 80;
            break;
          case "css3":
            val = 75;
            break;
          case "es6":
            val = 72;
            break;
          case "php":
            val = 55;
            break;
          case "node":
            val = 65;
            break;
          default:
            val = 50;
            break;
        }
        el.style.height = val + "%";
      }
    });
  }

  function animateContactMe() {
    const nodes = contactNode.querySelectorAll('input, textarea');
    nodes.forEach(item => {
      if (window.scrollY >= getPosition(item).y - window.innerHeight + item.clientHeight) {
        item.style.width = '100%';
      }
    });
  }
}

function getPosition(element) {
  var xPosition = 0;
  var yPosition = 0;

  while (element) {
    xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
    yPosition += element.offsetTop - element.scrollTop + element.clientTop;
    element = element.offsetParent;
  }

  return { x: xPosition, y: yPosition };
}
