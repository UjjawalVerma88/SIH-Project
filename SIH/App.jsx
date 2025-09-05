import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function App() {
  const [data, setData] = useState([{t: 0, score: 90}])
  useEffect(() => {
    const id = setInterval(() => {
      setData(d => [...d.slice(-30), {t: d.length, score: Math.max(0, 100 - Math.random()*30)}])
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{padding:16, fontFamily:'system-ui'}}>
      <h1>Smart Tourism — Dashboard</h1>
      <p>Mapbox/Deck.gl hook & charts demo.</p>

      <div style={{maxWidth:600}}>
        <LineChart width={600} height={260} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="score" dot={false} />
        </LineChart>
      </div>

      <section style={{marginTop:24}}>
        <h3>Quick Links</h3>
        <ul>
          <li>API docs: <a href="http://localhost:8000/docs">/docs</a></li>
          <li>AI docs: <a href="http://localhost:8001/docs">/docs</a></li>
          <li>IoT docs: <a href="http://localhost:8002/docs">/docs</a></li>
        </ul>
      </section>
    </div>
  )
}
