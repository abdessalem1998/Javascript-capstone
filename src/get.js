import getLikes from './likesAPI.js';

const getChars = async () => {
  const info = await fetch('https://api.disneyapi.dev/characters');
  const json = await info.json();
  return json;
};

const displayCards = async () => {
  const container = document.querySelector('main');
  const likesArray = await getLikes();
  getChars().then((json) => {
    const infoArr = json.data;
    infoArr.forEach((character) => {
      const card = document.createElement('div');
      card.classList.add('card-container');

      const cardImage = document.createElement('img');
      cardImage.src = character.imageUrl;
      cardImage.alt = character.name;

      const subcard = document.createElement('div');
      subcard.classList.add('title');

      const title = document.createElement('h2');
      title.innerHTML = character.name;

      const likes = document.createElement('div');
      likes.classList.add('likes');

      const is = document.createElement('i');
      is.classList.add('far');
      is.classList.add('fa-heart');

      const span = document.createElement('span');
      span.classList.add('likes-counter');

      const btn = document.createElement('button');
      btn.innerHTML = 'Comments';
      btn.addEventListener('click', () => {
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
        const span = document.getElementsByClassName('close')[0];
        span.onclick = () => {
          modal.style.display = 'none';
        };
      });

      likes.appendChild(is);
      likes.appendChild(span);

      subcard.appendChild(title);
      subcard.appendChild(likes);

      card.appendChild(cardImage);
      card.appendChild(subcard);
      card.appendChild(btn);

      container.appendChild(card);
    });
    const likesCount = document.querySelectorAll('.likes-counter');
    likesCount.forEach((like, index) => {
      like.innerHTML = `<span>${likesArray[index].likes}</span>`;
    });
  });
};

export {
  displayCards,
  getChars,
};
