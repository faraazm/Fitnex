import { useState, useEffect } from 'react'
import { getExercises, logExercise, deleteExercise } from '../helpers/dashboard'
import { Table, Modal, Title, ActionIcon, NumberInput, Button, Group, Text } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { AiOutlinePlus, AiOutlineCalendar, AiOutlineDelete } from 'react-icons/ai'
import moment from 'moment'

const ExerciseHistory = ({ modalOpen, setModalOpen, caloriesBurnt, caloriesRemaining, setCaloriesBurnt, setCaloriesRemaining }) => {
    const [exercises, setExercises] = useState([])
    const [caloriesBurntInput, setCaloriesBurntInput] = useState('')
    const [isToday, setIsToday] = useState(true)

    useEffect(() => {
        (async () => { await fetchExercises(new Date().toISOString()) })()
    }, [])

    const [date, setDate] = useState(new Date())
    useEffect(() => {
        const today = new Date()
        const selectedDate = new Date(date)
        const check = (today.getMonth() === selectedDate.getMonth()) && (today.getDate() === selectedDate.getDate())
        setIsToday(check)
    }, [date])

    const fetchExercises = async (date) => {
        const exercises = await getExercises(date)
        if (exercises) {
            setExercises(exercises)
        }
    }

    const findExerciseByDate = async (date) => {
        setDate(date)
        const newDate = new Date(date)
        fetchExercises(newDate.toISOString())
    }

    const removeExercise = async (exerciseId) => {
        const removedExercise = await deleteExercise(exerciseId)

        if (removedExercise) {
            setCaloriesBurnt(round(caloriesBurnt - removedExercise.calories))
            setCaloriesRemaining(round(caloriesRemaining - removedExercise.calories))
            setExercises(exercises.filter(exercise => exercise._id !== exerciseId))
        }
    }

    const submitExercise = async (e) => {
        e.preventDefault()

        if (!caloriesBurntInput) {
            alert("Enter the amount of calories burnt!")
            return false
        } else {
            const loggedExercise = await logExercise(caloriesBurntInput)
            setExercises([loggedExercise, ...exercises])
            setModalOpen(false)
            setCaloriesBurntInput('')
            setCaloriesBurnt(round(caloriesBurnt + loggedExercise.calories))
            setCaloriesRemaining(round(caloriesRemaining + loggedExercise.calories))
        }
    }

    const round = (num) => {
        return Math.round( num * 100 + Number.EPSILON ) / 100
    }

    return (
        <>
            <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Add Exercise">
                <form onSubmit={(e) => submitExercise(e)}>
                    <Group direction="column">
                        <NumberInput 
                            style={{ width: '100%' }}
                            placeholder="Enter calories burnt"
                            label="Calories Burnt"
                            value={caloriesBurntInput}
                            size="md"
                            onChange={(val) => setCaloriesBurntInput(val)}
                            required
                        />
                        <Button size="md" type="submit" color="teal" fullWidth>Submit</Button>
                    </Group>
                </form>
            </Modal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: 15 }}>
                <Title size="xl" order={3}>Your activity 🏃</Title>
                <DatePicker icon={<AiOutlineCalendar />} value={date} placeholder="MM/DD/YYYY" onChange={(value) => findExerciseByDate(value)} />
                <ActionIcon color="teal" variant="light" size="lg" onClick={() => setModalOpen(true)}><AiOutlinePlus /></ActionIcon>
            </div>
            {exercises.length > 0 ?
                <Table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Calories</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.map((exercise) => (
                            <tr key={exercise._id}>
                                <td>{moment(exercise.created_at).format('h:mm A')}</td>
                                <td>{exercise.calories}</td>
                                <td><Button onClick={() => removeExercise(exercise._id)} size="xs" color="red" variant="light" leftIcon={<AiOutlineDelete />}>Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table> :
                !isToday && <Text color="dimmed">No results found. Try another date.</Text> 
            }
            {
                !exercises.length && isToday ?
                    <Group direction="column">
                        <Text color="dimmed">No exercises logged for today. Would you like to add an activity?</Text>
                        <Button color="teal" variant="light" onClick={() => setModalOpen(true)}>Add Activity</Button>
                    </Group> : ''
            }
        </>
    )
}

export default ExerciseHistory
