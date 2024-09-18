// App.jsx

import { useState } from 'react'
import './styles/application.scss'
import Header from './components/Header'
import Cardlist from './components/CardList'

function App() {
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);

  const updateScore = (newScore) => {
    setScore(newScore);
    if (newScore > topScore) {
      setTopScore(newScore);
    }
  }

  return (
    <div className="container">
      <Header score ={score} topScore={topScore} />
      <Cardlist score={score} setScore={updateScore} />
    </div>
  )
}

export default App
