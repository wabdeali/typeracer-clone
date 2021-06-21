import React, { useEffect, useState } from 'react'
import styles from '../styles/Results.module.scss'

function Results({ socketRef }) {
    const [finalScores, setFinalScores] = useState([]);

    useEffect(() => {
        socketRef.current.on('newFinalScore', finalScore => {
            setFinalScores(oldArray => [...oldArray, finalScore]);
        })
    }, [socketRef])

    if (finalScores.length === 0) return null

    return (
        <>
            <div className={styles.container}>
                <h2>RESULTS</h2>
                <div className={styles.tableContainer}>
                    {
                        finalScores.map(((user, index) => (
                            <div className={styles.row} key={index}>
                                <p>{index + 1}</p>
                                <p className={styles.username}>{user.username}</p>
                                <p className={styles.score}>{`${user.finalScore} WPM`}</p>
                            </div>
                        )))
                    }
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className="buttonPrimary" onClick={() => window.location.reload()}>Play again</button>
            </div>
        </>
    )
}

export default Results
