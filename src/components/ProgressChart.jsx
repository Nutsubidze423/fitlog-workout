'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function ProgressChart({ logs }) {
  const data = logs.reduce((acc, log) => {
    const key = log.exercise
    acc[key] = (acc[key] || 0) + log.sets * log.reps
    return acc
  }, {})
  const chartData = Object.entries(data).map(([name, volume]) => ({ name, volume }))

  return (
    <div className="p-4 bg-slate-800 rounded-lg mb-6">
      <h2 className="font-bold mb-2">Progress</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
            <Bar dataKey="volume" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
