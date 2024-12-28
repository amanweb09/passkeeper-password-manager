import React from 'react'
import { CiGlobe, CiUser, CiLock } from "react-icons/ci"


const CreatePassword:React.FC = () => {
  return (
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
                  name='domain'
                  id='domain'
                  className='px-4 py-2'
                  placeholder='https://www.instagram.com'
                  type="text" />
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
                  name='password'
                  id='password'
                  className='px-4 py-2'
                  placeholder='password'
                  type="password" />
              </div>

            </div>

            <button className='py-4 mt-6 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-bold'>
              Submit
            </button>
          </form>
        </div>
  )
}

export default CreatePassword