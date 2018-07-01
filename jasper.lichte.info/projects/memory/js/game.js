addEventListener("load", e => {
  let clickCounter = 0;
  let currentPlayer = 1;
  let selectedCards = [];
  let player1Score = 0;
  let player2Score = 0;
  updateScores();

  const cards = document.querySelectorAll("main .board .card");

  for (let i = 1; i < 17; i++) {
    getRandomCard().setAttribute("data-img-href", "./img/cards/" + i + ".jpg");
    getRandomCard().setAttribute("data-img-href", "./img/cards/" + i + ".jpg");
  }

  cards.forEach((item, i) => {
    item.addEventListener("click", function(e) {
      selectedCards.push(this);
      clickCounter++;
      let imgNode = document.createElement("IMG");
      imgNode.setAttribute("class", "imgNode");
      imgNode.setAttribute("src", item.dataset.imgHref);
      item.appendChild(imgNode);
      if (selectedCards.length === 2) {
          if (selectedCards[0].dataset.imgHref === selectedCards[1].dataset.imgHref) {
            if(currentPlayer === 1) {
                player1Score++;
            } else {
                player2Score++;
            }
            updateScores();
            selectedCards[0].remove();
            selectedCards[1].remove();
          }
          selectedCards = [];
      }
      if (clickCounter % 2 == 0) {
        switchPlayer();
      }
    });
  });

  function getRandomCard() {
    let cardsWithoutImg = [];
    cards.forEach(item => {
      if (!item.dataset.imgHref) {
        cardsWithoutImg.push(item);
      }
    });

    return cardsWithoutImg[Math.floor(Math.random() * cardsWithoutImg.length)];
  }

  function switchPlayer() {
    let timer = 5000;
    let timerInterval = window.setInterval(() => {
      document.querySelector("main .timer").innerHTML =
        msToTime(timer) + "s left!";
      timer -= 10;
      if (timer <= 0) {
        window.clearInterval(timerInterval);
        currentPlayer === 1 ? (currentPlayer = 2) : (currentPlayer = 1);
        document.querySelector("main .timer").innerHTML =
          "Player" + currentPlayer + "`s turn!";
        clearBoard();
      }
    }, 10);
  }

  function msToTime(s) {
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;

    return secs + "." + ms;
  }

  function clearBoard() {
    let imgNodes = document.querySelectorAll("main .board .card .imgNode");
    imgNodes.forEach(el => {
      el.remove();
    });
  }

  function updateScores() {
      document.querySelector('main .player1Score').innerHTML = player1Score;
      document.querySelector('main .player2Score').innerHTML = player2Score;
  }
});
