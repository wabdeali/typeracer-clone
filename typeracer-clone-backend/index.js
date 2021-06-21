const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3001;

const sentences = require('./utils/sentences');

let activeUsers = [];
let activeSentence = '';
let score = {};

io.on('connection', socket => {
    socket.on('login', username => {
        activeUsers.push({
            username,
            id: socket.id
        });

        io.emit('newuser', activeUsers)

        if (activeSentence === '') {
            activeSentence = getRandomSentence();
        }
        io.emit('sentence', activeSentence);

        if (activeUsers.length >= 2) {
            countdownTimer();
        }

        socket.on('score', newScore => {
            score[newScore.username] = {
                currentWord: newScore.currentWord,
                totalWords: newScore.totalWords,
            }
            console.log(newScore);
            io.emit('scoreUpdate', score);
        })

        socket.on('finalScore', finalScore => {
            io.emit('newFinalScore', finalScore);
        });

    });
    socket.on('disconnect', () => {
        activeUsers.forEach((user, index) => {
            if (user.id === socket.id) {
                activeUsers.splice(index, 1);
                delete score[user.username];
            }
        });
    });
});

const getRandomSentence = () => {
    let tempArray = sentences[Math.floor(Math.random() * sentences.length)].split(
        " "
    );
    tempArray = tempArray.map((word) => word.split(""));
    for (let i = 0; i < tempArray.length - 1; i++) {
        tempArray[i].push(" ");
    }
    return tempArray;
};

const countdownTimer = () => {
    var timeleft = 10;
    const timer = setInterval(function () {
        if (timeleft <= 0) {
            startGame();
            clearInterval(timer);
        }
        io.emit('countdown', timeleft);
        timeleft -= 1;
    }, 1000);
}

const startGame = () => {
    io.emit('start', 'start the game');
}

http.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});