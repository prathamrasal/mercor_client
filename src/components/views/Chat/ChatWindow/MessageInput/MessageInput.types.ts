export interface MessageInputResponse {
    botResponse: {
        response: BotResponseResult
        thread_id: string
    }
    engineers?: SearchedEngineers[]
}

export interface BotResponseResult {
    budget?: string
    availability?: string
    skills?: any[]
    keywords?: any[]
    reply?: string,
    inComplete?: boolean;
    role: "assistant" | "user",
    id: string;
}

export interface SearchedEngineers {
    resumeId: string
    userId: string
    name: string
    email: string
    phone: string
    fullTimeStatus: string
    workAvailability: string
    fullTimeSalaryCurrency: string
    fullTimeSalary: string
    partTimeSalaryCurrency: string
    partTimeSalary: string
    fullTimeAvailability?: number
    partTimeAvailability: any
    preferredRole: string
    WorkExperience?: string
    Education: string
    Skills: string
    location: string
}
