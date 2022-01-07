import { getChars } from './get.js';

export default async () => {
  const title = document.querySelector('.card-counter');
  const cards = await getChars();
  const cardsCount = cards.data;
  title.innerHTML = `<h1>You can find ${cardsCount.length} characters on this page!</h1>`;
};
