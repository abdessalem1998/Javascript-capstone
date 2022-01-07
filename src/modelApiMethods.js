export const fetchComment = async (url, appID, character) => {
  /* eslint-disable no-underscore-dangle */
  const response = await fetch(`${url}${appID}/comments?item_id=${character._id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const jsonRespnse = await response.json();
  return jsonRespnse;
};

export const commentCounter = (response) => {
  /* eslint-disable no-else-return */
  if (response.length > 0) {
    return response.length;
  } else {
    return 0;
  }
};

export const displayComments = async (response) => {
  const i = commentCounter(response);
  const cmtNumber = document.getElementById('cmtNumber');
  cmtNumber.innerHTML = i;

  const comments = document.getElementById('comments');
  comments.innerHTML = '';
  for (let i = 0; i < response.length; i += 1) {
    const divComment = document.createElement('div');
    divComment.classList.add('comment');

    const pComment = document.createElement('p');
    divComment.classList.add('pcomment');
    pComment.innerHTML = `${response[i].creation_date} ${response[i].username} : ${response[i].comment}`;

    divComment.appendChild(pComment);
    comments.appendChild(divComment);
  }
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
    displayComments(response);
    document.getElementById('name').value = '';
    document.getElementById('textComment').value = '';
  });
  return response;
};

export const popup = (character) => {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
  const span = document.getElementsByClassName('close')[0];
  span.onclick = () => {
    modal.style.display = 'none';
  };
  const modalImage = document.getElementById('model-image');
  modalImage.src = character.imageUrl;

  const modalTitle = document.getElementById('info-title');
  modalTitle.innerHTML = character.name;

  const film = document.getElementById('films');
  film.innerHTML = `films : ${character.films}`;

  const show = document.getElementById('show');
  show.innerHTML = `Tv shows : ${character.tvShows}`;

  const game = document.getElementById('game');
  game.innerHTML = `game : ${character.videoGames}`;

  const parkAttractions = document.getElementById('parkAttractions');
  parkAttractions.innerHTML = `ParkAttractions : ${character.parkAttractions}`;

  const commentContainer = document.getElementById('commentContainer');
  commentContainer.innerHTML = `<h2 class="info-title">Add a comment</h2>
  <input type="text" id="name" name="input" class="input" placeholder="Your Name" required>
  <textarea name="name" id="textComment" rows="8" cols="80" class="text-input" placeholder="Say something nice..." required></textarea>`;

  const btn2 = document.createElement('button');
  btn2.innerHTML = 'Comment';
  btn2.classList.add('btn');

  commentContainer.appendChild(btn2);
  // btn
  btn2.addEventListener('click', () => {
    const appID = 'lOapMFXtQqVId3tniQD4';
    const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
    submitcomment(url, appID, character);
  });
};
