import nav from './styles/nav.module.css';

const NavBar = ({ changeName }: { changeName: Function }) => {
  return (
    <div className={nav.bar} style={{ justifyContent: window.innerWidth <= 800 ? 'space-between' : 'space-around' }}>
      <div className={nav.titleBlock}>
        <h2 className={nav.rotText}>
          FIND
        </h2>
        <h1 className={nav.title}>
          WALDO
        </h1>
      </div>
      <form className={nav.inputBlock} style={{ display: window.innerWidth < 400 ? 'none' : 'flex' }} action={changeName}>
        <input type='text' className={nav.input} placeholder='Change your name' name="userName" />
        <button className={nav.button} type="submit">
          Change
        </button>
      </form>
    </div>
  )
}

export default NavBar;
