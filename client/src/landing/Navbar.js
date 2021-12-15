import { useState } from 'react'
import '../styles/Navbar.css'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authenticated, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut()
    navigate('/')
  }

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <a
          href="/"
          aria-label="Company"
          title="Company"
          className="inline-flex items-center"
        >
          <span className="ml-2 text-2xl font-bold tracking-wide text-gray-800">
            fitnex
          </span>
        </a>
        <ul className="flex items-center hidden space-x-8 lg:flex">
          <li>
            <Link
              to="/"
              aria-label="Home"
              title="Home"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              aria-label="About"
              title="About"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              aria-label="Product pricing"
              title="Product pricing"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200"
            >
              Contact
            </Link>
          </li>
          {authenticated && <li>
            <Link
              to="/dashboard"
              aria-label="Dashboard"
              title="Dashboard"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200"
            >
              Dashboard
            </Link>
          </li>}
          {authenticated && <li>
            <a
              href="/"
              aria-label="Sign out"
              title="Sign out"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200"
              onClick={handleLogout}
            >
              Sign out
            </a>
          </li>}
          {!authenticated && <li>
            <Link
              to="/sign-up"
              aria-label="Sign up"
              title="Sign up"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200"
            >
              Sign up
            </Link>
          </li>}
          {!authenticated && <li>
            <Link
              to="/sign-in"
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-green-500 bg-green-100 hover:bg-green-200 transition duration-200 rounded focus:shadow-outline focus:outline-none"
              aria-label="Sign in"
              title="Sign in"
            >
              Sign in
            </Link>
          </li>}
        </ul>
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <AiOutlineMenu size={25} />
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <a
                      href="/"
                      aria-label="Company"
                      title="Company"
                      className="inline-flex items-center"
                    >
                      <span className="ml-2 text-xl font-bold tracking-wide text-gray-800">
                        fitnex
                      </span>
                    </a>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4 text-center">
                    <li>
                      <Link
                        to="/"
                        aria-label="Home"
                        title="Home"
                        onClick={() => setIsMenuOpen(false)}
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        aria-label="About"
                        title="About"
                        onClick={() => setIsMenuOpen(false)}
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        aria-label="Contact"
                        title="Contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Contact
                      </Link>
                    </li>
                    {authenticated && <li>
                      <Link
                        to="/dashboard"
                        aria-label="Dashboard"
                        title="Dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Dashboard
                      </Link>
                    </li>}
                    {authenticated && <li>
                      <a
                        href="/"
                        aria-label="Sign out"
                        title="Sign out"
                        onClick={handleLogout}
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Sign out
                      </a>
                    </li>}
                    {!authenticated && <li>
                      <Link
                        to="/sign-up"
                        aria-label="Sign up"
                        title="Sign up"
                        onClick={() => setIsMenuOpen(false)}
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Sign up
                      </Link>
                    </li>}
                    {!authenticated && <li>
                      <Link
                        to="/sign-in"
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide transition duration-200 rounded text-green-500 bg-green-100 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                        aria-label="Sign in"
                        title="Sign in"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign in
                      </Link>
                    </li>}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
