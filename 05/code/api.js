import http from './http';

async function getComics() {
  console.log('getting Comics!')
  return await http('v1/public/comics')
}

async function getComicById(id) {
  return await http(`v1/public/comics/${id}`)
}

async function getComicCharacters(id) {
  return await http(`v1/public/comics/${id}/characters`)
}

async function getHeroById(id) {
  return await http(`v1/public/characters/${id}`)
}

async function getComicByHeroId(id) {
  return await http(`v1/public/characters/${id}/comics`)
}

export default {
  getComics,
  getComicById,
  getComicCharacters,
  getHeroById,
  getComicByHeroId
}