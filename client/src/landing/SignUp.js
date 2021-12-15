import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

import Navbar from './Navbar'
import Footer from './Footer'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const { signUp } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let errorMessages = []

    if (password !== confirmPassword) {
      errorMessages.push('Your passwords do not match')
    }

    if (email.trim() === '' || password.trim() === '') {
      errorMessages.push('Make sure all fields are filled out.')
    }

    if (
      email.trim() !== '' &&
      password.trim() !== '' &&
      password === confirmPassword
    ) {
      try {
        const response = await signUp(email, password)
        if(response.authenticated) {
          navigate('/onboarding')
        }
      } catch (error) {
        console.log(error)
        alert('There was a problem with your request')
      }
    }

    if (errorMessages.length) {
      alert(errorMessages.join('\r\n'))
    }
  }

  return (
    <>
      <Navbar />
      <div>
        <div className="bg-white">
          <div className="px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-32">
            <div className="flex flex-col items-center justify-between xl:flex-row">
              <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight sm:text-4xl">
                  One step away from <br className="hidden md:block" />
                  becoming a fitness master <span className="font-light">🔥</span>
                </h2>
                <p className="max-w-xl mb-4 text-base text-gray-700 md:text-lg">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudan, totam rem aperiam, eaque ipsa
                  quae.
                </p>
              </div>
              <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                <div className="bg-white rounded shadow-lg p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    Sign up for an account
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="email"
                        className="inline-block mb-1 font-medium"
                      >
                        E-mail
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your E-mail"
                        required
                        type="email"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label className="inline-block mb-1 font-medium">
                        Password
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        pattern=".{5,}"
                        title="Minimum 5 characters"
                        placeholder="Enter your password"
                        required
                        type="password"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label className="inline-block mb-1 font-medium">
                        Confirm Password
                      </label>
                      <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                        type="password"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mt-4 mb-2 sm:mb-4">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded text-green-500 bg-green-100 hover:bg-green-200 focus:shadow-outline focus:outline-none"
                      >
                        Sign up
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 sm:text-sm">
                      There is an onboarding process after you Sign Up
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SignUp
