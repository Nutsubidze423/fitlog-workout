'use client'
import { useState, useEffect, useRef } from 'react'

export default function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running && seconds <= 0) {
      setRunning(false)
      return
    }
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s - 1), 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, seconds])

  const format = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  return (
    <div className="p-4 bg-slate-800 rounded-lg mb-6 text-center">
      <h2 className="font-bold mb-2">Rest Timer</h2>
      <div className="text-4xl font-mono mb-4">{format(seconds)}</div>
      <div className="flex justify-center gap-2 mb-2">
        <button onClick={() => setRunning(!running)} className="px-4 py-2 bg-indigo-600 rounded">{running ? 'Pause' : 'Start'}</button>
        <button onClick={() => { setRunning(false); setSeconds(0) }} className="px-4 py-2 bg-slate-700 rounded">Reset</button>
      </div>
      <div className="flex justify-center gap-2">
        {[30, 60, 120].map(s => (
          <button key={s} onClick={() => { setSeconds(s); setRunning(false) }} className="px-2 py-1 text-sm bg-slate-700 rounded">{s}s</button>
        ))}
      </div>
    </div>
  )
}
