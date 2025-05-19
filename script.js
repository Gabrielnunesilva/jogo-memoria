const images = [
  "https://via.placeholder.com/200/ff4444?text=A",
  "https://via.placeholder.com/200/44ff44?text=B"
];
const board = document.getElementById("board");
const timerEl = document.getElementById("timer");
let cards = [];
let revealed = [];
let matched = 0;
let startTime = null;
let timerInterval = null;

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    timerEl.textContent = `Tempo: ${seconds}s`;
  }, 1000);
}

function createCard(image, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.image = image;
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front" style="background-image: url('${image}')"></div>
      <div class="card-back"></div>
    </div>
  `;
  card.addEventListener("click", () => {
    if (revealed.length < 2 && !card.classList.contains("reveal") && !card.classList.contains("matched")) {
      card.classList.add("reveal");
      revealed.push(card);
      if (revealed.length === 2) checkMatch();
    }
  });
  return card;
}

function checkMatch() {
  const [card1, card2] = revealed;
  if (card1.dataset.image === card2.dataset.image) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matched += 1;
    if (matched === images.length) {
      clearInterval(timerInterval);
      setTimeout(() => alert("Você venceu!"), 500);
    }
    revealed = [];
  } else {
    setTimeout(() => {
      card1.classList.remove("reveal");
      card2.classList.remove("reveal");
      revealed = [];
    }, 2000);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initGame() {
  const imgPairs = [...images, ...images];
  shuffleArray(imgPairs);
  imgPairs.forEach((img, i) => {
    const card = createCard(img, i);
    board.appendChild(card);
    cards.push(card);
  });
  startTimer();
}

initGame();
