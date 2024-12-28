import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { authSelector, modifyUser } from '../store/auth-slice'
import { logout as logoutUser } from "../api"
import { toast } from 'react-toastify'

const Nav: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector(authSelector)

    const logout = async () => {
        try {
            await logoutUser()
            dispatch(modifyUser({ isAuth: false, user: null }))
            toast.success("You have been logged out")
        } catch (error:any) {
            toast.error(error.response.data.message || "Internal server error")
        }
    }

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
                <div
                    onClick={logout}
                    className="flex items-center cursor-pointer">
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