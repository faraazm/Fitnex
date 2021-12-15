import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Text, Button, Group } from '@mantine/core'
import { getMacros } from '../helpers/dashboard'

ChartJS.register(ArcElement, Tooltip, Legend);

const MacroChart = ({ modalOpen, setModalOpen, mealAdded }) => {
    const [chartData, setChartData] = useState({})

    const fetchMacros = async () => {
        const macros = await getMacros()
        setChartData({}) // reset chart data

        if (macros && macros.hasOwnProperty('protein') && macros.hasOwnProperty('carbs') && macros.hasOwnProperty('fats')) {
            setChartData({
                labels: ['Proteins', 'Carbs', 'Fats'],
                datasets: [
                    {
                        label: '# of Votes',
                        data: [macros.protein, macros.carbs, macros.fats],
                        backgroundColor: [
                            '#ffee6b',
                            '#eb347d',
                            '#7559ff',
                        ],
                    },
                ],
            })
        }
    }

    useEffect(() => {
        (async () => { await fetchMacros() })()
    }, [])

    useEffect(() => {
        (async () => { await fetchMacros() })()
    }, [mealAdded])

    const options = {
        repsonsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
            }
        },
    }

    return (
        <>
            {
                Object.keys(chartData).length ?
                    <Pie data={chartData} options={options} /> :
                    <Group direction="column">
                        <Text color="dimmed">It looks like you don't have any meals logged for today. To get a macro breakdown, log a meal 😋</Text>
                        <Button color="violet" variant="light" onClick={() => setModalOpen(true)}>Add Meal</Button>
                    </Group>
            }
        </>
    )
}

export default MacroChart
