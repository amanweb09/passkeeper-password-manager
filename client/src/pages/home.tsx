import { useState } from 'react'
import Nav from '../components/nav'
import PasswordCard from '../components/password-card'
import { credentials } from '../dummy/credentials'
import { Credentials } from '../types'
import { FaEye, FaClipboard } from "react-icons/fa6"
import CreatePassword from '../components/create-password'
import { toast } from 'react-toastify'

const Home = () => {

  const [selectedCredential, setSelectedCredential] = useState<Credentials | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const copyPassword = () => {
    if (!selectedCredential) return;

    navigator.clipboard.writeText(selectedCredential.password)
    toast.success("Password copied to clipboard")
  }

  return (
    <div className='container mx-auto'>
      <Nav />
      <div className='mt-10 flex'>
        <div className="">
          <h3 className='text-gray-600 font-bold text-lg'>Your Saved Passwords</h3>
          <div>
            {
              credentials.map(c => <PasswordCard
                key={c._id}
                setCurrentCredential={setSelectedCredential}
                credential={c} />)
            }
          </div>
        </div>

        {/* content */}
        <div className="flex-1 px-12">
          {
            selectedCredential
            &&
            <div>
              <div className='flex h-max items-center'>
                <div className="w-24 h-24 flex-center bg-sky-50 mr-4 text-7xl rounded-md text-sky-600 capitalize shadow-md">
                  {selectedCredential.domain.split(".")[1][0] || ""}
                </div>

                <div>
                  <span className='text-lg text-sky-600'>{selectedCredential.domain}</span>
                </div>
              </div>

              <div className='mt-8 w-max'>

                {/* username */}
                <div className="border border-gray-100">
                  <span className='font-bold block text-sm text-gray-500'>Username</span>
                  <span>{selectedCredential.username}</span>
                </div>

                {/* password */}
                <div className='border border-gray-100 h-max mt-6'>
                  <span className='font-bold block text-sm text-gray-500'>Password</span>
                  <div className=' flex items-center justify-between'>
                    <input
                      className='cursor-pointer outline-none border-none mr-8'
                      contentEditable="false"
                      value={selectedCredential.password}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password" />

                    <div className='flex items-center'>
                      <FaEye 
                      onClick={() => setShowPassword(!showPassword)}
                      className='text-gray-400 w-8 text-lg cursor-pointer' />
                      <FaClipboard 
                      onClick={copyPassword}
                      className='text-gray-400 w-8 text-lg cursor-pointer' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          }
        </div>

        {/* add */}
        <CreatePassword />
      </div>
    </div>
  )
}

export default Home