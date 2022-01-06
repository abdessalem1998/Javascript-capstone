import { getChars } from './get.js';

const title = document.querySelector('.card-counter');

export default async () => {
  const cards = await getChars();
  const cardsCount = cards.data;
  title.innerHTML = `<h1>This page contains ${cardsCount.length} characters</h1>`;
};