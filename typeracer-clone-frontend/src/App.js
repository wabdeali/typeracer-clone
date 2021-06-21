import { useRef, useState, useEffect } from 'react';
import './App.scss';
import Login from './Components/Login';
import io from 'socket.io-client';
import TypingInterface from './Components/TypingInterface';
import Status from './Components/Status';
import Timer from './Components/Timer';
import Results from './Components/Results';

export function App() {
  const socketRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: '' })

  useEffect(() => {
    socketRef.current = io('http://localhost:3001', {
      transports: ['websocket'],
    });
    socketRef.current.on('newuser', (activeUsers) => {
      console.log(activeUsers);
    })
  }, []);

  if (!isLoggedIn) {
    return (
      <Login
        user={user}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        socketRef={socketRef}
      />
    )
  }

  return (
    <>
      <Timer
        socketRef={socketRef} />
      <Status
        socketRef={socketRef} />
      <TypingInterface
        socketRef={socketRef}
        username={user.username} />
      <Results
        socketRef={socketRef} />
    </>
  );
}

export default App;
