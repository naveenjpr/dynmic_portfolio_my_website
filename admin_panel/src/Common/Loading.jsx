import React from 'react';

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center py-10 w-full h-full min-h-[200px]">
            <div className="relative flex justify-center items-center mb-4">
                <div className="absolute animate-ping w-16 h-16 rounded-full bg-yellow-500 opacity-20"></div>
                <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent border-b-yellow-500/30 rounded-full animate-spin z-10"></div>
            </div>
            <span className="text-yellow-500 font-medium tracking-widest text-sm animate-pulse">LOADING...</span>
        </div>
    );
}
