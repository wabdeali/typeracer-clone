import { grommet, Grommet } from 'grommet';
import React, { useEffect, useRef, useState } from 'react'

function TypingInterface({ socketRef, username }) {
    const textInputRef = useRef(null);
    const times = useRef({
        startTime: null,
        endTime: null,
        timeDifference: null
    });
    const [sentenceArray, setSentenceArray] = useState([]);
    const [typedWord, setTypedWord] = useState("");
    const [currentWord, setCurrentWord] = useState(0);
    const [correctLettersArray, setCorrectLettersArray] = useState([]);

    useEffect(() => {
        console.log('reached useEffect')
        socketRef.current.on('sentence', sentenceArray => {
            console.log(sentenceArray)
            setSentenceArray(sentenceArray);
        })
        socketRef.current.on('start', () => {
            startTest();
        })
    }, [socketRef]);

    useEffect(() => {
        if (currentWord === sentenceArray.length && sentenceArray.length !== 0) {
            textInputRef.current.blur();
            times.current.endTime = performance.now();
            times.current.timeDifference =
                (times.current.endTime - times.current.startTime) / 1000;
            const wordsPerMinute =
                (60 * sentenceArray.length) / times.current.timeDifference;
            socketRef.current.emit('finalScore', {
                username: username,
                finalScore: Math.round(wordsPerMinute),
            });
            return;
        }
    }, [currentWord, sentenceArray.length, socketRef, username]);

    const newLetter = (event) => {
        if (event.target.value.length > sentenceArray[currentWord].length) return;
        setTypedWord(event.target.value);

        let tempArray = [];
        for (let i = 0; i < event.target.value.length; i++) {
            if (event.target.value[i] === sentenceArray[currentWord][i])
                tempArray.push("correct");
            else tempArray.push("wrong");
        }
        setCorrectLettersArray(tempArray);
        if (
            tempArray.length === sentenceArray[currentWord].length &&
            !tempArray.includes("wrong")
        ) {
            setCurrentWord(currentWord + 1);
            socketRef.current.emit('score', {
                username: username,
                currentWord: currentWord + 1,
                totalWords: sentenceArray.length,
            })
            setTypedWord("");
            setCorrectLettersArray([]);
        }
    };

    const startTest = () => {
        textInputRef.current.focus();
        times.current.startTime = performance.now();
    };

    return (
        <Grommet theme={grommet}>
            <div className="App">
                <h1>Test your Typing Speed</h1>
                <div className="textArea" onClick={() => times.current.startTime ? textInputRef.current.focus() : null}>
                    {sentenceArray.map((word, wordIndex) => (
                        <span
                            key={wordIndex}
                            className={wordIndex < currentWord ? "correct" : ""}
                        >
                            {word.map((letter, letterIndex) => (
                                <span
                                    key={letterIndex}
                                    className={
                                        wordIndex === currentWord
                                            ? correctLettersArray[letterIndex]
                                                ? correctLettersArray[letterIndex]
                                                : letterIndex === correctLettersArray.length
                                                    ? "currentLetter"
                                                    : ""
                                            : ""
                                    }
                                >
                                    {letter}
                                </span>
                            ))}
                        </span>
                    ))}
                </div>
                <div>
                    <input
                        id="textInput"
                        type="text"
                        ref={textInputRef}
                        value={typedWord}
                        onChange={(e) => newLetter(e)}
                        style={{ width: "0", opacity: "0" }}
                    />
                </div>
            </div>
        </Grommet>
    );
}

export default TypingInterface
