import { useState, useEffect } from 'react'
import { Title, ActionIcon, Modal, NumberInput, Group, Button, Text } from '@mantine/core'
import moment from 'moment'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as ChartTitle,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getWeights, logWeight, deleteWeight } from '../helpers/dashboard'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);

const WeightChart = ({ modalOpen, setModalOpen }) => {
    const [daysSelected, setDaysSelected] = useState(7)
    const [chartReference, setChartReference] = useState()
    const [chartData, setChartData] = useState({})
    const [weightInput, setWeightInput] = useState('')
    const [showDeleteWeightModal, setShowDeleteWeightModal] = useState(false)

    const addWeight = async (e) => {
        e.preventDefault()

        if (weightInput === '') {
            alert("Please enter a weight")
            return false
        } else {
            const loggedWeight = await logWeight(weightInput)
            if (loggedWeight) {
                addData(chartReference, moment(loggedWeight.created_at).format('MM/DD'), loggedWeight.weight)
                setWeightInput('')
                setModalOpen(false)
            }
        }
    }

    const removeWeight = async (e) => {
        e.preventDefault()
        await deleteWeight()
        setShowDeleteWeightModal(false)
        await updateChartData(7)
    }

    const addData = (chart, label, data) => {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }

    const updateChartData = async (days) => {
        const data = await getWeights(days)
        setDaysSelected(days) // Used to active state of buttons
        let weights, labels

        if (data) {
            weights = data.map(weight => weight.weight)
            labels = data.map(weight => moment(weight.created_at).format('MM/DD'))
        }

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Weight (lbs)',
                    data: weights,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        })
    }

    useEffect(() => {
        (async () => { await updateChartData(7) })()
    }, [])

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
            }
        },
    }

    return (
        <>
            <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Log weight">
                <form onSubmit={(e) => addWeight(e)}>
                    <Group direction="column">
                        <NumberInput
                            style={{ width: '100%' }}
                            value={weightInput}
                            onChange={(value) => setWeightInput(value)}
                            size="md"
                            placeholder="Enter your weight (lbs)"
                            label="Your weight"
                            required
                        />
                        <Button type="submit" color="teal" size="md" fullWidth>Submit</Button>
                    </Group>
                </form>
            </Modal>
            <Modal opened={showDeleteWeightModal} onClose={() => setShowDeleteWeightModal(false)} title="Remove Weight">
                <form onSubmit={(e) => removeWeight(e)}>
                    <Text color="dimmed" mb="lg" size="lg" align="center">Are you sure you want to remove the previously logged weight?</Text>
                    <Group position="center">
                        <Button type="submit" color="red" size="md">Submit</Button>
                        <Button color="gray" variant="outline" onClick={() => setShowDeleteWeightModal(false)} size="md">Cancel</Button>
                    </Group>
                </form>
            </Modal>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                <div>
                    <Title size="xl" order={3} m="xs">Your weight 📊</Title>
                </div>
                <div style={{ display: 'flex' }}>
                    <Button size="xs" color="pink" m="xs" ml="0" variant={daysSelected === 7 ? 'filled' : 'light'} onClick={() => updateChartData(7)}>1W</Button>
                    <Button size="xs" color="pink" m="xs" variant={daysSelected === 30 ? 'filled' : 'light'} onClick={() => updateChartData(30)}>1M</Button>
                    <Button size="xs" color="pink" m="xs" variant={daysSelected === 365 ? 'filled' : 'light'} onClick={() => updateChartData(365)}>1Y</Button>
                    <Button size="xs" color="pink" m="xs" variant={daysSelected === 'all' ? 'filled' : 'light'} onClick={() => updateChartData('all')}>All</Button>
                    <ActionIcon color="pink" m="xs" variant="outline" size="md" onClick={() => setModalOpen(true)}><AiOutlinePlus /></ActionIcon>
                    <ActionIcon color="pink" m="xs" variant="outline" size="md" onClick={() => setShowDeleteWeightModal(true)}><AiOutlineMinus /></ActionIcon>
                </div>
            </div>
            {Object.keys(chartData).length ?
                <Line options={options} data={chartData} ref={(reference) => setChartReference(reference)} /> :
                <Group position="center" direction="column">
                    <Text>No weights were logged. Would you like to log a weight?</Text>
                    <Button color="pink" variant="light" onClick={() => setModalOpen(true)}>Log Weight</Button>
                </Group>
            }
        </>
    )
}

export default WeightChart
