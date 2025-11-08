import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  const fakeNote = {
    id: 9999,
    content: 'this is a fake note added by the frontend',
    important: true
  }
  return request.then(response => response.data.concat(fakeNote))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteNote = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data).catch(error => {
    throw error
  })
}

export default { getAll, create, update, deleteNote }