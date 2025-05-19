const imagePairs = [
  ["imgs/1.png", "imgs/2.png"],
  ["imgs/3.png", "imgs/4.png"]
];

let allImages = [];
let pairMap = {};
let revealedCards = [];
let matchedCards = 0;
let startTime = Date.now();

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
  const card = document.createElement("button");
  card.className = "card";
  card.dataset.image = image;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <img src="${image}" />
      </div>
      <div class="card-back">
        <img src="imgs/back.png" />
      </div>
    </div>
  `;

  card.addEventListener("click", () => {
    if (card.classList.contains("revealed") || revealedCards.length === 2) return;

    card.classList.add("revealed");
    revealedCards.push(card);

    if (revealedCards.length === 2) {
      const [first, second] = revealedCards;
      if (pairMap[first.dataset.image] === second.dataset.image) {
        matchedCards += 2;
        revealedCards = [];
      } else {
        setTimeout(() => {
          first.classList.remove("revealed");
          second.classList.remove("revealed");
          revealedCards = [];
        }, 2000); // Delay para ver a carta antes de esconder
      }
    }
  });

  board.appendChild(card);
});
