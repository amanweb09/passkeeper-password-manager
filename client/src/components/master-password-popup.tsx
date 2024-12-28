import React from 'react'
import { CiLock } from 'react-icons/ci'
import { toast } from 'react-toastify'
import { Credentials, UnsavedCredential } from '../types'
import { storePassword } from '../api'

interface IPropTypes {
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,
    masterPassword: string,
    setMasterPassword: React.Dispatch<React.SetStateAction<string>>,
    credentials: UnsavedCredential,
    setCredentials: React.Dispatch<React.SetStateAction<Credentials[]>>,
    cred: Credentials[],
    setInputDetails: React.Dispatch<React.SetStateAction<UnsavedCredential>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const MasterPasswordPopup: React.FC<IPropTypes> = ({ setShowPopup, setMasterPassword, masterPassword, credentials, setCredentials, cred, setInputDetails, loading, setLoading }) => {

    const handleSubmit = async () => {
        if (!masterPassword.length) return toast.error("Please enter your password")

        toast.warning("Adding your password")
        try {
            setLoading(true)
            const { data } = await storePassword({ credentials, masterPassword })
            setMasterPassword("")
            setInputDetails({ domain: "", username: "", password: "" })
            setCredentials([...cred, data.cred])
            setShowPopup(false)
            toast.success("Wohoo! Password added")
        } catch (error: any) {
            console.log(error);
            setMasterPassword("")
            setShowPopup(false)
            setInputDetails({ domain: "", username: "", password: "" })
            toast.error(error.response.data.message)
        }
    }

    const closePopup = () => {
        setLoading(false) 
        setShowPopup(false)
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex-center'>
            <div className="bg-white p-8 rounded-md shadow-lg">
                <div className='flex-center flex-col w-full'>
                    <img
                        className='w-10'
                        src="/images/logo.png"
                        alt="logo" />
                    <h1 className='font-bold text-gray-600'>Enter your Password</h1>
                </div>

                <div className='mt-6'>
                    <div className='flex items-center mt-6'>
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
                        disabled={loading}
                        onClick={handleSubmit}
                        className='py-2 mt-6 w-full rounded-md bg-sky-500 hover:bg-sky-600 text-white font-bold'>
                        Submit
                    </button>
                    <button
                        onClick={closePopup}
                        className='py-1 mt-6 w-full rounded-md bg-red-50 hover:bg-red-100 text-red-500 font-bold'>
                        cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MasterPasswordPopup