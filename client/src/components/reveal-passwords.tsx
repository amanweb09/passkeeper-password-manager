import React, { useState } from 'react'
import { CiLock } from 'react-icons/ci'
import { Credentials } from '../types'
import { toast } from 'react-toastify'
import { getPasswords } from '../api'
import { useDispatch } from 'react-redux'
import { modifyMasterPassword } from '../store/auth-slice'

interface IPropTypes {
    setCredentials: React.Dispatch<React.SetStateAction<Credentials[]>>,
}

const RevealPasswords: React.FC<IPropTypes> = ({ setCredentials }) => {
    const dispatch = useDispatch()
    const [masterPassword, setMasterPassword] = useState<string>("")

    const fetchPasswords = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (!masterPassword.length) return toast.error("Please enter your password")

        try {
            const { data } = await getPasswords(masterPassword)
            dispatch(modifyMasterPassword({ masterPassword }))
            setCredentials(data.vault)
        } catch (error: any) {
            toast.error(error.response.data.message || "Internal server error")
        }
    }

    return (
        <div className="inset-0 z-50 fixed flex-center bg-white">
            <div className="w-max p-8 rounded-md shadow-lg flex-center flex-col">
                <div className='w-max mb-6 flex-center cursor-pointer'>
                    <img
                        className='w-8'
                        src="/images/logo.png"
                        alt="logo" />
                    <span className='font-bold ml-2'>Passkeeper</span>
                </div>
                <h3 className='text-gray-500 font-semibold'>
                    Enter Password to reveal your passwords
                </h3>
                <p className='italic text-gray-400 text-sm'>This ensures your passwords are safe!</p>
                <div className='flex items-center mt-8'>
                    <CiLock className='w-12 text-3xl text-gray-500' />
                    <input
                        onChange={(e) => setMasterPassword(e.target.value)}
                        value={masterPassword}
                        name='masterPassword'
                        id='masterPassword'
                        className='px-4 py-2'
                        placeholder='password'
                        type="password" />
                </div>
                <button
                    // disabled={loading}
                    onClick={fetchPasswords}
                    className='py-2 mt-6 w-full rounded-md bg-sky-500 hover:bg-sky-600 text-white font-bold'>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default RevealPasswords