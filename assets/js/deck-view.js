const section = document.querySelector("#open-deck");
const template = document.querySelector("#flashcard-template");
const list = section.querySelector(".decks__list");

function createCard(card, deck) {
  const element = template.content.firstElementChild.cloneNode(true);
  const title = element.querySelector(".deck__title");
  let showingAnswer = false;
  element.style.backgroundColor = deck.color;
  title.textContent = card.question;
  element.querySelector(".deck__flip").addEventListener("click", () => {
    showingAnswer = !showingAnswer;
    title.textContent = showingAnswer ? card.answer : card.question;
    element.style.backgroundColor = showingAnswer ? "white" : deck.color;
  });
  element.querySelector(".deck__delete-btn").addEventListener("click", () => element.remove());
  return element;
}

export function renderDeckView(deck) {
  section.querySelector(".decks__title").textContent = deck.name;
  section.querySelector(".decks__practice").href = "#carousel/" + deck.id;
  list.replaceChildren(...deck.cards.map(card => createCard(card, deck)));
}
