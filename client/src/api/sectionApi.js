import axiosClient from './axiosClient'

const sectionApi = {
    create: (boardId) => axiosClient.post(`boards/${boardId}/sections`),
    update: (boardId, sectionId, params) => axiosClient.put(
        `boards/${boardId}/sections/${sectionId}`,
        params
    ),
    getAll: () => axiosClient.get('sections'),
    delete: (boardId, sectionId) => axiosClient.delete(`boards/${boardId}/sections/${sectionId}`)
}

export default sectionApi