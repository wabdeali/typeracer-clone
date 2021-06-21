import { useEffect } from 'react';
import styles from "../styles/Login.module.scss"

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
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h1>typeracer-clone</h1>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={user.username}
                    onChange={e => setUser({ username: e.target.value })}
                />
                <button
                    className="buttonPrimary"
                    size="medium"
                    onClick={() => loginUser()}
                >
                    join
                </button>
            </div>
        </div>
    )
}

export default Login;
