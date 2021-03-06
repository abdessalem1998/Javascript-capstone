import { popup, displayComments, fetchComment } from './modelApiMethods.js';
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

      const btn = document.createElement('button');
      btn.innerHTML = 'Comments';
      btn.addEventListener('click', () => {
        popup(character);
        const comments = document.getElementById('comments');
        comments.innerHTML = '';

        const divComment = document.createElement('div');
        divComment.classList.add('comment');

        const pComment = document.createElement('p');
        pComment.innerHTML = 'loading ...';

        divComment.appendChild(pComment);
        comments.appendChild(divComment);
        const appID = 'lOapMFXtQqVId3tniQD4';
        const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
        fetchComment(url, appID, character).then((response) => {
          displayComments(response);
        });
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
      like.innerHTML = `${likesArray[index].likes}`;
    });
    // add new like to the API and update like on the page
    const likeButtons = document.querySelectorAll('.fa-heart');
    likeButtons.forEach((like, index = 0) => {
      like.addEventListener('click', async () => {
        await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/3tZc2F1Bt1DjeUFt7vyK/likes', {
          method: 'POST',
          body: JSON.stringify({
            item_id: `item${index}`,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        likesArray = await getLikes();
        likesCount[index].innerHTML = `${likesArray[index].likes}`;
      });
    });
  });
};

export {
  displayCards,
  getChars,
};
