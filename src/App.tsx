import { useState } from 'react';
import styles from './App.module.css'
import './styles/reset.css'
import pictures from '../assets/pictureData.json';


function App() {

  const [box, setBox] = useState({ active: false, location: { x: 0, y: 0 } });
  const [winState, setWinState] = useState(false)

  const toggleBoxActive = (ev: { clientX: number, clientY: number }): void | false => {
    if (!box.active) {
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
    }

    setBox({ active: true, location: { x: ev.clientX, y: ev.clientY } })
  }

  const makeGuess = (char: string): boolean => {
    let guess;
    // TODO: This should be an object with the values calculated in the form {x: bla, y: bla}, basically change this to the diemnsions from the JSON

    const imageSizeX = (window.innerWidth - window.innerWidth * 0.2);
    const imageSizeY = (window.innerHeight - window.innerHeight * 0.2);

    const guessPercentage = {
      x: (box.location.x - (window.innerWidth - window.innerWidth * 0.8)) / imageSizeX,
      y: (box.location.y - (window.innerHeight - window.innerHeight * 0.8)) / imageSizeY,
    }

    const charExists = pictures.pictures[0].characters.find((c) => c.name == char)

    if (charExists) {
      switch (char) {
        case "waldo":
          guess = pictures.pictures[0].characters[0];
          break;
        // other chars here
        default:
          guess = pictures.pictures[0].characters[0];
          break;
      }

      let guessDim = guess.max1800;


      switch (true) {
        case window.innerWidth <= 1800 && window.innerWidth > 1300:
          guessDim = guess.max1800;
          break;
        case window.innerWidth < 1300 && window.innerWidth > 800:
          guessDim = guess.max1200;
          break;
        case window.innerWidth < 800 && window.innerWidth > 600:
          guessDim = guess.max800;
          break;
        case window.innerWidth < 600 && window.innerWidth > 400:
          guessDim = guess.max600;
          break;
        case window.innerWidth < 400:
          guessDim = guess.max400;
          break;
        default:
          break;
      }

      console.log(guessDim);

      console.log(guessPercentage);


      if (guessPercentage.x >= (guessDim.x - (guessDim.range ? guessDim.range : 0.03)) && guessPercentage.x <= (guessDim.x + (guessDim.range ? guessDim.range : 0.03))) {
        console.log("bla");

        if (guessPercentage.y >= (guessDim.y - (guessDim.range ? guessDim.range : 0.07)) && guessPercentage.y <= (guessDim.y + (guessDim.range ? guessDim.range : 0.07))) {
          console.log("Win")
          setWinState(true)
          return true
        } else {
          console.log("Loss")
          setWinState(false)
          return false
        }
      }
    } else {
      console.log("Loss")
      setWinState(false)
      console.error("invalid char name");
      return false
    }

    return false
  }

  return (
    <div className={styles.body} >
      <div className={styles.box} style={{ position: "absolute", top: box.location.y - 50, left: box.location.x - 50, display: box.active ? "block" : "none" }}>
        <div className='guessOptions' style={{ transform: (window.innerWidth - box.location.x > window.innerWidth * 0.5) ? "translateX(100px)" : "translateX(-100px)" }}>
          {pictures.pictures[0].characters.map((char) =>
            <option value={pictures.pictures[0].characters.indexOf(char)} style={{ backgroundColor: "teal" }} onClick={() => makeGuess(char.name)}>{char.name}</option>
          )}
        </div>
      </div>
      <div className={styles.picContainer} onClick={toggleBoxActive}>
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
