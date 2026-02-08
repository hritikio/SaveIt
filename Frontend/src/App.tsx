import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './Components/UI/Button'
import { PlusIcon } from './Icons/PlusIcon'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button startIcon={<PlusIcon size="lg"/>} variant="primary" text="Share"  onClick={()=>{}} />
      <Button variant="primary" text="Share" size="md" onClick={()=>{}} />
      <Button variant="secondary" text="share" size="lg" onClick={()=>{}}/>
    </>
  );
}

export default App
