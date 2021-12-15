import axios from 'axios'

export const signUp = async (email, password) => {
  try {
    await axios.post('http://localhost:8080/api/auth/signUp', {
      email,
      password,
    })
  } catch (error) {
    console.log(error)
    alert('There was a problem with your request')
  }
}

export const signIn = async (email, password) => {
  try {
    await axios.post('http://localhost:8080/api/auth/signIn', {
      email,
      password,
    })
  } catch (error) {
    console.log(error)
    alert('There was a problem with your request')
  }
}
