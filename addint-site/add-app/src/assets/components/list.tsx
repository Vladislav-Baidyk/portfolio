import { useState } from "react";
import styles from "./list.module.css";

function List() {
  const [isFirstInputHovered, setIsFirstInputHovered] = useState(false);
  const [isSecondInputHovered, setIsSecondInputHovered] = useState(false);
  const [isThirdInputHovered, setIsThirdInputHovered] = useState(false);
  const [isFourthInputHovered, setIsFourthInputHovered] = useState(false);
  const [isFifthInputHovered, setIsFifthInputHovered] = useState(false);
  const [isRadioChecked, setRadioChecked] = useState(false);
  const [isSixthInputHovered, setIsSixthInputHovered] = useState(false);
  const [shipping, setShipping] = useState("");

  return (
    <div className={styles.form}>
      <div className={styles.formContent}>
        <h1 className={styles.header}>Contact Us</h1>
        {/*name username div */}
        <div className={styles.nameSurname}>
          <div className={styles.box}>
            <label htmlFor="">First Name *</label>
            <input
              type="text"
              className={isFirstInputHovered ? styles.hovered : styles.input}
              onMouseEnter={() => setIsFirstInputHovered(true)}
              onMouseLeave={() => setIsFirstInputHovered(false)}
              placeholder="John"
            />
          </div>

          <div className={styles.box}>
            <label htmlFor="">First Name *</label>
            <input
              type="text"
              className={isSecondInputHovered ? styles.hovered : styles.input}
              onMouseEnter={() => setIsSecondInputHovered(true)}
              onMouseLeave={() => setIsSecondInputHovered(false)}
              placeholder="John"
            />
          </div>
        </div>
        {/*name username div end*/}

        {/*otheer content */}
        <div className={styles.box}>
          <label htmlFor="">Email Address *</label>
          <label htmlFor=""></label>
          <input
            type="email"
            className={
              isThirdInputHovered ? styles.hoveredMax : styles.inputMax
            }
            onMouseEnter={() => setIsThirdInputHovered(true)}
            onMouseLeave={() => setIsThirdInputHovered(false)}
          />
        </div>

        {/*otheer content div end*/}
        <p>Query Type *</p>
        <div className={styles.radioContainer}>
          {/*radioBox*/}
          <div
            className={
              isFourthInputHovered ? styles.hoverRadio : styles.inputRadio
            }
            onMouseEnter={() => setIsFourthInputHovered(true)}
            onMouseLeave={() => setIsFourthInputHovered(false)}
          >
            <input
              type="radio"
              value="General Enquiry"
              className={styles.color}
            />

            <label>General Enquiry</label>
          </div>
          {/*radioBox div end*/}

          {/*radioBox*/}
          <div
            className={
              isFifthInputHovered ? styles.hoverRadio : styles.inputRadio
            }
            onMouseEnter={() => setIsFifthInputHovered(true)}
            onMouseLeave={() => setIsFifthInputHovered(false)}
          >
            <input
              type="radio"
              value="support Request"
              checked={shipping == "support Request"}
            />
            <label>Support Request</label>
            {/*radioBox div end*/}
          </div>
        </div>
        <button>chosen : {shipping}</button>
      </div>
    </div>
  );
}

export default List;
