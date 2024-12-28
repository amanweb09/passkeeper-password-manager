import React from 'react'
import { VscLoading } from "react-icons/vsc"

const Loading: React.FC = () => {
    return (
        <div className='w-full h-screen py-10 flex-center'>
            <div className="flex-center flex-col">
                <VscLoading className='spin text-5xl text-sky-500' />
                <span className='block text-gray-400 mt-2'>Awesomeness Loading...</span>
            </div>
        </div>
    )
}

export default Loading