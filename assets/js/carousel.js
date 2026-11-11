import { hexToString, removeColorClasses } from "./colors.js";

const carouselTitle = document.querySelector(".carousel__title");
const carouselCard = document.querySelector(".carousel__card");
const carouselCardText = document.querySelector(".carousel__card-text");
const leftButton = document.querySelector(".carousel__btn_type_left");
const rightButton = document.querySelector(".carousel__btn_type_right");
const flipButton = document.querySelector(".carousel__btn_type_flip");

let activeDeck = null;
let currentIndex = 0;
let showingQuestion = true;

function getCarouselTitleString(deck, index) {
  return `${deck.name} · ${index + 1}/${deck.cards.length}`;
}

function updateDisplay() {
  if (!activeDeck || !activeDeck.cards.length) return;
  const card = activeDeck.cards[currentIndex];
  carouselTitle.textContent = getCarouselTitleString(activeDeck, currentIndex);
  carouselCardText.textContent = showingQuestion ? card.question : card.answer;
  carouselCard.classList.toggle("carousel__card_color_white", !showingQuestion);
  leftButton.disabled = currentIndex === 0;
  rightButton.disabled = currentIndex === activeDeck.cards.length - 1;
  leftButton.classList.toggle("carousel__btn_disabled", leftButton.disabled);
  rightButton.classList.toggle("carousel__btn_disabled", rightButton.disabled);
}

export function renderCarouselView(deck) {
  activeDeck = deck;
  currentIndex = 0;
  showingQuestion = true;
  removeColorClasses(carouselCard);
  const color = hexToString(deck.color);
  if (color) carouselCard.classList.add(`carousel__card_color_${color}`);
  updateDisplay();
}

leftButton.addEventListener("click", () => {
  if (activeDeck && currentIndex > 0) {
    currentIndex -= 1;
    showingQuestion = true;
    updateDisplay();
  }
});
rightButton.addEventListener("click", () => {
  if (activeDeck && currentIndex < activeDeck.cards.length - 1) {
    currentIndex += 1;
    showingQuestion = true;
    updateDisplay();
  }
});
flipButton.addEventListener("click", () => {
  showingQuestion = !showingQuestion;
  updateDisplay();
});
