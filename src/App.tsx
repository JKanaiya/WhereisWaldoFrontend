import { useState } from 'react';
import styles from './App.module.css'
import './styles/reset.css'
import pictures from '../assets/pictureData.json';


function App() {

  const [box, setBox] = useState({ active: false, location: { x: 0, y: 0 } });
  const [winState, setWinState] = useState(false)

  const getImageDimensions = (): void => {
    // TODO: This should be an object with the values calculated in the form {x: bla, y: bla}
    const imageSizeX = (window.innerWidth - window.innerWidth * 0.2);
    console.log(`imdata: ${imageSizeX}, \n sdata: ${window.innerWidth}`);

    // in order for the lcoation clicked to be used to obtain the percentage of the screen, the spawnBox has to take be scaled down to the scale of the image given in the json, 
    // so the eqaution would be -> (spawnBox location - 80% of the screen) / image size on curent screen width
  }

  const toggleBoxActive = (ev: { clientX: number, clientY: number }): void | false => {
    getImageDimensions()

    if (window.innerWidth * 0.1 > ev.clientX || ev.clientX > window.innerWidth * 0.9 || window.innerHeight * 0.1 > ev.clientY || ev.clientY > window.innerHeight * 0.9) {
      setBox({
        active: false,
        location: {
          x: ev.clientX,
          y: ev.clientY,
        }
      })
      return false
    }

    setBox({ active: true, location: { x: ev.clientX, y: ev.clientY } })

    if (makeGuess()) {
      console.log("Win")
      setWinState(true)
    } else {
      console.log("Loss")
      setWinState(false)
    }
  }

  const makeGuess = (): boolean => {

    // TODO: will need to account for the fact that the guess should be adjusted in the same manner as the box
    // check x , replace 1000 with the location(range) of the char in the picture 
    //
    // TODO: This should be an object with the values calculated in the form {x: bla, y: bla}
    const imageSizeX = (window.innerWidth - window.innerWidth * 0.2);
    const imageSizeY = (window.innerHeight - window.innerHeight * 0.2);

    // in order for the lcoation clicked to be used to obtain the percentage of the screen, the spawnBox has to take be scaled down to the scale of the image given in the json, 
    // so the eqaution would be -> (spawnBox location - 80% of the screen) / image size on curent screen width
    console.log(`x location clicked: ${(box.location.x - (window.innerWidth - window.innerWidth * 0.8)) / imageSizeX}\n`)
    console.log(`y location clicked: ${(box.location.y - (window.innerHeight - window.innerHeight * 0.8)) / imageSizeY}`)

    const guessPercentage = {
      x: (box.location.x - (window.innerWidth - window.innerWidth * 0.8)) / imageSizeX,
      y: (box.location.y - (window.innerHeight - window.innerHeight * 0.8)) / imageSizeY,
    }

    // TODD: this range should be adjusted as the screen size changes
    const waldo = pictures.pictures[0].dimensions.default.waldo;
    if (guessPercentage.x >= (waldo.x - 0.07) && guessPercentage.x <= (waldo.x + 0.07)) {
      // check y 
      if (guessPercentage.y >= (waldo.y - 0.07) && guessPercentage.y <= (waldo.y + 0.07)) {
        return true
      }
    }
    return false
  }


  return (
    <div className={styles.body} onClick={toggleBoxActive}>
      <div className={styles.box} style={{ position: "absolute", top: box.location.y - 50, left: box.location.x - 50, display: box.active ? "block" : "none" }}>
        <div className='guessOptions' style={{ transform: (window.innerWidth - box.location.x > window.innerWidth * 0.5) ? "translateX(100px)" : "translateX(-100px)" }}>
          <option value="1" style={{ backgroundColor: "green" }}>bla1</option>
          <option value="2" style={{ backgroundColor: "blue" }}>bla2</option>
          <option value="3" style={{ backgroundColor: "orange" }}>bla3</option>
        </div>
      </div>
      <div className={styles.picContainer} >
        <img src="../assets/images/waldoMuseum.webp" alt="waldoMuseum"
        />
      </div>
      <p>
        {`bla: ${winState}`}
      </p>
    </div>
  )
}

export default App
