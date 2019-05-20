import http from './http';

async function getComics() {
  return await http('v1/public/comics')
}

async function getComicById(id) {
  return await http(`v1/public/comics/${id}`)
}

export default {
  getComics,
  getComicById,
}