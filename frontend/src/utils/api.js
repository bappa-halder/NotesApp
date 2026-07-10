import axios from "axios";

const api = axios.create({
    baseURL: "https://notes-app-backend-weld.vercel.app",
    withCredentials: true
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config
        if (
            originalRequest && error.response?.status === 401 && !originalRequest._retry
        ) {
            originalRequest._retry = true

            try {
                const response = await axios.post("https://notes-app-backend-weld.vercel.app/user/refresh-token",
                    {},
                    {
                        withCredentials: true
                    }
                )
                const newAccessToken = response.data.accessToken
                localStorage.setItem("token", newAccessToken)
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return api(originalRequest)
            } catch (refreshError) {
                localStorage.removeItem("token")
                localStorage.removeItem("username")
                localStorage.removeItem('email')
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }

)

export default api