import { Fragment } from "react/jsx-runtime";
import { use, useEffect, useState } from "react";
import styles from "./body.module.css";

function Body() {
  const languages = ["HTML", "CSS", "REACT", "JAVASCRIPT", "GIT", "JAVA", "C#"];
  const [theme, setTheme] = useState(false);
  function ChangeTheme() {
    setTheme(!theme);
  }
  useEffect(() => {
    if (theme) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "#F0E6AA";
      document.body.style.color = "black";
    }
  }, [theme]);
  const sun = "./public/sunny.png";
  const moon = "./public/full-moon.png";
  const themeImg = theme === true ? moon : sun;
  const languageStyle =
    theme === true ? styles.darkLanguages : styles.lightLanguages;
  return (
    <Fragment>
      <div className={styles.bodyContent}>
        <img
          onClick={ChangeTheme}
          className={styles.themeIcon}
          src={themeImg}
        />
        <img
          className={styles.logo}
          src="https://cdn.vectorstock.com/i/500p/40/52/dungeon-master-wizard-clip-art-vector-55974052.jpg"
        />
        <h1>Vladislav Baidyk</h1>{" "}
        <div className={styles.container}>
          {languages.map((language) => (
            <div className={languageStyle} key={language}>
              {language}
            </div>
          ))}{" "}
        </div>
      </div>
    </Fragment>
  );
}
export default Body;
