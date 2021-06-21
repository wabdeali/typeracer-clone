import React, { useEffect, useState } from 'react'
import styles from '../styles/Results.module.scss'

function Results({ socketRef }) {
    const [finalScores, setFinalScores] = useState([]);

    useEffect(() => {
        socketRef.current.on('newFinalScore', finalScore => {
            setFinalScores(oldArray => [...oldArray, finalScore]);
            console.log('finalScores')
        })
    }, [socketRef])

    return (
        <div className={styles.container}>
            {
                finalScores.map((user => (
                    <div className={styles.card}>
                        <p>{user.username}</p>
                        <span>{`${user.finalScore} WPM`}</span>
                    </div>
                )))
            }
        </div>
    )
}

export default Results
