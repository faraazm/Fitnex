import Navbar from './Navbar'
import Footer from './Footer'
import memoji1 from '../images/memoji-1.png'
import memoji2 from '../images/memoji-2.png'
import memoji3 from '../images/memoji-3.png'
import { AiOutlineCode, AiOutlineDatabase, AiOutlineFormatPainter } from 'react-icons/ai'

const About = () => {
  return (
    <>
      <Navbar />
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-4 py-2 mb-4 text-xs font-semibold tracking-wider uppercase bg-green-100 text-green-500 rounded-full">
              Dream Team
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-green-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="247432cb-6e6c-4bec-9766-564ed7c230dc"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#247432cb-6e6c-4bec-9766-564ed7c230dc)"
                  width="52"
                  height="24"
                />
              </svg>
              <span>Welcome</span>
            </span>{' '}
            our talented team of Faraaz's <span className="font-light">👋</span>
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            I completed every single aspect of this application - Front End, Back End, and graphics. I guess you could say I am a one man army 😅
          </p>
        </div>
        <div className="grid gap-10 row-gap-8 mx-auto sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex">
            <img
              className="object-cover w-20 h-20 mr-4 rounded-full shadow"
              src={memoji1}
              alt="Person"
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg font-bold">Faraaz Motiwala</p>
              <p className="text-sm text-gray-800">Front End Developer</p>
            </div>
          </div>
          <div className="flex">
            <img
              className="object-cover w-20 h-20 mr-4 rounded-full shadow"
              src={memoji2}
              alt="Person"
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg font-bold">Faraaz Motiwala</p>
              <p className="text-sm text-gray-800">Back End Developer</p>
            </div>
          </div>
          <div className="flex">
            <img
              className="object-cover w-20 h-20 mr-4 rounded-full shadow"
              src={memoji3}
              alt="Person"
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg font-bold">Faraaz Motiwala</p>
              <p className="text-sm text-gray-800">Graphic Designer</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-32">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-4 py-2 mb-4 text-xs font-semibold tracking-wider uppercase bg-green-100 text-green-500 rounded-full">
              Behind the scenes
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-green-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="fdca20a0-aeb4-4caf-ba1b-4351eee42363"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#fdca20a0-aeb4-4caf-ba1b-4351eee42363)"
                  width="52"
                  height="24"
                />
              </svg>
            </span>{' '}
            Technology stack & tools
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            An overview of all the tools and technologies I used to create this
            full stack web application.
          </p>
        </div>
        <div className="grid max-w-md gap-8 row-gap-10 sm:mx-auto lg:max-w-full lg:grid-cols-3">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:mr-4">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-200">
                <AiOutlineCode size={30} className="text-green-700" />
              </div>
            </div>
            <div>
              <h6 className="mb-2 font-semibold leading-5">Front End Technologies</h6>
              <p className="mb-3 text-sm text-gray-900">
                This consists of the landing pages and the internal dashboard after logging in
              </p>
              <ul className="mb-4 -ml-1 space-y-2">
                <li className="flex items-start">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-green-300"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  React
                </li>
                <li className="flex items-start">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-green-300"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  TailwindCSS
                </li>
                <li className="flex items-start">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-green-300"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  Mantine Component Library
                </li>
              </ul>
              <a
                href="/"
                aria-label=""
                className="inline-flex items-center font-semibold transition-colors duration-200 text-green-400 hover:text-green-800"
              >
                Learn more
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="sm:mr-4">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-200">
                <AiOutlineDatabase size={30} className="text-green-700" />
              </div>
            </div>
            <div>
              <h6 className="mb-2 font-semibold leading-5">Back End Technologies</h6>
              <p className="mb-3 text-sm text-gray-900">
                Authentication, encryption, dashboard functionalities, and much more.
              </p>
              <ul className="mb-4 -ml-1 space-y-2">
                <li className="flex items-start">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-green-300"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  Node.js
                </li>
                <li className="flex items-start">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-green-300"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  MongoDB + Mongoose
                </li>
                <li className="flex items-start">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-green-300"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  Express
                </li>
              </ul>
              <a
                href="/"
                aria-label=""
                className="inline-flex items-center font-semibold transition-colors duration-200 text-green-400 hover:text-green-800"
              >
                Learn more
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="sm:mr-4">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-200">
                <AiOutlineFormatPainter size={30} className="text-green-700" />
              </div>
            </div>
            <div>
              <h6 className="mb-2 font-semibold leading-5">Graphic Design</h6>
              <p className="mb-3 text-sm text-gray-900">
                Design tools I used throughout the project for image assets
              </p>
              <ul className="mb-4 -ml-1 space-y-2">
                <li className="flex items-start">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-green-300"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  Figma
                </li>
                <li className="flex items-start">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-green-300"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  Dribbble (for inspiration)
                </li>
                <li className="flex items-start">
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-green-300"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  Pexels (for free images)
                </li>
              </ul>
              <a
                href="/"
                aria-label=""
                className="inline-flex items-center font-semibold transition-colors duration-200 text-green-400 hover:text-green-800"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default About
