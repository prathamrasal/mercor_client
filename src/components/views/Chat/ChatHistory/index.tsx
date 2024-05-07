import { useQuery } from "@tanstack/react-query";
import { getThreads } from "./ChatHistory.api";
import { Thread, ThreadsResponse } from "./ChatHistory.types";
import { Skeleton } from "@/components/ui/skeleton";
import useChatStore from "../Chat.store";
import { cn } from "@/utils/cn";

const ChatItem = ({ thread }: { thread: Thread }) => {
    const currentThread = useChatStore(state => state.currentThread);
    const setCurrentThread = useChatStore(state => state.setCurrentThread);
    return (
        <div onClick={() => setCurrentThread(thread.thread_id)} className={
            cn("px-5 py-3.5 pb-4 rounded-xl w-full bg-[#292C2E] border cursor-pointer hover:bg-[#212325] border-transparent",
                currentThread === thread.thread_id && "border-gray-300"
            )
        }>
            <div className="text-xs text-gray-500">Today</div>
            <div className="mt-2 text-sm text-white leading-6 tracking-normal">
                {thread?.last_message}
            </div>
        </div>
    );
};

export default function ChatHistory() {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['threads'],
        queryFn: getThreads,
        refetchOnMount: false,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    })
    const threadsData = data as ThreadsResponse


    return (
        <div className="max-h-[79vh] space-y-3 overflow-y-auto">
            {
                isLoading ? (
                    <>
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </>
                ) : isError ? (
                    <div className="my-14 text-red-300">Something went wrong!</div>
                ) : (
                    <>
                        {
                            threadsData?.threads?.map((thread, idx) => (
                                <ChatItem key={idx} thread={thread} />
                            ))
                        }
                    </>
                )
            }
        </div >
    )
}