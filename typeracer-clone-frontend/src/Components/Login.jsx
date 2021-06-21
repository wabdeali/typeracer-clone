import { Box, Button, Card, CardBody, grommet, Grommet, TextInput } from 'grommet';
import { User } from 'grommet-icons';
import { useEffect } from 'react';

function Login({ user, setUser, setIsLoggedIn, socketRef }) {
    //Enabling Enter to submit
    useEffect(() => {
        const listener = event => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                loginUser();
            }
        }
        document.addEventListener('keydown', listener);
        return () => {
            document.removeEventListener('keydown', listener);
        }
    })

    const loginUser = () => {
        socketRef.current.emit('login', user.username)
        setIsLoggedIn(true);
    }

    return (
        <Grommet theme={grommet}>
            <Box
                align="center"
                justify="center"
                height="100vh"
            >
                <Card
                    height="medium"
                    width="medium"
                    background="light-1"
                    align="center"
                >
                    <CardBody
                        direction="column"
                        align="center"
                        justify="center"
                    >
                        <Box margin={{ "bottom": 'large' }}>
                            <User
                                size="xlarge"
                            />
                        </Box>
                        <Box margin={{ 'bottom': 'small' }}>
                            <TextInput
                                placeholder="Username"
                                value={user.username}
                                onChange={e => setUser({ username: e.target.value })}
                            />
                        </Box>
                        <Button
                            primary
                            size="medium"
                            onClick={() => loginUser()}
                            label="Login"
                        >
                        </Button>
                    </CardBody>
                </Card>
            </Box>
        </Grommet>
    )
}

export default Login;
