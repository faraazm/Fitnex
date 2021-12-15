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

    const calorieCards = [
        {
            title: 'Calorie Intake',
            value: user.calorieIntake,
            icon: <AiOutlineThunderbolt />,
            color: 'cyan'
        },
        {
            title: 'Calories Consumed',
            value: caloriesConsumed,
            icon: <AiOutlineFire />,
            color: 'violet'
        },
        {
            title: 'Calories Burnt',
            value: caloriesBurnt,
            icon: <AiOutlineFire />,
            color: 'orange'
        },
        {
            title: 'Calories Remaining',
            value: caloriesRemaining,
            icon: <IoFastFoodOutline />,
            color: 'green'
        }
    ]

    useEffect(() => {
        (async () => { await loadUserData() })()
    }, [])

    const isMobile = useMediaQuery('(max-width: 1000px)')

    return (
        <div style={{ width: '100%' }}>
            <div style={{ marginBottom: 15 }}>
                <Title size="xl" order={isMobile ? 2 : 1}>Hello, {user.name}! 👋</Title>
                <Text color="dimmed" mb="sm">This is the ultimate dashboard for you to stay on track on your calories!</Text>
                <Group>
                    <Button size={isMobile ? 'xs' : 'md'} color="cyan" variant="light" leftIcon={<FaWeight />} onClick={() => setWeightModalOpen(true)}>Log Weight</Button>
                    <Button size={isMobile ? 'xs' : 'md'} color="yellow" variant="light" leftIcon={<IoFastFoodOutline />} onClick={() => setMealModalOpen(true)}>Log Meal</Button>
                    <Button size={isMobile ? 'xs' : 'md'} color="teal" variant="light" leftIcon={<BiDumbbell />} onClick={() => setExerciseModalOpen(true)}>Log Exercise</Button>
                </Group>
            </div>


                <div className="hide-scrollbar" style={{ display: 'flex', width: isMobile ? '100%' : 'auto', overflowX: 'auto' }}>
                    {
                        calorieCards.map(item => 
                            <div key={item.title} style={{ minWidth: isMobile ? 185 : 240 }}>
                                <Paper padding="md" shadow="sm" mr="sm" mb="sm">
                                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', marginBottom: 10 }}>
                                        <ThemeIcon radius="xl" color={item.color} mb={isMobile && 'sm'} size="xl">{item.icon}</ThemeIcon>
                                        <Text ml={isMobile ? 0 : "sm"} color="dimmed" size={isMobile ? "sm" : "md"}>{item.title}</Text>
                                    </div>
                                    <Title align={isMobile ? 'center' : 'left'} weight={500} style={{ color: '#363636', marginBottom: 10 }} order={isMobile ? 3 : 2}>{item.value}</Title>
                                    <Progress color={item.color} value={75} radius="xl" size={isMobile ? 'sm' : 'md'} />
                                </Paper>                
                            </div>
                        )
                    }
                </div>


            <div className="hide-scrollbar" style={{ display: 'flex', overflowX: 'auto' }}>
                <Paper padding="xl" mr="sm" mb="sm" shadow="sm" style={{ width: 550 }}>
                    <WeightChart modalOpen={weightModalOpen} setModalOpen={setWeightModalOpen} />
                </Paper>
                <Paper padding="xl" shadow="sm" mb="sm" mr="sm" style={{ width: 325 }}>
                    <Title size="xl" order={3} mb="sm">Macro Breakdown 🥧</Title>
                    <MacroChart 
                        modalOpen={mealModalOpen}
                        setModalOpen={setMealModalOpen}
                        mealAdded={mealAdded}
                    />
                </Paper>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', marginRight: 10 }}>
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
                <Paper padding="xl" mb="sm" shadow="sm" style={{ width: isMobile ? '100%' : 550 }}>
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
        </div>
    )
}

export default MainLayout
