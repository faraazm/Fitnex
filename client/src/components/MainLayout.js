import { useState, useEffect } from 'react'
import { Title, Text, Paper, ThemeIcon, Progress, Group, Button } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { getCalorieStatistics } from '../helpers/dashboard'
import { AiOutlineThunderbolt, AiOutlineFire } from 'react-icons/ai'
import { IoFastFoodOutline } from 'react-icons/io5'
import { FaWeight } from 'react-icons/fa'
import { BiDumbbell } from 'react-icons/bi'
import WeightChart from './WeightChart'
import MacroChart from './MacroChart'
import MealHistory from './MealHistory'
import ExerciseHistory from './ExerciseHistory'

const MainLayout = ({ user }) => {
    const [weightModalOpen, setWeightModalOpen] = useState(false)
    const [mealModalOpen, setMealModalOpen] = useState(false)
    const [exerciseModalOpen, setExerciseModalOpen] = useState(false)
    const [caloriesConsumed, setCaloriesConsumed] = useState(0)
    const [caloriesBurnt, setCaloriesBurnt] = useState(0)
    const [caloriesRemaining, setCaloriesRemaining] = useState(0)
    const [mealAdded, setMealAdded] = useState({})

    const loadUserData = async () => {
        const statistics = await getCalorieStatistics()

        if(statistics && Object.keys(statistics).length) {
            setCaloriesConsumed(statistics.caloriesConsumed)
            setCaloriesBurnt(statistics.caloriesBurnt)
            setCaloriesRemaining(statistics.caloriesRemaining)
        }
    }

    useEffect(() => {
        (async () => { await loadUserData() })()
    }, [])

    const isMobile = useMediaQuery('(max-width: 1000px)')

    return (
        <>
            <div style={{ marginBottom: 15 }}>
                <Title size="xl" order={1}>Hello, {user.name}! 👋</Title>
                <Text color="dimmed" mb="sm">This is the ultimate dashboard for you to stay on track on your calories!</Text>
                <Group>
                    <Button color="cyan" variant="light" leftIcon={<FaWeight />} onClick={() => setWeightModalOpen(true)}>Log Weight</Button>
                    <Button color="yellow" variant="light" leftIcon={<IoFastFoodOutline />} onClick={() => setMealModalOpen(true)}>Log Meal</Button>
                    <Button color="teal" variant="light" leftIcon={<BiDumbbell />} onClick={() => setExerciseModalOpen(true)}>Log Exercise</Button>
                </Group>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', width: isMobile ? '100%' : 'auto' }}>
                <Paper padding="md" shadow="sm" mr="sm" mb="sm" style={{ width: isMobile ? '100%' : 220 }}>
                    <div style={{ display: 'flex', marginBottom: 10 }}>
                        <ThemeIcon radius="xl" color="cyan"><AiOutlineThunderbolt /></ThemeIcon>
                        <Text ml="sm" color="dimmed">Caloric Intake</Text>
                    </div>
                    <Title weight={500} style={{ color: '#363636', marginBottom: 10 }} order={2}>{user.calorieIntake}</Title>
                    <Progress color="cyan" value={75} radius="xl" />
                </Paper>

                <Paper padding="md" shadow="sm" mr="sm" mb="sm" style={{ width: isMobile ? '100%' : 220 }}>
                    <div style={{ display: 'flex', marginBottom: 10 }}>
                        <ThemeIcon radius="xl" color="violet"><AiOutlineFire /></ThemeIcon>
                        <Text ml="sm" color="dimmed">Calories Consumed</Text>
                    </div>
                    <Title weight={500} style={{ color: '#363636', marginBottom: 10 }} order={2}>{caloriesConsumed}</Title>
                    <Progress color="violet" value={35} radius="xl" />
                </Paper>

                <Paper padding="md" shadow="sm" mr="sm" mb="sm" style={{ width: isMobile ? '100%' : 220 }}>
                    <div style={{ display: 'flex', marginBottom: 10 }}>
                        <ThemeIcon radius="xl" color="orange"><AiOutlineFire /></ThemeIcon>
                        <Text ml="sm" color="dimmed">Calories Burnt</Text>
                    </div>
                    <Title weight={500} style={{ color: '#363636', marginBottom: 10 }} order={2}>{caloriesBurnt}</Title>
                    <Progress color="orange" value={35} radius="xl" />
                </Paper>

                <Paper padding="md" shadow="sm" mr="sm" mb="sm" style={{ width: isMobile ? '100%' : 220 }}>
                    <div style={{ display: 'flex', marginBottom: 10 }}>
                        <ThemeIcon radius="xl" color="green"><IoFastFoodOutline /></ThemeIcon>
                        <Text ml="sm" color="dimmed">Calories Remaining</Text>
                    </div>
                    <Title weight={500} style={{ color: '#363636', marginBottom: 10 }} order={2}>{caloriesRemaining}</Title>
                    <Progress color="green" value={50} radius="xl" />
                </Paper>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Paper padding="xl" mr="sm" mb="sm" shadow="sm" style={{ width: isMobile ? '100%' : 550 }}>
                    <WeightChart modalOpen={weightModalOpen} setModalOpen={setWeightModalOpen} />
                </Paper>
                <Paper padding="xl" shadow="sm" mb="sm" mr="sm" style={{ width: isMobile ? '100%' : 325 }}>
                    <Title size="xl" order={3} mb="sm">Macro Breakdown 🥧</Title>
                    <MacroChart 
                        modalOpen={mealModalOpen}
                        setModalOpen={setMealModalOpen}
                        mealAdded={mealAdded}
                    />
                </Paper>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Paper padding="xl" mr="sm" mb="sm" shadow="sm" style={{ width: isMobile ? '100%' : 550 }}>
                    <MealHistory 
                        modalOpen={mealModalOpen}
                        setModalOpen={setMealModalOpen}
                        caloriesConsumed={caloriesConsumed}
                        caloriesRemaining={caloriesRemaining}
                        setCaloriesConsumed={setCaloriesConsumed}
                        setCaloriesRemaining={setCaloriesRemaining}
                        setMealAdded={setMealAdded}
                    />
                </Paper>
                <Paper padding="xl" mr="sm" mb="sm" shadow="sm" style={{ width: isMobile ? '100%' : 550 }}>
                    <ExerciseHistory 
                        modalOpen={exerciseModalOpen}
                        setModalOpen={setExerciseModalOpen}
                        caloriesBurnt={caloriesBurnt}
                        caloriesRemaining={caloriesRemaining}
                        setCaloriesBurnt={setCaloriesBurnt}
                        setCaloriesRemaining={setCaloriesRemaining}
                    />
                </Paper>
            </div>
        </>
    )
}

export default MainLayout
