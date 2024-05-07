import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { BotResponseResult, MessageInputResponse, SearchedEngineers } from "./ChatWindow/MessageInput/MessageInput.types";


type AppState = {
    currentThread: string | null;
    setCurrentThread: (threadId: string | null) => void;
    messages: BotResponseResult[];
    addMessage: (message: BotResponseResult) => void;
    setMessages: (messages: BotResponseResult[]) => void;
    recentUserMessageId: string | null;
    setRecentUserMessageId: (messageId: string | null) => void;
    triggerText: string;
    setTriggerText: (text: string) => void;
    accuracyMode: "0" | "1" | "2",
    setAccuracyMode: (mode: "0" | "1" | "2") => void;
};

const useChatStore = create<AppState>((set) => ({
    currentThread: null,
    setCurrentThread: (threadId: string | null) => set({ currentThread: threadId }),
    addMessage: (message: BotResponseResult) => {
        console.log(`Adding message to thread: ${message.reply}`)
        set((state) => ({ messages: [...state.messages, message] }));
    },
    messages: [],
    setMessages: (messages: BotResponseResult[]) => set({ messages }),
    recentUserMessageId: null,
    setRecentUserMessageId: (messageId) => set({ recentUserMessageId: messageId }),
    triggerText: "",
    setTriggerText: (text) => set({ triggerText: text }),
    accuracyMode: "0",
    setAccuracyMode: (mode) => set({ accuracyMode: mode })
}))


type PersistedState = {
    engineers: Record<string, SearchedEngineers[]>
    setEngineers: (engineers: Record<string, SearchedEngineers[]>) => void;
    addEngineer: (engineer: SearchedEngineers[], id: string) => void;
}


export const useChatPersistedStore = create<PersistedState>()(
    devtools(
        persist(
            (set) => ({
                addEngineer: (engineer, id) => {
                    set((state) => ({ engineers: { ...state.engineers, [id]: engineer } }))
                },
                engineers: {},
                setEngineers: (engineers) => set({ engineers })
            }),
            {
                name: "chat-storage",
            }
        )
    )
);

export default useChatStore;