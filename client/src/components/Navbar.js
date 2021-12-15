import { Text, Group, ThemeIcon, Avatar, Navbar as DashboardNavbar } from '@mantine/core';
import { AiOutlinePieChart, AiOutlineUser, AiOutlineSetting, AiOutlineBarChart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Navbar = ({ user, setOpened }) => {
    const navbarItems = [
        {
            name: 'Dashboard',
            route: '/dashboard',
            icon: <AiOutlinePieChart />,
            color: 'orange'
        },
        {
            name: 'Profile',
            route: '/dashboard/profile',
            icon: <AiOutlineUser />,
            color: 'teal'
        },
        {
            name: 'Reports',
            route: '/dashboard/reports',
            icon: <AiOutlineBarChart />,
            color: 'blue'
        },
        {
            name: 'Settings',
            route: '/dashboard/settings',
            icon: <AiOutlineSetting />,
            color: 'violet'
        }
    ]

    return (
        <>
            <DashboardNavbar.Section grow>
                <Group direction="column">
                    {
                        navbarItems.map(item =>
                            <Group key={item.name} onClick={() => setOpened((o) => !o)}>
                                <ThemeIcon color={item.color} variant="light" size="lg">{item.icon}</ThemeIcon>
                                <Link to={item.route}><Text color="gray" size="sm" weight={500}>{item.name}</Text></Link>
                            </Group>
                        )
                    }
                </Group>
            </DashboardNavbar.Section>
            <DashboardNavbar.Section>
                <hr />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginTop: 15 }}>
                    <Avatar src={null} color="blue" radius="xl" />
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                        <Text size="sm" weight={500}>{user.name}</Text>
                        <Text color="dimmed" size="xs">{user.email}</Text>
                    </div>
                </div>

            </DashboardNavbar.Section>
        </>

    )
}

export default Navbar
