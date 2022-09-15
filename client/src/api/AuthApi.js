import axiosClient from "./axiosClient";

const AuthApi = {
    signup: params => axiosClient.post('auth/signup', params),
    login: params => axiosClient.post('auth/login', params),
    verifyToken: () => axiosClient.post('auth/verify-token')
}

export default AuthApi