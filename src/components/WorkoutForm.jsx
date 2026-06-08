'use client'
import { useState } from 'react'

const EXERCISES = {
  push: ['Push-ups', 'Bench Press', 'Shoulder Press', 'Dips'],
  pull: ['Pull-ups', 'Rows', 'Deadlift', 'Bicep Curls'],
  legs: ['Squats', 'Lunges', 'Leg Press', 'Calf Raises'],
  cardio: ['Running', 'Cycling', 'Jump Rope', 'Burpees'],
}

export default function WorkoutForm({ onAdd }) {
  const [category, setCategory] = useState('push')
  const [exercise, setExercise] = useState(EXERCISES.push[0])
  const [sets, setSets] = useState(3)
  const [reps, setReps] = useState(10)
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (sets <= 0 || reps <= 0) {
      setError('Sets and reps must be positive')
      return
    }
    setError('')
    onAdd({ id: Date.now(), exercise, sets, reps, date: new Date().toISOString().split('T')[0] })
  }

  return (
    <form onSubmit={submit} className="p-4 bg-slate-800 rounded-lg mb-6">
      <h2 className="font-bold mb-2">Log Exercise</h2>
      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <select value={category} onChange={(e) => { setCategory(e.target.value); setExercise(EXERCISES[e.target.value][0]) }} className="p-2 rounded dark:bg-slate-700">
          {Object.keys(EXERCISES).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={exercise} onChange={(e) => setExercise(e.target.value)} className="p-2 rounded dark:bg-slate-700">
          {EXERCISES[category].map(e => <option key={e} value={e}>{e}</option>)}
        </select>
        <input type="number" value={sets} onChange={(e) => setSets(parseInt(e.target.value) || 0)} className="p-2 rounded dark:bg-slate-700" />
        <input type="number" value={reps} onChange={(e) => setReps(parseInt(e.target.value) || 0)} className="p-2 rounded dark:bg-slate-700" />
      </div>
      <button type="submit" className="px-4 py-2 bg-indigo-600 rounded w-full">Log</button>
    </form>
  )
}
