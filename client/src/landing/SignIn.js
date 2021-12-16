import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

import Navbar from './Navbar'
import Footer from './Footer'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { signIn } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const completedMeasurements = JSON.parse(localStorage.getItem('completedMeasurements'),)
    const authenticated = token ? true : false

    if (authenticated && completedMeasurements === 'true') {
      navigate('/dashboard')
    } else if (authenticated && completedMeasurements !== 'true') {
      navigate('/onboarding')
    }
  }, [navigate])

  const handleSignIn = async (e) => {
    e.preventDefault()
    let errorMessages = []

    if (email.trim() === '' || password.trim() === '') {
      errorMessages.push('Make sure all fields are filled out.')
    }

    if (email.trim() !== '' && password.trim() !== '') {
      try {
        const response = await signIn(email, password)
        const { authenticated, completedMeasurements } = response.authenticated
        if (authenticated && !completedMeasurements) {
          navigate('/onboarding');
        } else {
          navigate('/dashboard');
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
      <div className="overflow-hidden bg-white">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl xl:w-12/12 mx-auto">
              <div className="">
                <div className="bg-white rounded p-7 sm:p-10">
                  <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight sm:text-4xl text-center">
                    We're so <span className="text-green-300">happy </span> to
                    see you again! <span className="font-light">👋</span>
                  </h2>
                  <p className="max-w-xl mb-4 text-base text-gray-700 md:text-lg text-center">
                    Track your weight, meet your caloric goals, and log a
                    variety of exercises
                  </p>
                  <form onSubmit={handleSignIn}>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="email"
                        className="inline-block mb-1 font-medium"
                      >
                        E-mail
                      </label>
                      <input
                        placeholder="Enter your email"
                        required
                        type="text"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="name"
                        className="inline-block mb-1 font-medium"
                      >
                        Password
                      </label>
                      <input
                        placeholder="Enter your password"
                        required
                        type="password"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="mt-4 mb-2 sm:mb-4">
                      <button className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded text-green-500 bg-green-100 hover:bg-green-200 focus:shadow-outline focus:outline-none">
                        Sign in
                      </button>
                    </div>
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

export default SignIn
