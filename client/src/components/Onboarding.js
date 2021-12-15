import { Grid, Col, Text, TextInput, NumberInput, Select, Space, Button, Title, Center, RadioGroup, Radio } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import axios from 'axios'

const Onboarding = () => {
    const [sliderIndex, setSliderIndex] = useState(1)

    // Form Fields
    const [nameError, setNameError] = useState('')
    const [ageError, setAgeError] = useState('')
    const [genderError, setGenderError] = useState('')
    const [weightError, setWeightError] = useState('')
    const [feetError, setFeetError] = useState('')
    const [inchesError, setInchesError] = useState('')
    const [activityError, setActivityError] = useState('')
    const [calorieIntakeError, setCalorieIntakeError] = useState('')
    const [goal, setGoal] = useState('lose')
    const [calorieIntake, setCalorieIntake] = useState('')
    
    const navigate = useNavigate()

    const form = useForm({
        initialValues: {
            name: '',
            age: '',
            gender: '',
            weight: '',
            feet: null,
            inches: null,
            activity: null
        },
        validationRules: {
            name: (value) => {
                if (value.trim() === '') {
                    setNameError('Name is required.')
                    return false
                } else if (value.trim().length > 30) {
                    setNameError('Name must be less than 30 characters.')
                    return false
                }

                return true
            },
            age: (value) => {
                if (!value) {
                    setAgeError('Age is required.')
                    return false
                } else if (value < 0 || value > 110) {
                    setAgeError('Age must be between 0 and 110.')
                    return false
                }

                return true
            },
            gender: (value) => {
                if (value.trim() === '') {
                    setGenderError('Gender is required.')
                    return false
                }

                return true
            },
            weight: (value) => {
                if (!value) {
                    setWeightError('Weight is required.')
                    return false
                } else if (value < 0 || value > 500) {
                    setWeightError('Weight must be between 0 and 500.')
                    return false
                }

                return true
            },
            feet: (value) => {
                if (value === '') {
                    setFeetError('Feet is required.')
                    return false
                } else if (value < 0 || value > 7) {
                    setFeetError('Up to 7 feet is allowed.')
                    return false
                }

                return true
            },
            inches: (value) => {
                if (value === '') {
                    setInchesError('Inches is required.')
                    return false
                } else if (value < 0 || value > 11) {
                    setInchesError('Up to 11 inches is allowed.')
                    return false
                }

                return true
            },
            activity: (value) => {
                if (value === '') {
                    setActivityError('Activity is required.')
                    return false
                }

                return true
            }
        }
    })

    const submitOnboarding = async () => {
        const { name, age, gender, feet, inches, weight, activity } = form.values
        const totalInches = parseInt(feet) * 12 + parseInt(inches)
        const heightInCentimeters = totalInches * 2.54

        try {
            const response = await axios.post('/api/onboarding/', {
                name,
                age,
                gender,
                height: heightInCentimeters,
                weight,
                activity,
                goal,
                calorieIntake
            })
            
            localStorage.setItem('completedMeasurements', response.data.completedMeasurements)
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        if (sliderIndex === 3) {
            setCalorieIntake('')
            await submitOnboarding()
        } else if (sliderIndex === 4) {
            if (!calorieIntake) {
                setCalorieIntakeError('Nice try. You must enter something before you submit!')
            } else {
                setCalorieIntakeError('')
                setGoal('')
                await submitOnboarding()
            }
        }
    }

    const { signOut } = useAuth()
    const handleSignOut = () => {
        signOut()
        navigate('/sign-in')
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 10 }}>
                <Button color="gray" variant="light" size="md" onClick={() => handleSignOut()}>Sign out</Button>
            </div>

            <Center>
                <div style={{ width: 550, paddingRight: 20, paddingLeft: 20, margin: '20px 0px' }}>
                    {sliderIndex !== 1 && <Button color="gray" variant="light" mb="xl" onClick={() => {
                        if (sliderIndex === 2) setSliderIndex(1)
                        if (sliderIndex === 3 || sliderIndex === 4) setSliderIndex(2)
                    }}>Go Back</Button>}
                    <Title mb="sm" mt="xl" align="center" size="xl" weight={600}>
                        {sliderIndex === 1 && "✨ Let's get started ✨"}
                        {sliderIndex === 2 && "Let's set your goals 🎯"}
                        {sliderIndex === 3 && "What is your goal? 🤔"}
                        {sliderIndex === 4 && "Your own calorie intake 🔥"}
                    </Title>
                    <Text color="gray" size="lg" mb="sm" align="center">
                        {sliderIndex === 1 && "We need some of your information to decide what is the best calorie intake for you."}
                        {sliderIndex === 2 && "Would you like to set your own daily calorie intake, or would you want us to calculate it for you?"}
                        {sliderIndex === 3 && "Select your goal - lose, maintain, or gain weight. Don't worry though, you can change this anytime!"}
                        {sliderIndex === 4 && "We guess you already have it figured it out. Don't worry though, you can change your calorie intake anytime!"}
                    </Text>
                    <Space h="md" />
                    <form onSubmit={form.onSubmit(() => setSliderIndex(sliderIndex + 1))} style={{ width: '100%' }}>
                        {sliderIndex === 1 &&
                            <Grid>
                                <Col span={12} >
                                    <TextInput
                                        size="md"
                                        placeholder="Your name"
                                        label="Name"
                                        error={form.errors.name && nameError}
                                        value={form.values.name}
                                        onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                        required
                                    />
                                </Col>
                                <Col span={6}>
                                    <NumberInput
                                        size="md"
                                        min={1}
                                        max={100}
                                        placeholder="Your age"
                                        label="Age"
                                        error={form.errors.age && ageError}
                                        value={form.values.age}
                                        onChange={(value) => form.setFieldValue('age', value)}
                                        hideControls
                                        required
                                    />
                                </Col>
                                <Col span={6}>
                                    <Select
                                        size="md"
                                        label="Gender"
                                        placeholder="Your gender"
                                        transition="pop-top-left"
                                        transitionDuration={80}
                                        transitionTimingFunction="ease"
                                        error={form.errors.gender && genderError}
                                        value={form.values.gender}
                                        onChange={(value) => form.setFieldValue('gender', value)}
                                        data={[
                                            { value: 'male', label: 'Male' },
                                            { value: 'female', label: 'Female' },
                                        ]}
                                        required
                                    />
                                </Col>
                                <Col span={12}>
                                    <NumberInput
                                        size="md"
                                        min={1}
                                        max={1000}
                                        error={form.errors.weight && weightError}
                                        value={form.values.weight}
                                        onChange={(value) => form.setFieldValue('weight', value)}
                                        placeholder="Your weight"
                                        label="Weight (lbs)"
                                        hideControls
                                        required
                                    />
                                </Col>
                                <Col span={6}>
                                    <Select
                                        size="md"
                                        label="Feet"
                                        placeholder="Feet"
                                        searchable
                                        nothingFound="No options"
                                        transition="pop-top-left"
                                        transitionDuration={80}
                                        transitionTimingFunction="ease"
                                        required
                                        error={form.errors.feet && feetError}
                                        value={form.values.feet}
                                        onChange={(value) => form.setFieldValue('feet', value)}
                                        data={[
                                            { value: '1', label: '1 feet' },
                                            { value: '2', label: '2 feet' },
                                            { value: '3', label: '3 feet' },
                                            { value: '4', label: '4 feet' },
                                            { value: '5', label: '5 feet' },
                                            { value: '6', label: '6 feet' },
                                            { value: '7', label: '7 feet' },
                                        ]}
                                    />
                                </Col>
                                <Col span={6}>
                                    <Select
                                        size="md"
                                        label="Inches"
                                        placeholder="Inches"
                                        searchable
                                        nothingFound="No options"
                                        transition="pop-top-left"
                                        transitionDuration={80}
                                        transitionTimingFunction="ease"
                                        required
                                        error={form.errors.inches && inchesError}
                                        value={form.values.inches}
                                        onChange={(value) => form.setFieldValue('inches', value)}
                                        data={[
                                            { value: '1', label: '1 inch' },
                                            { value: '2', label: '2 inches' },
                                            { value: '3', label: '3 inches' },
                                            { value: '4', label: '4 inches' },
                                            { value: '5', label: '5 inches' },
                                            { value: '6', label: '6 inches' },
                                            { value: '7', label: '7 inches' },
                                            { value: '8', label: '8 inches' },
                                            { value: '9', label: '9 inches' },
                                            { value: '10', label: '10 inches' },
                                            { value: '11', label: '11 inches' },
                                        ]}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Select
                                        size="md"
                                        label="Activity Level"
                                        placeholder="Select activity level"
                                        searchable
                                        nothingFound="No options"
                                        transition="pop-top-left"
                                        transitionDuration={80}
                                        transitionTimingFunction="ease"
                                        error={form.errors.activity && activityError}
                                        value={form.values.activity}
                                        onChange={(value) => form.setFieldValue('activity', value)}
                                        required
                                        data={[
                                            { value: '1', label: 'No activity' },
                                            { value: '2', label: 'Little activity' },
                                            { value: '3', label: 'Moderate activity' },
                                            { value: '4', label: 'Active' },
                                        ]}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Button type="submit" size="md" style={{ width: '100%' }} color="teal" variant="light">
                                        Next
                                    </Button>
                                </Col>
                            </Grid>}
                        {
                            sliderIndex === 2 &&
                            <Grid>
                                <Col span={6}>
                                    <Button size="md" color="teal" variant="light" onClick={() => setSliderIndex(3)}>Go with recommendation</Button>
                                </Col>
                                <Col span={6}>
                                    <Button size="md" color="gray" variant="light" onClick={() => setSliderIndex(4)}>Enter my own calorie intake</Button>
                                </Col>
                            </Grid>
                        }
                        {
                            sliderIndex === 3 &&
                            <Grid>
                                <Col span={12}>
                                    <RadioGroup
                                        color="teal"
                                        variant="vertical"
                                        value={goal}
                                        onChange={setGoal}
                                        label="Your Goal"
                                        required
                                    >
                                        <Radio value="lose">Lose weight</Radio>
                                        <Radio value="maintain">Maintain weight</Radio>
                                        <Radio value="gain">Gain weight</Radio>
                                    </RadioGroup>
                                </Col>
                            </Grid>
                        }
                        {
                            sliderIndex === 4 &&
                            <Grid>
                                <Col span={12}>
                                    <NumberInput
                                        label="Calorie Intake"
                                        placeholder="Your desired calorie intake"
                                        size="md"
                                        min={1}
                                        max={10000}
                                        value={calorieIntake}
                                        onChange={(value) => {
                                            if (value) {
                                                setCalorieIntakeError('')
                                            }
                                            setCalorieIntake(value)
                                        }}
                                        error={calorieIntakeError}
                                        hideControls
                                        required
                                    />
                                </Col>
                            </Grid>
                        }
                        {
                            sliderIndex === 3 || sliderIndex === 4 ?
                                <Button mt="xl" size="md" color="teal" variant="light" fullWidth={true} onClick={handleSubmit}>Submit</Button> :
                                ''
                        }
                    </form>
                </div>
            </Center>
        </>
    )
}

export default Onboarding
