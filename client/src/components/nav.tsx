import React from 'react'
import { useNavigate } from "react-router-dom"

const Nav: React.FC = () => {

    const navigate = useNavigate()

    return (
        <div className='w-full p-4 flex items-center'>
            <div
                onClick={() => navigate("/")}
                className='w-max flex-center cursor-pointer'>
                <img
                    className='w-8'
                    src="/images/logo.png"
                    alt="logo" />
                <span className='font-bold ml-2'>Passkeeper</span>
            </div>
        </div>
    )
}

export default Nav