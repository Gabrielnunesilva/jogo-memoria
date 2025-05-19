const imagePairs = [
  ["imgs/1.png", "imgs/1983.png"],
  ["imgs/2.png", "imgs/1984.png"],
  ["imgs/3.png", "imgs/1987.png"],
  ["imgs/4.png", "imgs/1989.png"],
  ["imgs/5.png", "imgs/1990.png"],
  ["imgs/6.png", "imgs/1991.png"],
  ["imgs/7.png", "imgs/1993.png"],
  ["imgs/8.png", "imgs/1994.png"],
  ["imgs/9.png", "imgs/1995.png"],
  ["imgs/10.png", "imgs/1997.png"],
  ["imgs/11.png", "imgs/1999.png"],
  ["imgs/12.png", "imgs/2001.png"],
  ["imgs/13.png", "imgs/2003.png"],
  ["imgs/14.png", "imgs/2005.png"],
  ["imgs/15.png", "imgs/2006.png"],
  ["imgs/16.png", "imgs/2009.png"],
  ["imgs/17.png", "imgs/2011.png"],
  ["imgs/18.png", "imgs/2014.png"],
  ["imgs/19.png", "imgs/2016.png"],
  ["imgs/20.png", "imgs/2022.png"],
  ["imgs/21.png", "imgs/2025.png"],
];

const backImages = [
  "imgs/logo1.png",
  "imgs/logo2.png",
  "imgs/logo3.png",
  "imgs/logo4.png"
];

// Embaralha o array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let timerInterval = null;

function startGame(numPairs = 10) {
  const selectedPairs = shuffle([...imagePairs]).slice(0, numPairs);

  const allImages = [];
  const pairMap = {};
  let revealedCards = [];
  let matchedCards = 0;
  let moves = 0;
  let startTime = Date.now();

  selectedPairs.forEach(([a, b]) => {
    allImages.push(a, b);
    pairMap[a] = b;
    pairMap[b] = a;
  });

  const board = document.getElementById("game-board");
  const timerDisplay = document.getElementById("timer");
  const movesDisplay = document.getElementById("moves");
  const victoryMessage = document.getElementById("victory-message");
  const victoryDetails = document.getElementById("victory-details");

  // Ajusta grid columns conforme número de pares para um layout bom
  let columns = 5;
  if (numPairs <= 5) {
    columns = 5;
  } else if (numPairs <= 10) {
    columns = 5;
  } else {
    columns = 5;
  }
  board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

  board.innerHTML = "";
  victoryMessage.classList.add("hidden");
  timerDisplay.textContent = "Tempo: 0s";
  movesDisplay.textContent = "Movimentos: 0";

  if (timerInterval) clearInterval(timerInterval);

  // Timer
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = `Tempo: ${elapsed}s`;
  }, 1000);

  // Seleciona aleatoriamente um backImage para este jogo
  const backImage = backImages[Math.floor(Math.random() * backImages.length)];

  shuffle(allImages).forEach(image => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.image = image;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front" style="background-image: url('${image}')"></div>
        <div class="card-back" style="background-image: url('${backImage}')"></div>
      </div>
    `;

    card.addEventListener("click", () => {
      if (
        card.classList.contains("revealed") ||
        revealedCards.length === 2
      ) return;

      card.classList.add("revealed");
      revealedCards.push(card);

      if (revealedCards.length === 2) {
        moves++;
        movesDisplay.textContent = `Movimentos: ${moves}`;

        const [first, second] = revealedCards;

        if (pairMap[first.dataset.image] === second.dataset.image) {
          matchedCards += 2;
          revealedCards = [];

          if (matchedCards === allImages.length) {
            clearInterval(timerInterval);
            const elapsed = Math.floor((Date.now() - startTime) / 1000);

            victoryDetails.textContent = `Tempo: ${elapsed}s | Movimentos: ${moves}`;
            victoryMessage.classList.remove("hidden");
          }
        } else {
          setTimeout(() => {
            first.classList.remove("revealed");
            second.classList.remove("revealed");
            revealedCards = [];
          }, 1500);
        }
      }
    });

    board.appendChild(card);
  });
}

// Começa o jogo ao carregar a página
window.onload = () => {
  const victoryMessage = document.getElementById("victory-message");
  victoryMessage.classList.add("hidden");
  startGame(10);
};
