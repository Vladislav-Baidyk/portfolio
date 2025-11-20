import { Fragment } from "react/jsx-runtime";
import styles from "./body.module.css";
import { useState } from "react";
interface Assignment {
  id: number;
  title: string;
  description: string;
  competed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
}
function Body() {
  const imgMoon = "./public/moon.png";
  const imgSun = "./public/sun.png";
  const [theme, setTheme] = useState(false);
  const [allTasks, setAllTasks] = useState<Assignment[]>([]);
  const [displayedTasks, setDisplayedTasks] = useState<Assignment[]>([]);
  const [task, setNewTask] = useState<Assignment>({
    id: 0,
    title: "",
    description: "",
    competed: false,
    priority: "medium",
    createdAt: new Date(),
  });
  function Complited() {
    setDisplayedTasks(allTasks.filter((task) => task.competed));
  }
  const [window, setWindow] = useState(false);
  function createTasks() {
    const newTask = { ...task, id: Date.now() };
    setAllTasks([...allTasks, newTask]);
    setDisplayedTasks([...allTasks, newTask]);
    setNewTask({
      id: 0,
      title: "",
      description: "",
      competed: false,
      priority: "medium",
      createdAt: new Date(),
    });
    setWindow(false);
  }
  const toggleTask = (id: number) => {
    const updatedTasks = allTasks.map((task) =>
      task.id === id ? { ...task, competed: !task.competed } : task
    );

    setAllTasks(updatedTasks);
    setDisplayedTasks(updatedTasks);
  };
  function All() {
    setDisplayedTasks(allTasks);
  }
  const changeTheme = () => {
    setTheme(!theme);
    if (theme === true) {
      document.body.style.backgroundImage =
        "url(./public/artistic-blurry-colorful-wallpaper-background.jpg)";
    } else {
      document.body.style.backgroundImage = "url(./public/v960-ning-05.jpg)";
    }
  };
  function Delete(id: number) {
    const updatedTasks = allTasks.filter((task) => task.id !== id);
    setAllTasks(updatedTasks);
    setDisplayedTasks(updatedTasks);
  }
  const themeImg = theme ? imgMoon : imgSun;
  return (
    <Fragment>
      {window ? (
        <div className={theme ? styles.windowLight : styles.window}>
          <div className={styles.windowContent}>
            <h1>Create your assignment</h1>
          </div>
          <img
            src="./public/close.png"
            className={styles.closeWindow}
            onClick={() => setWindow(false)}
          />
          <div className={styles.widowContentText}>
            <div>
              <h1>Title:</h1>
              <input
                className={styles.inputTitle}
                placeholder="Title"
                value={task.title || ""}
                type="text"
                onChange={(e) => setNewTask({ ...task, title: e.target.value })}
              />
            </div>
            <div>
              <h1>Description:</h1>
              <textarea
                className={styles.textareaDescription}
                rows={4}
                cols={65}
                placeholder="Description"
                onChange={(e) =>
                  setNewTask({ ...task, description: e.target.value })
                }
                value={task.description || ""}
              ></textarea>
            </div>
            <div>
              {" "}
              <h1>Priority:</h1>
              <select
                className={styles.priority}
                value={task.priority || "medium"}
                onChange={(e) =>
                  setNewTask({
                    ...task,
                    priority: e.target.value as "low" | "medium" | "high",
                  })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button onClick={createTasks} className={styles.butonCreate}>
              Create
            </button>
          </div>
        </div>
      ) : null}
      <h1 className={theme ? styles.headerTextLight : styles.headerTextDark}>
        Custom To Do List{" "}
      </h1>
      <img className={styles.themeImg} src={themeImg} onClick={changeTheme} />
      <div className={styles.header}>
        <h1 className={theme ? styles.headerTextLight : styles.headerTextDark}>
          Assignments
        </h1>
        <button
          onClick={() => setWindow(true)}
          className={theme ? styles.buttonCreateLight : styles.buttonCreateDark}
        >
          CREATE AN ASSIGNMENT
        </button>
        <button
          onClick={All}
          className={theme ? styles.buttonLight : styles.buttonDark}
        >
          ALL
        </button>
        <button
          onClick={Complited}
          className={theme ? styles.buttonLight : styles.buttonDark}
        >
          COMPLETED
        </button>
      </div>
      <div className={styles.gridAss}>
        {displayedTasks.map((task) => (
          <div
            className={theme ? styles.assignmentLight : styles.assignmentDark}
            key={task.id}
          >
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>{task.priority}</p>
            <label className={styles.switch}>
              <input
                className={styles.competed}
                type="checkbox"
                checked={task.competed}
                onChange={() => toggleTask(task.id)}
              />
              <span className={styles.slider}></span>
            </label>
            <button className={styles.delete} onClick={() => Delete(task.id)}>
              <img src="./public/garbage.png" />
            </button>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
export default Body;
