import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ChevronDown, Send, Sparkles } from "lucide-react";
import React, { useEffect } from "react";
import ChatHistory from "./ChatHistory";
import ChatWindow from "./ChatWindow";
import useChatStore from "./Chat.store";
import useAppStore from "@/store";
import { useRouter } from "next/router";



const ChatPage = () => {
    const authData = useAppStore(state => state.authData);
    const router = useRouter();

    useEffect(() => {
        if (!authData?.token) {
            router.push("/")
        }
    }, [])

    const setCurrentThread = useChatStore(state => state.setCurrentThread)
    return (
        <div className="min-h-screen max-h-screen bg-[#161616] w-full">
            <div className="w-full px-8 py-2 h-full grid grid-cols-[1.4fr_4fr]">
                <div className="px-3 pr-8 py-5 max-h-[98vh] min-h-[98vh] border-r border-gray-800">
                    <div onClick={() => setCurrentThread(null)} className="w-full mb-5 px-5 py-3.5 hover:bg-[#3c3d3e] transition-all bg-[#26292B] rounded-3xl flex items-center  justify-between">
                        <div className="flex items-center text-white gap-4">
                            <Sparkles className="h-5 w-5 text-purple-400 font-medium" />
                            Mercor Chat AI
                        </div>
                        <div className="h-[28px] w-[28px] bg-[#3c3d3e] flex items-center justify-center rounded-full">
                            <ChevronDown className="h-4 w-4 text-white" />
                        </div>
                    </div>
                    <ChatHistory />
                </div>
                <div className="w-full h-full">
                    <ChatWindow />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
