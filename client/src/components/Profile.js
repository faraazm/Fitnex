import { useState, useEffect } from 'react'
import {
  Avatar,
  Paper,
  Title,
  Text,
  Group,
  Progress,
  Badge,
  Grid,
  Col,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { AiOutlineEdit } from 'react-icons/ai'
import { IoMaleOutline, IoFemaleOutline } from 'react-icons/io5'

const Profile = ({ user }) => {
  const [activityLevel, setActivityLevel] = useState({
      level: 25,
      color: 'red'
  })

  useEffect(() => {
    switch (user.activity) {
        case 1:
            setActivityLevel({
                level: 25,
                color: 'red'
            })
            break
        case 2:
            setActivityLevel({
                level: 50,
                color: 'orange'
            })
            break
        case 3:
            setActivityLevel({
                level: 75,
                color: 'teal'
            })
            break
        case 4:
            setActivityLevel({
                level: 100,
                color: 'green'
            })
            break
        default:
            setActivityLevel({
                level: 0,
                color: 'gray'
            })
    }
  }, [user.activity])

  const cmToInFt = (cm) => {
    const inches = Math.round(cm / 2.54)
    return {
      feet: Math.floor(inches / 12),
      inches: inches % 12,
    }
  }

  const isMobile = useMediaQuery('(max-width: 1000px)')

  return (
    <Paper padding="xl" radius="lg" shadow="sm" mr="lg" style={{ width: isMobile ? '100%' : 850 }}>
      <Group direction="column" position="center" spacing="xs">
        <Avatar
          color={user.gender === 'male' ? 'blue' : 'pink'}
          src={null}
          size="xl"
          radius="xl"
        />
        <Group>
          {user.gender === 'male' ? (
            <IoMaleOutline size={30} color="#238BE6" />
          ) : (
            <IoFemaleOutline size={30} color="#E64980" />
          )}
          <Title>
            {user.name}, {user.age}
          </Title>
          <AiOutlineEdit size={30} color="gray" />
        </Group>
        <Text color="dimmed" mt="0" mb="sm">
          {user.email}
        </Text>
      </Group>
      <Group spacing="xs" position="center">
        <Badge color="teal" variant="dot" size="lg">
          {cmToInFt(user.height)['feet']}' {cmToInFt(user.height)['inches']}"
        </Badge>
        <Badge color="teal" size="lg" variant="dot">
          {user.weight} lbs
        </Badge>
      </Group>

      <Grid>
        <Col span={12} md={6} lg={3}>
          <div style={{ margin: '20px 0px', padding: 10 }}>
            <Title order={2} align="center">
              {user.activity === 1 && 'Low'}
              {user.activity === 2 && 'Average'}
              {user.activity === 3 && 'Moderate'}
              {user.activity === 4 && 'High'}
            </Title>
            <Text color="dimmed" weight={500} mb="sm" align="center">
              Activity Level 🏃
            </Text>
            <Progress color={activityLevel.color} value={activityLevel.level} size="sm" />
          </div>
        </Col>
        <Col span={12} md={6} lg={3}>
          <div style={{ margin: 20, padding: 10 }}>
            <Title order={2} align="center">
              {user.calorieIntake}
            </Title>
            <Text color="dimmed" mb="sm" weight={500} align="center">
              Calorie Intake 🔥
            </Text>
            <Progress color="orange" value={90} size="sm" />
          </div>
        </Col>
        <Col span={12} md={6} lg={3}>
          <div style={{ margin: 20, padding: 10 }}>
            <Title order={2} align="center">
            {cmToInFt(user.height)['feet']} ft {cmToInFt(user.height)['inches']} in
            </Title>
            <Text color="dimmed" weight={500} align="center">
              Height
            </Text>
          </div>
        </Col>
        <Col span={12} md={6} lg={3}>
          <div style={{ margin: 20, padding: 10 }}>
            <Title order={2} align="center">
              {user.weight} lbs
            </Title>
            <Text color="dimmed" weight={500} align="center">
              Weight
            </Text>
          </div>
        </Col>
      </Grid>
    </Paper>
  )
}

export default Profile
