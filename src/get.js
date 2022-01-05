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
        popup(character);
        const comments = document.getElementById('comments');
        comments.innerHTML='';

        const divComment = document.createElement('div');
        divComment.classList.add('comment');

        const pComment = document.createElement('p');
        pComment.innerHTML="hello";

        divComment.appendChild(pComment);
        comments.appendChild(divComment);
        const appID = 'lOapMFXtQqVId3tniQD4';
        const url= 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
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
  });
};

const popup = (character) => {
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


  const commentContainer = document.getElementById('commentContainer');
  commentContainer.innerHTML  =`<h2 class="info-title">Add a comment</h2>
  <input type="text" required id="name" name="input" class="input">
  <textarea name="name" id="textComment" rows="8" cols="80" class="text-input"></textarea>`;

  const btn2 = document.createElement('button');
  btn2.innerHTML ='Comment';
  btn2.classList.add('btn');

  //commentContainer.appendChild(infoTitle);
  commentContainer.appendChild(btn2);
  //btn
  const btn = document.getElementById('comment');
  btn2.addEventListener('click', () => {
    const appID = 'lOapMFXtQqVId3tniQD4';
    const url= 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
    submitcomment(url, appID, character);
    alert('hi');
  });
};

export const submitcomment = async (url, appID, character) => {
  const name = document.getElementById('name').value;
  const comment = document.getElementById('textComment').value;
  const response = await fetch(`${url}${appID}/comments/`, {
  method: 'POST',
  body: JSON.stringify({
    item_id: `${character._id}`,
    username: `${name}`,
    comment: `${comment}`,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  });
  fetchComment(url, appID, character).then((response) => {
    console.log(response);
    displayComments(response);
  });
};

export const fetchComment = async (url, appID, character) => {
  const response = await fetch(`${url}${appID}/comments?item_id=${character._id}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const jsonRespnse = await response.json() ;
  return jsonRespnse;
};

export const displayComments = async (response) => {
  const comments = document.getElementById('comments');
  comments.innerHTML='';
  for (let i = 0; i < response.length; i += 1) {
    const divComment = document.createElement('div');
    divComment.classList.add('comment');

    const pComment = document.createElement('p');
    divComment.classList.add('pcomment');
    pComment.innerHTML=`${response[i].creation_date} ${response[i].username} : ${response[i].comment}`;

    divComment.appendChild(pComment);
    comments.appendChild(divComment);
  }
};
