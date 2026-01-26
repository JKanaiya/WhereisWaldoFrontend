import display from "./styles/charDisplays.module.css"

const DisplayChars = ({ characters, foundChars }: { characters: string[], foundChars: string[] }) => {

  return (
    <footer className={display.block}>
      {characters.map((char) => <img src={`../assets/images/thumbnails/${char}.png`} className={display.characters} style={{ borderRadius: "50%", border: foundChars.includes(char) ? "4px solid green" : "none" }} />)}
    </footer>
  )
}

export default DisplayChars;
