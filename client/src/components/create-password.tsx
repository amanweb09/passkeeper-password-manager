import React, { useState } from 'react'
import { CiGlobe, CiUser, CiLock } from "react-icons/ci"
import { validateCredentials } from '../validators'
import { Credentials, UnsavedCredential } from '../types'
import { toast } from 'react-toastify'
import MasterPasswordPopup from './master-password-popup'

interface IPropTypes {
    setCredentials: React.Dispatch<React.SetStateAction<Credentials[]>>,
    cred: Credentials[]
}

const CreatePassword: React.FC<IPropTypes> = ({ setCredentials, cred }) => {

    const [masterPassword, setMasterPassword] = useState<string>("")
    const [showPopup, setShowPopup] = useState(false)
    const [loading, setLoading] = useState(false)
    const [creds, setCreds] = useState<UnsavedCredential>({
        domain: "",
        username: "",
        password: ""
    })

    const modifyCreds = (name: "domain" | "username" | "password", value: string) => {
        setCreds({
            ...creds,
            [name]: value
        })
    }

    const popupMasterPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const { passed, message } = validateCredentials(creds)

        if (!passed) return toast.error(message)

        setLoading(true)
        setShowPopup(true)
    }

    return (
        <div>
            {
                showPopup
                &&
                <MasterPasswordPopup
                    loading={loading}
                    setLoading={setLoading}
                    setInputDetails={setCreds}
                    cred={cred}
                    setCredentials={setCredentials}
                    credentials={creds}
                    masterPassword={masterPassword}
                    setMasterPassword={setMasterPassword}
                    setShowPopup={setShowPopup} />
            }
            <div className="px-10">

                <h3 className='text-gray-600 font-bold text-lg'>Create a Password</h3>
                <form
                    className='mt-8 flex flex-col'
                    action="#">
                    <div className='flex items-center'>
                        <CiGlobe className='w-12 text-3xl text-gray-500' />
                        <div>
                            <label
                                className='block text-sm text-gray-500'
                                htmlFor="domain">
                                Website URL
                            </label>
                            <input
                                onChange={(e) => modifyCreds("domain", e.target.value)}
                                name='domain'
                                id='domain'
                                value={creds.domain}
                                className='px-4 py-2'
                                placeholder='https://www.instagram.com'
                                type="text" />
                            <p className='italic text-sm text-gray-400 mt-2'>URL should begin with <span className='text-sky-500'>https://www.</span></p>
                        </div>
                    </div>

                    <div className='flex items-center mt-6'>
                        <CiUser className='w-12 text-3xl text-gray-500' />
                        <div>
                            <label
                                className='block text-sm text-gray-500'
                                htmlFor="username">
                                Username
                            </label>
                            <input
                                value={creds.username}
                                onChange={(e) => modifyCreds("username", e.target.value)}
                                name='username'
                                id='username'
                                className='px-4 py-2'
                                placeholder='Eg. john.doe123'
                                type="text" />
                        </div>

                    </div>

                    <div className='flex items-center mt-6'>
                        <CiLock className='w-12 text-3xl text-gray-500' />
                        <div>
                            <label
                                className='block text-sm text-gray-500'
                                htmlFor="password">
                                Password
                            </label>
                            <input
                                value={creds.password}
                                onChange={(e) => modifyCreds("password", e.target.value)}
                                name='password'
                                id='password'
                                className='px-4 py-2'
                                placeholder='password'
                                type="password" />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        onClick={popupMasterPassword}
                        className='py-4 mt-6 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-bold'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePassword