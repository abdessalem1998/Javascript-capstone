const getLikes = async () => {
  const info = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/kIjGJySERmpdtnGfDL4M/likes');
  const json = await info.json();
  return json;
};

const postLikes = async (character) => {
  const info = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/kIjGJySERmpdtnGfDL4M/likes', {
    method: 'POST',
    body: JSON.stringify({
      item_id: character._id,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return info.ok;
};

export { getLikes, postLikes };