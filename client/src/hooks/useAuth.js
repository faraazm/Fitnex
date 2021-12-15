import * as React from "react";
import { useEffect, useState, createContext, useContext } from 'react'
import axios from 'axios'

export const authContext = createContext();

function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [completedMeasurements, setCompletedMeasurements] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        const completedMeasurementsT = localStorage.getItem("completedMeasurements")

        setAuthenticated(token ? true : false)
        setCompletedMeasurements(completedMeasurementsT === 'true' ? true : false)
    }, [])

    // Sets/Removes token in localStorage and returns if it exists
    const hasToken = (response) => {
        const { token } = response.data

        if (token) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        }

        token ? localStorage.setItem("token", token) : localStorage.removeItem("token")
        setAuthenticated(token ? true : false)
        return token ? true : false
    }

    // Checks if the user has completed their measurements
    const hasCompletedMeasurements = (response) => {
        const { completedMeasurements } = response.data
        localStorage.setItem('completedMeasurements', completedMeasurements)
        setCompletedMeasurements(completedMeasurements)
        return completedMeasurements
    }

    // Properties and Methods exposed to other components
    return {
        authenticated,
        completedMeasurements,
        async signIn(email, password) {
            const response = await axios.post('http://localhost:8080/api/auth/signIn', {
                email,
                password
            })

            return {
                authenticated: hasToken(response),
                completedMeasurements: hasCompletedMeasurements(response)
            }
        },
        async signUp(email, password) {
            const response = await axios.post('http://localhost:8080/api/auth/signUp', {
                email,
                password
            })

            return {
                authenticated: hasToken(response),
                completedMeasurements: hasCompletedMeasurements(response)
            }
        },
        signOut() {
            localStorage.clear()
            setAuthenticated(false);
            setCompletedMeasurements(false);
            return { authenticated: false, completedMeasurements: false }
        }
    };
}

export function AuthProvider({ children }) {
    const auth = useAuth()

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return useContext(authContext);
}