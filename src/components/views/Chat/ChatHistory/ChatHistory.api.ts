import { axiosInstance } from "@/utils/api"

export const getThreads = () => {
    return axiosInstance.get("/threads/").then(res => res.data)
}