import Navbar from './Navbar'
import Footer from './Footer'

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-2xl mx-auto sm:max-w-xl md:max-w-2xl">
          <div className="text-center">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                Contact us <span className="font-light">💌</span>
              </h2>
              <p className="max-w-md mx-auto text-base text-gray-700 md:text-lg">
                This contact form is only for aesthetics 😊 <br /> But if you do actually want to contact me, my email is faraazmotiwala3@gmail.com
              </p>
            </div>
            <form className="flex flex-col items-center w-full mb-4 md:px-16">
              <input
                placeholder="Email"
                required=""
                type="text"
                className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-6 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              />
              <input
                placeholder="Subject"
                required=""
                type="text"
                className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-6 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              />
              <textarea placeholder="Enter message" className="flex-grow w-full h-36 px-4 py-3 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-6 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline" />
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide transition duration-200 rounded bg-green-100 hover:bg-green-200 text-green-500 focus:shadow-outline focus:outline-none"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact
