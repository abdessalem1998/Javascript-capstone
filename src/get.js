const getChars = async () => {
  const info = await fetch('https://api.disneyapi.dev/characters');
  const json = await info.json();
  return json;
};

export default () => {
  const container = document.querySelector('main');
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

      const btn = document.createElement('button');
      btn.innerHTML = 'Comments';
      btn.addEventListener('click', () => {
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
        const span = document.getElementsByClassName('close')[0];
        span.onclick = function () {
          modal.style.display = 'none';
        };
        const modalImage = document.getElementById('model-image');
        modalImage.src =character.imageUrl;

        const modalTitle = document.getElementById('info-title');
        modalTitle.innerHTML =character.name;

        const film = document.getElementById('films');
        film.innerHTML =`films : ${character.films}`;

        const show = document.getElementById('show');
        show.innerHTML =`Tv shows : ${character.tvShows}`;

        const game = document.getElementById('game');
        game.innerHTML =`game : ${character.videoGames}`;

        const parkAttractions = document.getElementById('parkAttractions');
        parkAttractions.innerHTML =`ParkAttractions : ${character.parkAttractions}`;
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
  });
};
