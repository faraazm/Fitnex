import axios from 'axios'

// Get currently logged in user's information
export const getCurrentUser = async () => {
    try {
        const { data } = await axios.get(`/api/auth/current_user`)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getExercises = async (date) => {
    try {
        const { data } = await axios.get(`/api/activity/${date}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const logExercise = async (calories) => {
    try {
        const { data } = await axios.post(`/api/activity/log`, { calories })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteExercise = async (id) => {
    try {
        const { data } = await axios.delete(`/api/activity/remove/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getWeights = async (days) => {
    try {
        const { data } = await axios.get(`/api/weight/${days}`)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const logWeight = async (weight) => {
    try {
        const { data } = await axios.post(`/api/weight/log`, { weight })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteWeight = async () => {
    try {
        const { data } = await axios.delete(`/api/weight/remove`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getFoods = async () => {
    try {
        const { data } = await axios.get(`/api/foods/`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getMeals = async (date) => {
    try {
        const { data } = await axios.get(`/api/foods/meals/${date}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const logMeal = async (foodId) => {
    try {
        const { data } = await axios.post(`/api/foods/log`, { foodId })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteMeal = async (mealId) => {
    try {
        const { data } = await axios.delete(`/api/foods/meals/${mealId}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getCalorieStatistics = async () => {
    try {
        const { data } = await axios.get(`/api/foods/calorie-statistics`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getMacros = async () => {
    try {
        const { data } = await axios.get(`/api/foods/macros`)
        return data
    } catch (error) {
        console.log(error)
    }
}