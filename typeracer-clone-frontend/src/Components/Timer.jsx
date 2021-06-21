import React, { useEffect, useState } from 'react'
import styles from '../styles/Timer.module.scss';

function Timer({ socketRef }) {
    const [countdownTimer, setCountdownTimer] = useState();
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        socketRef.current.on('countdown', (countdownTimer) => setCountdownTimer(countdownTimer));
        socketRef.current.on('start', () => setIsStarted(true));
    }, [socketRef])

    return (
        <div className={styles.container}>
            <h1>typeracer-clone</h1>
            <div className={styles.timerContainer}>
                <span className={styles.timer}>
                    {
                        countdownTimer ?
                            `${countdownTimer}s`
                            : isStarted ?
                                'Start Typing!'
                                : 'Waiting for other players to join..'
                    }
                </span>
            </div>
        </div>
    )
}

export default Timer
