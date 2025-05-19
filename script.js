const imagePairs = [
  ["imgs/1.png", "imgs/2.png"],
  ["imgs/3.png", "imgs/4.png"]
];

let allCards = [];
let pairMap = {};
let revealedCards = [];
let matchedCards = 0;
let startTime = Date.now();
const backImage = "imgs/back.png";

imagePairs.forEach(([a, b]) => {
  allCards.push(a, b);
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

shuffle(allCards).forEach(image => {
  const button = document.createElement("button");
  button.className = "card";
  button.dataset.image = image;

  const img = document.createElement("img");
  img.src = backImage;
  img.alt = "Carta";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  button.appendChild(img);

  button.addEventListener("click", () => {
    if (revealedCards.length === 2 || button.classList.contains("matched") || img.src.includes(image)) return;

    img.src = image;
    revealedCards.push(button);

    if (revealedCards.length === 2) {
      const [first, second] = revealedCards;
      const img1 = first.querySelector("img");
      const img2 = second.querySelector("img");

      if (pairMap[first.dataset.image] === second.dataset.image) {
        first.classList.add("matched");
        second.classList.add("matched");
        revealedCards = [];
        matchedCards += 2;
      } else {
        setTimeout(() => {
          img1.src = backImage;
          img2.src = backImage;
          revealedCards = [];
        }, 2000);
      }
    }
  });

  board.appendChild(button);
});
