import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { AppShell, Header, Navbar, Text } from '@mantine/core';
import { getCurrentUser } from '../helpers/dashboard'
import NavbarContent from './Navbar'
import HeaderContent from './Header'
import MainLayout from './MainLayout'
import Profile from './Profile'

const Dashboard = () => {
    const [opened, setOpened] = useState(false);
    const [user, setUser] = useState({})

    useEffect(() => {
        (async () => {
            const user = await getCurrentUser()
            if (user) setUser(user)
        })()
    }, [])

    return (
        <AppShell
            style={{ backgroundColor: '#fafafa' }}
            navbarOffsetBreakpoint="sm"
            fixed
            navbar={
                <Navbar
                    padding="md"
                    hiddenBreakpoint="sm"
                    hidden={!opened}
                    width={{ sm: 250, lg: 300 }}
                >
                    <NavbarContent user={user} />
                </Navbar>
            }
            header={
                <Header height={70} padding="md">
                    <HeaderContent opened={opened} setOpened={setOpened} />
                </Header>
            }
        >
            <Routes>
                <Route path="/" element={<MainLayout user={user} />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/reports" element={<Text>Test</Text>} />
                <Route path="/settings" element={<Text>Test</Text>} />
            </Routes>
        </AppShell>
    );
}

export default Dashboard
