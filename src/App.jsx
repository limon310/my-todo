import { useState } from 'react'
import Dashboard from './page/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
  //  <h1 className='text-8xl text-center py-10 text-blue-700'>Hellow World</h1>
  <Dashboard></Dashboard>
  )
}

export default App
