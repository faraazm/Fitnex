import { useState, useEffect } from 'react'
import { getFoods, getMeals, logMeal, deleteMeal } from '../helpers/dashboard'
import { Table, Modal, Title, ActionIcon, Select, Button, Group, Text } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { AiOutlinePlus, AiOutlineCalendar, AiOutlineDelete } from 'react-icons/ai'
import moment from 'moment'

const MealHistory = ({ modalOpen, setModalOpen, caloriesConsumed, caloriesRemaining, setCaloriesConsumed, setCaloriesRemaining, setMealAdded }) => {
    const [meals, setMeals] = useState([])
    const [foods, setFoods] = useState([])
    const [foodSelected, setFoodSelected] = useState('')
    const [isToday, setIsToday] = useState(true)

    useEffect(() => {
        (async () => {
            await fetchMeals(new Date().toISOString())
            await fetchFoods()
        })()
    }, [])

    const [date, setDate] = useState(new Date())
    useEffect(() => {
        const today = new Date()
        const selectedDate = new Date(date)
        const check = (today.getMonth() === selectedDate.getMonth()) && (today.getDate() === selectedDate.getDate())
        setIsToday(check)
    }, [date])

    const fetchMeals = async (date) => {
        const meals = await getMeals(date)
        if (meals) {
            console.log(meals)
            setMeals(meals)
        }
    }

    const findMealByDate = async (date) => {
        setDate(date)
        const newDate = new Date(date)
        fetchMeals(newDate.toISOString())
    }

    const fetchFoods = async () => {
        const foods = await getFoods()
        if (foods) {
            setFoods(foods.map(food => {
                return { value: food._id, label: food.name }
            }))
        }
    }

    const removeMeal = async (mealId) => {
        const removedMeal = await deleteMeal(mealId)
        if (removedMeal) {
            setCaloriesConsumed(round(caloriesConsumed - removedMeal.calories))
            setCaloriesRemaining(round(caloriesRemaining + removedMeal.calories))
            setMeals(meals.filter(meal => meal._id !== mealId))
            setMealAdded(removedMeal)
        }
    }

    const submitMeal = async (e) => {
        e.preventDefault()

        if (!foodSelected) {
            alert("Select a food item")
            return false
        } else {
            const loggedMeal = await logMeal(foodSelected)
            setMeals([loggedMeal, ...meals])
            setCaloriesConsumed(round(caloriesConsumed + loggedMeal.calories))
            setCaloriesRemaining(round(caloriesRemaining - loggedMeal.calories))
            setMealAdded(loggedMeal)
            setModalOpen(false)
            setFoodSelected('')
        }
    }

    const round = (num) => {
        return Math.round( num * 100 + Number.EPSILON ) / 100
    }

    return (
        <>
            <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Add Meal">
                <form onSubmit={(e) => submitMeal(e)}>
                    <Group direction="column">
                        {foods && <Select
                            size="md"
                            style={{ width: '100%' }}
                            label="Select your meal"
                            placeholder="Pick a meal"
                            searchable
                            nothingFound="No foods found"
                            value={foodSelected}
                            onChange={setFoodSelected}
                            data={foods}
                            required
                        />}
                        <Button size="md" type="submit" color="teal" fullWidth>Submit</Button>
                    </Group>
                </form>
            </Modal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                <Title size="xl" order={3}>Meal History 🍔</Title>
                <DatePicker icon={<AiOutlineCalendar />} value={date} placeholder="MM/DD/YYYY" onChange={(value) => findMealByDate(value)} />
                <ActionIcon color="yellow" variant="light" size="lg" onClick={() => setModalOpen(true)}><AiOutlinePlus /></ActionIcon>
            </div>
            {meals.length > 0 ?
                <Table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Name</th>
                            <th>Proteins</th>
                            <th>Carbs</th>
                            <th>Fats</th>
                            <th>Calories</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((meal) => (
                            <tr key={meal._id}>
                                <td>{moment(meal.created_at).format('h:mm A')}</td>
                                <td>{meal.name}</td>
                                <td>{meal.protein}</td>
                                <td>{meal.carbs}</td>
                                <td>{meal.fats}</td>
                                <td>{meal.calories}</td>
                                <td><Button onClick={() => removeMeal(meal._id)} size="xs" color="red" variant="light" leftIcon={<AiOutlineDelete />}>Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table> :
                !isToday && <Text color="dimmed">No results found. Try another date.</Text>
            }
            {
                !meals.length && isToday ?
                    <Group direction="column">
                        <Text color="dimmed">No meals logged for today. Would you like to add a meal?</Text>
                        <Button color="yellow" variant="light" onClick={() => setModalOpen(true)}>Add Meal</Button>
                    </Group> : ''
            }
        </>
    )
}

export default MealHistory
