export interface ThreadsResponse {
    threads: Thread[]
}

export interface Thread {
    thread_id: string
    last_message: string
}
