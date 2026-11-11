# Flashcard App

A study app built during TripleTen's AI Software Engineering program. It displays a collection of flashcard decks and lets you open a deck to review its cards in a carousel.

## Features

- Browse decks with their names, colors, and card counts.
- Open a deck, move between its cards, and flip a card to see the other side.
- Remove a deck from the current page.
- Navigate between the deck list and carousel using URL hashes. Unknown routes show a 404 message.

The New Deck button is present in the interface but does not create a deck yet. Removing a deck affects the current page only.

## Technologies used

- HTML for the page structure and card template
- CSS and BEM class names for the layout and visual states
- JavaScript modules for deck data, routing, and carousel interactions

## Run locally

Clone the repository and open the project folder. Start a local web server from that folder because the app loads JavaScript modules:

```sh
python3 -m http.server 8000
```

Visit http://localhost:8000/ in your browser. A current browser and Python 3 are sufficient. No package installation or build step is needed.

## Project structure

- `index.html` is the application entry point.
- `assets/css/style.css` contains the styles.
- `assets/js/index.js` renders decks and handles navigation.
- `assets/js/carousel.js` handles the carousel.
- `assets/js/decks.js` contains the sample deck data.
