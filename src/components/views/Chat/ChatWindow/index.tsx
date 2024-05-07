import React, { useEffect } from 'react'
import MessageInput from './MessageInput'
import useChatStore, { useChatPersistedStore } from '../Chat.store'
import { BotResponseResult } from './MessageInput/MessageInput.types'
import { cn } from '@/utils/cn'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useQuery } from '@tanstack/react-query'
import { getThreadsMessages } from './ChatWidow.api'
import { ThreadDataResponse } from './ChatWindow.types'
import { Ellipsis, Loader2, LogOut } from 'lucide-react'
import { EngineersTable } from './EngineersTable'
import { TypeAnimation } from "react-type-animation";
import { Skeleton } from '@/components/ui/skeleton'
import useAppStore from '@/store'
import { useRouter } from 'next/router'


const MessageItem = ({ data, loader }: { data?: BotResponseResult, loader?: boolean }) => {
    const engineersById = useChatPersistedStore(state => state.engineers);
    const engineers = engineersById[data?.id ?? ""] ?? [];
    return (
        <div className={cn('w-full text-white flex justify-start my-6')}>
            <div className='flex items-start gap-2'>
                <Avatar>
                    <AvatarImage src={(data?.role !== "user" || loader) ? "https://github.com/shadcn.png" : ""} />
                    <AvatarFallback>PS</AvatarFallback>
                </Avatar>
                <div>
                    <div className='text-sm font-semibold'>{(data?.role !== "user" || loader) ? "Bot" : "You"}</div>
                    {loader ? <div className='mt-1'>
                        <Ellipsis className='h-6 animate-pulse ' />
                    </div> : <div className='mt-1'>{data?.reply}</div>}
                    {engineers && engineers?.length > 0 && <div className='mt-4'>
                        <EngineersTable records={engineers} />
                    </div>}
                </div>
            </div>
        </div >
    )
}

const MessageSKeleton = () => {
    return (
        <div className={cn('w-full text-white flex justify-start my-6')}>
            <div className='flex items-start gap-2'>
                <Skeleton className='w-[40px] h-[40px] rounded-full' />
                <div>
                    <Skeleton className='text-sm font-semibold h-4 w-12' />
                    <Skeleton className='text-sm font-semibold h-6 mt-1 w-[250px]' />
                </div>
            </div>
        </div >
    )
}

const ChatWindow = () => {
    const messages = useChatStore(state => state.messages);
    const setMessages = useChatStore(state => state.setMessages)
    const triggerText = useChatStore(state => state.triggerText);
    const recentMessageId = useChatStore(state => state.recentUserMessageId);
    const currentThread = useChatStore(state => state.currentThread);
    console.log('Current thread', currentThread)
    console.log(messages, currentThread)
    const { data, isRefetching, isLoading, isError } = useQuery({
        queryKey: ["threads", currentThread ?? ""],
        enabled: !!currentThread,
        queryFn: () => getThreadsMessages(currentThread as string),
        refetchInterval: false,
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,

    })

    const threadsMessages = data as ThreadDataResponse;

    console.log(threadsMessages, 'Thread Messages')

    useEffect(() => {
        if (!threadsMessages) {
            setMessages([])
            return;
        }
        setMessages(threadsMessages?.botresponse?.response?.messages?.reverse() ?? []);
    }, [threadsMessages?.thread_id])

    const isLastTextLoader = recentMessageId === messages?.[messages?.length - 1]?.id;

    const LoadingSkeleton = () => {
        return (
            <div className='space-y-4'>
                <MessageSKeleton />
                <MessageSKeleton />
                <MessageSKeleton />
                <MessageSKeleton />
                <MessageSKeleton />
                <MessageSKeleton />
                <MessageSKeleton />
            </div>
        )
    }

    const router = useRouter();

    const logout = useAppStore(state => state.logout)

    const handleLogout = () => {
        logout();
        setTimeout(() => {
            router.push("/")
        })
    }
    return (
        <div className='w-full relative min-h-[97vh] px-6 gap-5 flex py-6 justify-between flex-col'>
            <div className='absolute right-0 top-5'>
                <div onClick={handleLogout} className='w-[40px] h-[40px] transition-all text-red-400 flex cursor-pointer hover:bg-red-500 hover:text-white items-center justify-center rounded-full bg-red-500/20'>
                    <LogOut className='h-4  w-4' />
                </div>
            </div>
            <div className='h-full max-h-[75vh] py-3 overflow-y-auto'>
                {
                    currentThread && (isLoading && !isRefetching) ? <LoadingSkeleton /> : messages?.map(item => (
                        <MessageItem data={item} key={item.id} />
                    ))
                }
                {
                    isLastTextLoader && <MessageItem loader />
                }
            </div>
            <div className=' shrink-0'>
                <MessageInput />
            </div>

        </div>
    )
}

export default ChatWindow