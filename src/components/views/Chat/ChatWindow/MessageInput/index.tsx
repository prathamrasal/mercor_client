import { cn } from '@/utils/cn'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { sendMessage } from './MessageInput.api'
import useChatStore, { useChatPersistedStore } from '../../Chat.store'
import { MessageInputResponse } from './MessageInput.types'
import toast from 'react-hot-toast'
import ChatControls from '../../Controls'

const MessageInput = () => {
    const [messageText, setMessageText] = useState("");
    const recentUserMessageId = useChatStore(state => state.recentUserMessageId);
    const setRecentUserMessageId = useChatStore(state => state.setRecentUserMessageId);
    const currentThread = useChatStore(state => state.currentThread);
    const setCurrentThread = useChatStore(state => state.setCurrentThread);
    const addMessageToThread = useChatStore(state => state.addMessage);
    const queryClient = useQueryClient();
    const addEngineer = useChatPersistedStore(state => state.addEngineer);
    const accuracyMode = useChatStore(state => state.accuracyMode);

    const { mutate: sendMessageMutationFn, isPending } = useMutation({
        mutationFn: sendMessage,
        onSuccess: (data) => {
            const responseData = data as MessageInputResponse
            setMessageText('');
            if (currentThread === null) {
                queryClient.refetchQueries({
                    queryKey: ['threads']
                });
                setCurrentThread(responseData?.botResponse?.thread_id)
            }
            setRecentUserMessageId(null);
            addMessageToThread(responseData.botResponse.response);
            addEngineer(responseData?.engineers ?? [], responseData?.botResponse?.response?.id)
        },
        onError: () => {
            toast.error("Failed to send message!")
        }
    })
    const handleSend = (e: any) => {
        e?.preventDefault?.()
        if (!messageText) {
            return;
        }
        setMessageText("")
        const newMessageid = Date.now().toString();
        setRecentUserMessageId(newMessageid)
        addMessageToThread({
            role: "user",
            reply: messageText,
            id: newMessageid
        })
        const payload: any = {
            message: messageText,
            queryMode: accuracyMode

        }
        if (currentThread) {
            payload.thread_id = currentThread
        }
        sendMessageMutationFn(payload);
    }

    return (
        <div className='mt-3 h-full w-full'>
            <ChatControls />
            <form onSubmit={handleSend} className="w-full relative flex items-center">
                <input value={messageText} onChange={(e) => setMessageText(e.target.value)} placeholder='Enter your message' className={
                    cn("w-full text-sm focus:border-none focus:border-0 focus:ring-2 focus:outline-0 py-4 text-white  bg-[#292C2E] px-4 rounded-3xl",
                    )
                } />
                <button type='submit' className="w-[32px] absolute right-3 h-[32px] rounded-full bg-[#161616] flex items-center justify-center">
                    {
                        isPending ? (<Loader className='h-4 w-4 text-white animate-spin' />) : <Send className="h-4 w-4 text-white" />
                    }
                </button>
            </form>
        </div>
    )
}

export default MessageInput