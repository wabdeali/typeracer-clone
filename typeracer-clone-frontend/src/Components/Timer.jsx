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
    )
}

export default Timer
