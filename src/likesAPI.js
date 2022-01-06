export default async () => {
  const info = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/3tZc2F1Bt1DjeUFt7vyK/likes');
  const json = await info.json();
  return json;
};