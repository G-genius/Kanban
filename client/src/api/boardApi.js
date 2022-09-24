import axiosClient from './axiosClient'

const boardApi = {
  create: () => axiosClient.post('boards'),
  getAll: () => axiosClient.get('boards'),
  getOne: (id) => axiosClient.get(`boards/${id}`),
  update: (id, params) => axiosClient.put(`boards/${id}`, params),
}

export default boardApi