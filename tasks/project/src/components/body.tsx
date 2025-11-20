import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import styles from "./body.module.css";
import dataInfo from "./data.json";
interface Data {
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
}
function Body() {
  const [theme, setTheme] = useState(false);
  const [allTasks, setAllTasks] = useState<Data[]>(dataInfo);
  const [all, setAll] = useState(true);
  const [activny, setActivny] = useState(false);
  const [inactive, setInactive] = useState(false);

  function changeTheme() {
    setTheme(!theme);
  }
  useEffect(() => {
    if (theme === false) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [theme]);
  const sun = "./public/icon-sun.svg";
  const moon = "./public/icon-moon.svg";
  const themeImage = theme === false ? sun : moon;
  const themeStyle = theme === false ? styles.moonButton : styles.sunButton;
  const headerStyle = theme === false ? styles.headerDark : styles.headerSun;
  const logoStyle = theme === false ? styles.darkLogo : styles.lightLogo;
  const headerGridStyle =
    theme === false ? styles.headerDarkGrid : styles.headerLightGrid;
  const listStyle = theme === false ? styles.listDark : styles.listLight;
  const boxStyle = theme === false ? styles.boxDark : styles.boxLight;
  const boxContentStyle =
    theme === false ? styles.boxContentDark : styles.boxContentLight;
  const boxStyleText = theme === false ? styles.textDark : styles.textLight;
  const removeStyle = theme === false ? styles.removeDark : styles.removeLight;

  function remove(index: number) {
    const updatedTasks = allTasks.filter((_, i) => i !== index);
    setAllTasks(updatedTasks);
  }
  function All() {
    setAllTasks(dataInfo);
    setAll(true);
    setActivny(false);
    setInactive(false);
  }
  function active() {
    setAllTasks(dataInfo.filter((task) => task.isActive));
    setAll(false);
    setActivny(true);
    setInactive(false);
  }
  function Inactive() {
    setAllTasks(dataInfo.filter((task) => !task.isActive));
    setAll(false);
    setActivny(false);
    setInactive(true);
  }
  function toggleRadio(index: number) {
    const updatedTasks = [...allTasks];
    updatedTasks[index].isActive = !updatedTasks[index].isActive;
    setAllTasks(updatedTasks);
  }
  const allStyles = all === true ? styles.active : styles.noActive;
  const activeStyles = activny === true ? styles.active : styles.noActive;
  const inactiveStyles = inactive === true ? styles.active : styles.noActive;
  return (
    <Fragment>
      <div className={styles.content}>
        <div className={headerStyle}>
          <img src="./public/logo.svg" className={logoStyle} />
          <button className={themeStyle}>
            <img src={themeImage} onClick={changeTheme} />
          </button>
        </div>
        <div className={styles.grid}>
          <div className={headerGridStyle}>
            <h1 className={listStyle}>Extensions List</h1>
            <div className={styles.buttonHeader}>
              <button className={allStyles} onClick={All}>
                All
              </button>
              <button className={activeStyles} onClick={active}>
                Active
              </button>
              <button className={inactiveStyles} onClick={Inactive}>
                Inactive
              </button>
            </div>
          </div>
          <div className={styles.gridContent}>
            {allTasks.map((task, index) => (
              <div key={index} className={boxStyle}>
                <div className={boxContentStyle}>
                  <div className={styles.boxStart}>
                    <div>
                      <img src={task.logo} alt="" />
                    </div>
                    <div className={boxStyleText}>
                      <h1>{task.name}</h1>
                      <p>{task.description}</p>
                    </div>
                  </div>
                  <div className={styles.boxEnd}>
                    <button
                      className={removeStyle}
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>

                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={task.isActive}
                        onChange={() => toggleRadio(index)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Body;
