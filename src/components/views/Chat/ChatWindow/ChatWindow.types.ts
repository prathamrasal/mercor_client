import { BotResponseResult } from "./MessageInput/MessageInput.types"

export interface ThreadDataResponse {
    botresponse: {
        response: {
            messages: BotResponseResult[]
        },
        thread_id: string
    },
    thread_id?: string;
}

