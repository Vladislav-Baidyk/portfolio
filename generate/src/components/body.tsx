import { Fragment } from "react/jsx-runtime";
import styles from "./body.module.css";
import React, { useState } from "react";
import { useRef } from "react";

function Body() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  let inputRef = useRef<HTMLInputElement>(null);
  let defaultImgRef = useRef<HTMLImageElement>(null);
  let changeImgRef = useRef<HTMLInputElement>(null);
  let [profileImage, setProfileImage] = useState("/public/image-avatar.jpg");

  const [error, setError] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorImg, setErrorImg] = useState(false);
  const [pic, setPic] = useState(false);
  const [click, setClick] = useState(false);
  const filledFields = name.length > 0 && username.length > 0 && email.length;
  const d = new Date();
  const m = d.getMonth();
  const day = d.getDay();
  const y = d.getFullYear();
  let sum = "";
  let max = 5;
  for (let i = 0; i < max; i++) {
    let x = Math.floor(Math.random() * 10);
    sum += x;
  }

  function onChangeImg(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file && file.size < 500 * 1024) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      if (defaultImgRef.current) {
        defaultImgRef.current.src = imageUrl;
      }
      setPic(true);
      setErrorImg(false);
    } else {
      setErrorImg(true);
    }
  }
  function onChangeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newFile = event.target.files?.[0];
    if (newFile && newFile.size < 500 * 1024) {
      const imageUrl = URL.createObjectURL(newFile);
      setProfileImage(imageUrl);
      if (defaultImgRef.current) {
        defaultImgRef.current.src = imageUrl;
      }
      setPic(true);
      setErrorImg(false);
    } else {
      setErrorImg(true);
    }
  }
  function remove() {
    setProfileImage("/public/image-avatar.jpg");
    if (defaultImgRef.current) {
      defaultImgRef.current.src = "/public/icon-upload.svg";
    }
    setPic(false);
  }
  function onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  function onChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }
  function onChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  function create() {
    if (name.length <= 0) {
      setError(true);
    }
    if (email.length <= 0) {
      setErrorEmail(true);
    }
    if (username.length <= 0) {
      setErrorUsername(true);
    }
    if (filledFields && errorImg === false) {
      setClick(true);
    } else {
      console.log(false);
    }
  }
  return (
    <Fragment>
      <img className={styles.line} src="/public/pattern-lines.svg" alt="" />
      <img className={styles.circle} src="/public/pattern-circle.svg" alt="" />
      <img
        className={styles.bottomLine}
        src="/public/pattern-squiggly-line-bottom-desktop.svg"
      />
      <img
        className={styles.topLine}
        src="/public/pattern-squiggly-line-top.svg"
      />
      <div className={styles.body}>
        <div className={styles.bodyContent}>
          <img className={styles.logo} src="\public\logo-full.svg" alt="" />

          {/*тут повинна бути use state headerText */}
          {click ? (
            <div className={styles.headerText}>
              <h1>
                Congrats {name}!<br></br>
                Your ticket is ready
              </h1>
              <p>
                we've emailed your ticket to <br></br>{" "}
                <span className="color:hsl(7, 71%, 60%);">{email}</span> and
                will send updates in<br></br> the run up to the event
              </p>
            </div>
          ) : (
            <div className={styles.headerText}>
              <h1>Your Journey to Coding Conf 2025 Starts here!</h1>
              <p>Secure your spot at next year's biggest coding congerence. </p>
            </div>
          )}

          {/*use state для body form  */}
          {click ? (
            <div className={styles.boxTicket}>
              <div className={styles.boxTicketContent}>
                <div className={styles.boxTicketLeft}>
                  <div className={styles.boxTicketStart}>
                    <img src="/public/logo-full.svg" />
                    <p>
                      {m}.{day}.{y}
                    </p>
                  </div>

                  <div className={styles.boxTicketBot}>
                    <img className={styles.profileImage} src={profileImage} />
                    <div className={styles.boxTicketBotText}>
                      <p>
                        <span className={styles.boxTicketBotName}>{name}</span>
                        <br></br>
                        {username}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.boxTicketRight}>
                  <p>#{sum}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.bodyForm}>
              <div className={styles.upload}>
                <label htmlFor="">Upload Avatar</label>
                <div
                  className={
                    errorImg ? styles.uploadFormError : styles.uploadForm
                  }
                >
                  <input
                    ref={inputRef}
                    className={styles.inputUpload}
                    type="file"
                    accept="image/png, image/jpeg"
                    id="input"
                    onChange={onChangeImg}
                  />
                  <img
                    ref={defaultImgRef}
                    className={
                      errorImg ? styles.iconUploadError : styles.iconUpload
                    }
                    src="\public\icon-upload.svg"
                    id="defualt"
                  />

                  {pic && errorImg === false ? (
                    <div className={styles.buttons}>
                      <p onClick={remove}>Remove</p>
                      <p className={styles.change}>Change</p>
                      <input
                        type="file"
                        ref={changeImgRef}
                        id="change"
                        className={styles.inputChange}
                        accept="image/png, image/jpeg"
                        onChange={onChangeChange}
                      />
                    </div>
                  ) : errorImg ? (
                    <p>Please choose the size less than 500KB</p>
                  ) : (
                    <p>Choose your avatar from files</p>
                  )}
                </div>
                <p>
                  <img src="\public\icon-info.svg" />
                  Upload your photo (JPG or PNG , max size 500KB)
                </p>
              </div>

              <div className={styles.inputBox}>
                <label>Full Name</label>
                <input
                  type="text"
                  className={error ? styles.inputTextWrong : styles.inputText}
                  onChange={onChangeName}
                />
              </div>

              <div className={styles.inputBox}>
                <label>Email Address</label>
                <input
                  type="text"
                  className={
                    errorEmail ? styles.inputTextWrong : styles.inputText
                  }
                  placeholder="your@gmail.com"
                  onChange={onChangeEmail}
                />
              </div>

              <div className={styles.inputBox}>
                <label>Git Hub username</label>
                <input
                  type="text"
                  className={
                    errorUsername ? styles.inputTextWrong : styles.inputText
                  }
                  onChange={onChangeUsername}
                  placeholder="@yourGitHub"
                />
              </div>

              <div className={styles.click}>
                <button onClick={create}>Create Random Ticket</button>
              </div>
            </div>
          )}
        </div>
        {/*body content div end */}
      </div>
      {/*body div end */}
    </Fragment>
  );
}
export default Body;
