import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import axios from 'axios'

import Landing from './landing/Landing'
import About from './landing/About'
import Contact from './landing/Contact'
import SignUp from './landing/SignUp'
import SignIn from './landing/SignIn'
import Onboarding from './components/Onboarding'
import Dashboard from './components/Dashboard'

import { AuthProvider } from './hooks/useAuth'

import './index.css'
import './App.css'

const App = () => {
  let baseURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080'
      : 'https://fitnex-workouts.herokuapp.com'

  axios.create({ baseURL, withCredentials: true }).interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  )

  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = token

    return config
  })

  return (
    <MantineProvider
      theme={{
        headings: {
          fontFamily: 'Poppins, sans-serif',
        },
      }}
    >
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route
              path="/onboarding"
              element={
                <RequireAuth>
                  <Onboarding />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard/*"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </MantineProvider>
  )
}

function RequireAuth({ children }) {
  const token = localStorage.getItem('token')
  const completedMeasurements = JSON.parse(
    localStorage.getItem('completedMeasurements'),
  )
  const authenticated = token ? true : false
  const location = useLocation()

  // Checks if the user is authenticated and if they completed the onboarding flow
  if (authenticated && completedMeasurements) {
    return children
  } else if (authenticated && !completedMeasurements && children.type.name === 'Onboarding') {
    return children
  } else if (authenticated && !completedMeasurements) {
    return <Navigate to="/onboarding" replace state={{ path: location.pathname }} />
  } else {
    return <Navigate to="/sign-in" replace state={{ path: location.pathname }} />
  }
}

export default App
