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
  ["imgs/21.png", "imgs/2025.png"]
];

// Imagens de back por coluna
const backImages = [
  "imgs/logo1.png",
  "imgs/logo2.png",
  "imgs/logo3.png",
  "imgs/logo4.png"
];

// Função para obter o índice da coluna
function getColumnIndex(index, columns) {
  return index % columns;
}

const board = document.getElementById("game-board");
let flippedCards = [];
let matchedCards = 0;

// Escolher pares aleatórios com base na quantidade de pares desejada
function generateRandomPairs(numPairs) {
  const selectedPairs = imagePairs.slice(0, numPairs);
  const cards = [];

  selectedPairs.forEach((pair, index) => {
    pair.forEach((image) => {
      cards.push({
        id: index,
        image: image
      });
    });
  });

  return shuffle(cards);
}

// Embaralhar array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Criar cartas no tabuleiro
function createBoard(numPairs) {
  board.innerHTML = "";
  matchedCards = 0;
  const cards = generateRandomPairs(numPairs);
  const numColumns = 4; // Altere se seu tabuleiro tiver outro número de colunas

  cards.forEach((card, i) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("memory-card");

    const cardFront = document.createElement("img");
    cardFront.classList.add("front-face");
    cardFront.src = card.image;

    const cardBack = document.createElement("img");
    cardBack.classList.add("back-face");
    const coluna = getColumnIndex(i, numColumns);
    cardBack.src = backImages[coluna];

    cardElement.appendChild(cardFront);
    cardElement.appendChild(cardBack);

    cardElement.dataset.id = card.id;

    cardElement.addEventListener("click", flipCard);

    board.appendChild(cardElement);
  });
}

// Lógica de virar carta
function flipCard() {
  if (this.classList.contains("flip") || flippedCards.length === 2) return;

  this.classList.add("flip");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.id === card2.dataset.id;

    if (isMatch) {
      matchedCards += 2;
      flippedCards = [];

      if (matchedCards === parseInt(document.getElementById("pair-count").value) * 2) {
        setTimeout(() => alert("Parabéns! Você completou o jogo!"), 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        flippedCards = [];
      }, 1000);
    }
  }
}

// Iniciar o jogo
document.getElementById("start-btn").addEventListener("click", () => {
  const numPairs = parseInt(document.getElementById("pair-count").value);
  createBoard(numPairs);
});

// Criar tabuleiro inicial com 6 pares (opcional)
createBoard(6);
