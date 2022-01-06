import { getChars } from './get.js';

export default async () => {
  const title = document.querySelector('.card-counter');
  const cards = await getChars();
  const cardsCount = cards.data;
  title.innerHTML = `<h1>This page contains ${cardsCount.length} characters</h1>`;
};