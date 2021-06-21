import React, { useEffect, useState } from 'react'
import styles from '../styles/Status.module.scss'
import Results from './Results';

function Status({ socketRef }) {
    const [activeUsers, setActiveUsers] = useState([]);
    const [score, setScore] = useState();

    useEffect(() => {
        socketRef.current.on('newuser', (activeUsers) => {
            setActiveUsers(activeUsers);
        });
        socketRef.current.on('scoreUpdate', (newScore) => {
            setScore(newScore);
        });
    })

    const getWidthPercentage = (user) => {
        let percentage = (score[user.username].currentWord / score[user.username].totalWords) * 100;
        return `${Math.round(percentage)}%`;
    }

    return (
        <div className={styles.container}>
            {
                activeUsers.map((user, index) => (
                    <div className={styles.scoreContainer} key={index}>
                        <span className={styles.username}>
                            {user.username}
                        </span>
                        <span className={styles.progressBar}>
                            <span className={styles.progress} style={{ width: score && score[user.username] ? getWidthPercentage(user) : '' }}>
                            </span>
                        </span>
                        <span className={styles.percentage}>
                            {score && score[user.username] ? getWidthPercentage(user) : ''}
                        </span>
                    </div>
                ))
            }
        </div>
    )
}

export default Status
