import React from 'react'
import useChatStore from '../Chat.store'
import { cn } from '@/lib/utils';

const ChatControls = () => {
    const accuracyMode = useChatStore(state => state.accuracyMode);
    const setAccuracyMode = useChatStore(state => state.setAccuracyMode);
    return (
        <>
            <div className='w-full'>
                <div className='flex items-center gap-4 mb-4 pl-3'>
                    <button onClick={() => setAccuracyMode("0")} className={cn("relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50", accuracyMode === "0" && "ring-2 ring-slate-400 ring-offset-2 ring-offset-slate-50")}>
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-10 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                            More Precise
                        </span>
                    </button>
                    <button onClick={() => setAccuracyMode("1")} className={cn("relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50", accuracyMode === "1" && "ring-2 ring-slate-400 ring-offset-2 ring-offset-slate-50")}>
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-10 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                            More Balanced
                        </span>
                    </button>
                    <button onClick={() => setAccuracyMode("2")} className={cn("relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50", accuracyMode === "2" && "ring-2 ring-slate-400 ring-offset-2 ring-offset-slate-50")}>
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-10 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                            More Creative
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ChatControls