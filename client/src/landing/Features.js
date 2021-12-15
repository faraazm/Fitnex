import { AiOutlineAreaChart, AiOutlineSmile, AiOutlineFire } from 'react-icons/ai'

const Features = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-4 py-2 mb-4 text-xs font-semibold tracking-wider uppercase bg-green-100 text-green-500 rounded-full">
            Features
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
            <span className="inline-block text-green-400">fitnex</span> is the
            next generation of fitness apps
          </span>
        </h2>
        <p className="text-base text-gray-700 md:text-lg"></p>
      </div>
      <div className="grid max-w-md gap-8 row-gap-10 sm:mx-auto lg:max-w-full lg:grid-cols-3">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:mr-4">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-200">
              <AiOutlineAreaChart size={30} className="text-green-700" />
            </div>
          </div>
          <div>
            <h6 className="mb-2 font-semibold leading-5">Weight Tracking</h6>
            <p className="mb-3 text-sm text-gray-900">
              You can log your weight and see how it changes over time.
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
                Real Time Charts
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
                Weekly, Monthly, Yearly
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
                Set goals
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
              <AiOutlineSmile size={30} className="text-green-700" />
            </div>
          </div>
          <div>
            <h6 className="mb-2 font-semibold leading-5">Meal Planning</h6>
            <p className="mb-3 text-sm text-gray-900">
              Log your meals from our predefined database containing all kinds of meals
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
                Food Database
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
                Calorie tracking
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
                Track consumption
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
              <AiOutlineFire size={30} className="text-green-700" />
            </div>
          </div>
          <div>
            <h6 className="mb-2 font-semibold leading-5">Calorie Intake</h6>
            <p className="mb-3 text-sm text-gray-900">
              Based on your goal, we will calculate the optimal calorie intake
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
                Goal optimized
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
                Calorie tracking
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
                Goal-focused
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
  )
}

export default Features
