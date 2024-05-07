import { axiosInstance } from "@/utils/api"

export const getThreadsMessages = (threadId: string) => {
    return axiosInstance.get(`/threads/${threadId}`).then(res => res.data)
}