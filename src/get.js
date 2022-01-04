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
      container.innerHTML += `<div class="card-container">
            <img src="${character.imageUrl}" alt="${character.name}">
            <div class="title">
                <h2>${character.name}</h2>
                <div class="likes">
                    <i class="far fa-heart"></i>
                    <span></span>
                </div>
            </div>
            <button>Comments</button>
        </div>`;
    });
  });
};