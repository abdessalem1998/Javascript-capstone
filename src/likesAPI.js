export default async () => {
  const info = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/kIjGJySERmpdtnGfDL4M/likes');
  const json = await info.json();
  return json;
};