import { renderDeckView } from "./deck-view.js";
import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

const deckTemplate = document.querySelector("#deck-template");
const deckList = document.querySelector(".decks__list");
const homeSection = document.querySelector("#home");
const openDeckSection = document.querySelector("#open-deck");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");
const mainContent = document.querySelector(".page__main-content");

function createDeckEl(deckData) {
  const deckEl = deckTemplate.content.querySelector(".deck").cloneNode(true);
  deckEl.querySelector(".deck__title").textContent = deckData.name;
  deckEl.querySelector(".deck__count").textContent = `${deckData.cards.length} cards`;
  const color = hexToString(deckData.color);
  if (color) {
    deckEl.classList.remove("deck_color_green");
    deckEl.classList.add(`deck_color_${color}`);
  }
  const link = deckEl.querySelector(".deck__link");
  link.href = `#deck/${deckData.id}`;
  link.setAttribute("aria-label", `Open ${deckData.name}`);
  const deleteButton = deckEl.querySelector(".deck__delete-btn");
  deleteButton.setAttribute("aria-label", `Delete ${deckData.name} deck`);
  deleteButton.addEventListener("click", () => deckEl.remove());
  return deckEl;
}

function renderDeckEl(deckData) {
  deckList.prepend(createDeckEl(deckData));
}

decks.forEach(renderDeckEl);

function router() {
  const hash = window.location.hash.slice(1) || "home";
  openDeckSection.hidden = true;
  homeSection.hidden = true;
  carouselSection.hidden = true;
  notFoundSection.hidden = true;
  document.body.classList.remove("page_no-mobile-bar");
  mainContent.classList.remove("page__main-content_location_carousel");

  if (hash === "home") {
    homeSection.hidden = false;
  } else if (hash.startsWith("deck/")) {
    const deck = getDeckByID(hash.slice(5));
    if (deck) {
      openDeckSection.hidden = false;
      renderDeckView(deck);
    } else {
      notFoundSection.hidden = false;
    }
  } else if (hash.startsWith("carousel/")) {
    const deckID = hash.split("/")[1];
    const deck = getDeckByID(deckID);
    if (deck) {
      carouselSection.hidden = false;
      document.body.classList.add("page_no-mobile-bar");
      mainContent.classList.add("page__main-content_location_carousel");
      renderCarouselView(deck);
    } else {
      notFoundSection.hidden = false;
    }
  } else {
    notFoundSection.hidden = false;
  }
  if (!notFoundSection.hidden) document.body.classList.add("page_no-mobile-bar");
}

window.addEventListener("hashchange", router);
router();
