import React from 'react'
import { Credentials } from '../types'

interface IPropTypes {
    credential: Credentials
    setCurrentCredential: React.Dispatch<React.SetStateAction<Credentials | null>>
}
const PasswordCard: React.FC<IPropTypes> = ({ credential, setCurrentCredential }) => {
    const icon = credential.domain.split(".")[1][0] || ""
    
    return (
        <div 
        onClick={() => setCurrentCredential(credential)}
        className='w-full py-6 px-2 rounded-md flex items-center hover:bg-neutral-50 cursor-pointer'>
            <div className="w-10 h-10 flex-center bg-sky-50 text-3xl rounded-md mr-2 text-sky-600 capitalize">
                {icon}
            </div>

            <div>
                <span className='text-neutral-800'>{credential.domain}</span>
            </div>
        </div>
    )
}

export default PasswordCard