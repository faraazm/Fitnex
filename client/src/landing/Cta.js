import iPhoneMockup from '../images/iphone-mockup-cropped.png'

const Cta = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-2xl px-4 pt-16 mx-auto sm:max-w-xl md:max-w-2xl lg:pt-32 md:px-8">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-4 py-2 mb-4 text-xs font-semibold tracking-wider uppercase bg-green-100 text-green-500 rounded-full">
            Let's get started
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
                  id="9ef1ff62-feb2-41fe-8163-772b4c79de7b"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#9ef1ff62-feb2-41fe-8163-772b4c79de7b)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">One step away</span>
          </span>{' '}
          from changing your lifestyle
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Now is the time to make the change. Let's get your dream body back with the world's greatest fitness app!
        </p>
      </div>
      <form className="flex flex-col items-center w-full mb-4 md:flex-row md:px-16">
        <input
          placeholder="Email"
          required=""
          type="text"
          className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="w-full h-12 font-medium tracking-wide transition duration-200 rounded text-white bg-green-400 focus:shadow-outline focus:outline-none"
        >
          Sign up
        </button>
      </form>
      <p className="max-w-md mb-10 text-xs text-gray-600 sm:text-sm md:text-center">
        You will be redirected to the signup page after submitting
      </p>
      <img
        src={iPhoneMockup}
        className="w-full mx-auto md:w-auto md:max-w-xs"
        alt=""
      />
    </div>
  )
}

export default Cta
