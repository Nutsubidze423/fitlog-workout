'use client'
import { useState, useEffect } from 'react'
import WorkoutForm from '@/components/WorkoutForm'
import Timer from '@/components/Timer'
import ProgressChart from '@/components/ProgressChart'

export default function Home() {
  const [logs, setLogs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('workouts')) || [] } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(logs))
  }, [logs])

  const addLog = (log) => setLogs([log, ...logs])
  const deleteLog = (id) => setLogs(logs.filter(l => l.id !== id))

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">FitLog Workout</h1>
      <WorkoutForm onAdd={addLog} />
      <Timer />
      <ProgressChart logs={logs} />
      <div className="p-4 bg-slate-800 rounded-lg">
        <h2 className="font-bold mb-2">History</h2>
        <ul className="space-y-1 text-sm">
          {logs.slice(0, 10).map(log => (
            <li key={log.id} className="flex justify-between p-2 bg-slate-700 rounded">
              <span>{log.exercise}</span>
              <span>{log.sets} × {log.reps}</span>
              <button onClick={() => deleteLog(log.id)} className="text-red-400">×</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
