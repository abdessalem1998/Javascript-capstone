import getLikes from './likesAPI.js';

const getChars = async () => {
  const info = await fetch('https://api.disneyapi.dev/characters');
  const json = await info.json();
  return json;
};

const displayCards = async () => {
  const container = document.querySelector('main');
  let likesArray = await getLikes();
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
      const likesCount = document.querySelectorAll('.likes-counter');
      likesCount.forEach((like, index) => {
        like.innerHTML = `<span>${likesArray[index].likes} likes</span>`;
      });

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
    const icons = document.querySelectorAll('i');
    icons.forEach((icon, index) => {
      icon.addEventListener('click', async () => {
        // eslint-disable-next-line no-underscore-dangle
        const charId = infoArr[index - 1]._id;
        await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/kIjGJySERmpdtnGfDL4M/likes', {
          method: 'POST',
          body: JSON.stringify({
            item_id: charId,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        const likesSpan = document.querySelectorAll('.likes-counter');
        likesArray = await getLikes();
        likesSpan[index - 1].innerHTML = `<span>${likesArray[index - 1].likes} likes</span>`;
      });
    });
  });
};

export {
  displayCards,
  getChars,
};
