
const imagePairs = [
  ["imgs/1.png", "imgs/2.png"],
  ["imgs/3.png", "imgs/4.png"]
];

let allImages = [];
let pairMap = {};
let revealedCards = [];
let matchedCards = 0;
let startTime = Date.now();
let moveCount = 0;

imagePairs.forEach(([a, b]) => {
  allImages.push(a, b);
  pairMap[a] = b;
  pairMap[b] = a;
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById("timer").textContent = `Tempo: ${elapsed}s`;
}

setInterval(updateTimer, 1000);

const board = document.getElementById("game-board");
shuffle(allImages).forEach(image => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.image = image;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front" style="background-image: url('${image}')"></div>
      <div class="card-back"></div>
    </div>
  `;

  card.addEventListener("click", () => {
    if (card.classList.contains("revealed") || revealedCards.length === 2) return;

    card.classList.add("revealed");
    revealedCards.push(card);
    moveCount++;

    if (revealedCards.length === 2) {
      const [first, second] = revealedCards;
      if (pairMap[first.dataset.image] === second.dataset.image) {
        matchedCards += 2;
        revealedCards = [];

        if (matchedCards === allImages.length) {
          const timeTaken = Math.floor((Date.now() - startTime) / 1000);
          document.getElementById("victory-details").textContent =
            `Tempo: ${timeTaken}s | Movimentos: ${moveCount}`;
          document.getElementById("victory-message").classList.remove("hidden");
        }
      } else {
        setTimeout(() => {
          first.classList.remove("revealed");
          second.classList.remove("revealed");
          revealedCards = [];
        }, 2000);
      }
    }
  });

  board.appendChild(card);
});

function restartGame() {
  location.reload();
}
