import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { authSelector } from '../store/auth-slice'

const Nav: React.FC = () => {

    const navigate = useNavigate()

    const { user } = useSelector(authSelector)

    return (
        <div className='w-full p-4 flex items-center justify-between'>
            <div
                onClick={() => navigate("/")}
                className='w-max flex-center cursor-pointer'>
                <img
                    className='w-8'
                    src="/images/logo.png"
                    alt="logo" />
                <span className='font-bold ml-2'>Passkeeper</span>
            </div>

            {
                user
                &&
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-sky-50 text-sky-500 rounded-full flex-center font-bold text-2xl capitalize">
                        {user.name.split("")[0]}
                    </div>
                    <span className='capitalize text-gray-400 ml-2'>
                    {user.name}
                    </span>
                </div>
            }
        </div>
    )
}

export default Nav