import { useState } from 'react';
import styles from './App.module.css'
import './styles/reset.css'

function App() {

  const [box, setBox] = useState({ active: false, location: { x: 0, y: 0 } });

  const toggleBoxActive = (ev: { clientX: number, clientY: number }): void | false => {
    if (window.innerWidth * 0.1 > ev.clientX || ev.clientX > window.innerWidth * 0.9 || window.innerHeight * 0.1 > ev.clientY || ev.clientY > window.innerHeight * 0.9) {
      return false
    }
    setBox({ active: !box.active, location: { x: ev.clientX, y: ev.clientY } })
    // TODO: guess should happen here, toggle the box active off after the func check has taken place
  }


  return (
    <div className={styles.body}>
      <div className={styles.box} style={{ position: "absolute", top: box.location.y - 50, left: box.location.x - 50, display: box.active ? "block" : "none" }}></div>
      <div className={styles.picContainer} onClick={toggleBoxActive}>
      </div>
    </div>
  )
}

export default App
