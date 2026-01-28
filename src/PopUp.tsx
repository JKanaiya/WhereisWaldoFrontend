import pop from "./styles/popup.module.css";

const PopUp = ({ popUp, userName, togglePopUpActive, togglePlaying }: { popUp: string, userName: string, togglePlaying: () => void, togglePopUpActive: () => void, setPopUpMsg: (str: string) => void }) => {
  return (
    <div className={pop.popup}>
      {popUp == "firstTime" ? "Welcome to Find Waldo, the goal is to find the 3 characters at the bottom right of your screen. You will be timed. Enjoy!" : popUp}
      <br />
      {popUp != "firstTime" && userName}
      < button style={{ borderRadius: 12, padding: "2%" }} onClick={() => popUp != "firstTime" ? togglePopUpActive() : togglePlaying()}>
        {
          popUp == "firstTime" ? "Start Game" : popUp == "changeName" ? "Confirm Name" : "Submit Score"
        }
      </ button >
    </div >
  )
}

export default PopUp;
