import { useId, useState } from "react";
import styles from "./App.module.css";
import "./styles/reset.css";
import pictures from "../assets/pictureData.json";
import ApiCall from "./apiCalls.js";
import DisplayChars from "./charDisplay.js";
import NavBar from "./navBar.js";

function App() {
  const [box, setBox] = useState({ active: false, location: { x: 0, y: 0 } });
  // TODO: the below would be used in the case that i were to add a picture. It would be used to switch the current picture to the desired one
  // const [picture, setPicture] = useState();
  const randName = useId();
  const initName = localStorage.getItem('initName');
  const [userName, setUserName] = useState(initName ? initName : randName)
  const [foundChars, setFoundChars] = useState([])
  const [blur, setBlur] = useState(false)

  const toggleBoxActive = (ev: {
    clientX: number;
    clientY: number;
  }): void | false => {
    if (!box.active) {
      if (
        window.innerWidth * 0.1 > ev.clientX ||
        ev.clientX > window.innerWidth * 0.9 ||
        window.innerHeight * 0.1 > ev.clientY ||
        ev.clientY > window.innerHeight * 0.9
      ) {
        setBox({
          active: false,
          location: {
            x: ev.clientX,
            y: ev.clientY,
          },
        });
        return false;
      }
    }

    setBox({ active: true, location: { x: ev.clientX, y: ev.clientY } });
  };

  const changeName = async (char: string) => {
    try {
      ApiCall.editName({ name: char })
    } catch (err) {
      //TODO: snacks to alert the user that the name change failed
      console.log(err);
    }
  }

  const makeGuess = async (char: string) => {
    const imageSizeX = window.innerWidth - window.innerWidth * 0.2;
    const imageSizeY = window.innerHeight - window.innerHeight * 0.2;

    console.log(box.location);

    const guessPercentage = {
      x:
        (box.location.x - (window.innerWidth - window.innerWidth * 0.8)) /
        imageSizeX,
      y:
        (box.location.y - (window.innerHeight - window.innerHeight * 0.8)) /
        imageSizeY,
    };

    console.log(guessPercentage);

    switch (true) {
      case window.innerWidth <= 1800 && window.innerWidth > 1300:
        localStorage.setItem("dimension", "1800");
        break;
      case window.innerWidth < 1300 && window.innerWidth > 840:
        localStorage.setItem("dimension", "1200");
        break;
      case window.innerWidth < 840 && window.innerWidth > 600:
        localStorage.setItem("dimension", "800");
        break;
      case window.innerWidth < 600 && window.innerWidth > 400:
        localStorage.setItem("dimension", "600");
        break;
      case window.innerWidth < 400:
        localStorage.setItem("dimension", "400");
        break;
      default:
        localStorage.setItem("dimension", "default");
        break;
    }

    if (!localStorage.getItem("initName")) {
      localStorage.setItem("initName", randName);
    }

    const picture = pictures.pictures[0];

    try {
      const result = await ApiCall.makeGuess({
        x: guessPercentage.x,
        y: guessPercentage.y,
        name: char,
        pictureId: picture.id,
      });

      if (result.data.hit) {
        setFoundChars([...foundChars, char]);
      } else {
        //TODO: snacks to alert the user that they missed
        console.log("miss");
      }

    } catch (error) {
      console.log(error);
    }
    return false;
  };

  return (
    <div className={styles.body} >
      <NavBar
        changeName={changeName}
      />
      <div
        className={styles.box}
        style={{
          position: "absolute",
          top: box.location.y - 50,
          left: box.location.x - 50,
          display: box.active ? "block" : "none",
        }}
      >
        <div
          className="guessOptions"
          style={{
            transform:
              window.innerWidth - box.location.x > window.innerWidth * 0.5
                ? "translateX(100px)"
                : "translateX(-100px)",
          }}
        >
          {pictures.pictures[0].characters.map((char) => (
            <option
              value={pictures.pictures[0].characters.indexOf(char)}
              style={{ backgroundColor: "teal", padding: "2%", marginBottom: 1, borderRadius: 3 }}
              onClick={() => makeGuess(char)}
            >
              {char}
            </option>
          ))}
        </div>
      </div>
      <div id={styles.constrict} >
        <div className={styles.picContainer} onClick={toggleBoxActive} style={{ backgroundPosition: window.innerWidth >= 1200 ? "center" : "right 25%", backgroundAttachment: window.innerWidth >= 1200 ? "local" : "scroll local" }} >
        </div>
      </div>
      <DisplayChars
        characters={pictures.pictures[0].characters}
        foundChars={foundChars}
      />
    </div>
  );
}

export default App;
