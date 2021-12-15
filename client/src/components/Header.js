import { Title, Button, MediaQuery, Burger, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

const Header = ({ opened, setOpened }) => {
    const theme = useMantineTheme();
    const { signOut } = useAuth()
    const navigate = useNavigate()

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
            />
        </MediaQuery>

        <Title weight={700} order={1}>fitnex</Title>
        <Button color="gray" variant="light" onClick={() => {
            signOut()
            navigate('/sign-in')
        }}>Sign out</Button>
    </div>
    )
}

export default Header
