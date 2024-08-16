import { useState, useRef, useEffect } from 'react'

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0)
  const intervalIdRef = useRef(null)
  const startTimeRef = useRef(0)
  const [mappedTime, setMappedTime] = useState([])

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current)
      }, 10)
    }

    return () => {
      clearInterval(intervalIdRef.current)
    }

  }, [isRunning])

  function Start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime
  }

  function Stop() {
    setIsRunning(false);
  }

  function Reset() {
    setIsRunning(false);
    setElapsedTime(0)
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let milliSeconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliSeconds = String(milliSeconds).padStart(2, "0");

    return `${minutes}:${seconds}:${milliSeconds}`
  }
  function MapTime(formatTime){
    setMappedTime([...mappedTime,formatTime])
  }


  return (
    <div className='box'>
      <span className='timer'>{formatTime()}</span>
      <div>
        <button className='start-btn' onClick={Start}>Start</button>
        <button className='stop-btn' onClick={Stop}>Stop</button>
        <button className='reset-btn' onClick={Reset}>Reset</button>
        <button onClick={() => MapTime(formatTime())}>Map</button>
        {mappedTime.map(el => <li>{el}</li>)}
      </div>
    </div>
  )
}

export default App
