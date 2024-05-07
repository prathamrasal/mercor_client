import { axiosInstance } from "@/utils/api"

export const sendMessage = ({ message, queryMode = "0", ...others }: { message: string, thread_id?: string, queryMode?: string }) => {
    return axiosInstance.post("/threads/message", {
        message, queryMode, ...others
    }).then(res => res.data)
}