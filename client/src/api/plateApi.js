import axiosClient from './axiosClient'

const plateApi = {
    create: (boardId, params) => axiosClient.post(`boards/${boardId}/plates`, params),
    update: (boardId, plateId, params) => axiosClient.put(
        `boards/${boardId}/plates/${plateId}`,
        params
    ),
    getAll: () => axiosClient.get('plates'),
    delete: (boardId, plateId) => axiosClient.delete(`boards/${boardId}/plates/${plateId}`),
}

export default plateApi