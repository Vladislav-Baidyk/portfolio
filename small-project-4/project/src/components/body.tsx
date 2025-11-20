import styles from "./body.module.css";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
function Body() {
  return (
    <Fragment>
      <div className={styles.bodyContent}>
        <div className={styles.blockContent}>
          <div className={styles.blockLongOne}>
            <div className={styles.blockLongOneContent}>
              <h1>
                Create and schedule content{" "}
                <span className={styles.Quicker}>quicker.</span>
              </h1>
              <img src="./public/illustration-create-post.webp" alt="" />
            </div>
          </div>
          <div className={styles.blockLongOne}>
            <div className={styles.blockLongOneContent}>
              <h1>
                Write your content using AI. <span>quicker.</span>
              </h1>
              <img src="./public/illustration-ai-content.webp" alt="" />
            </div>
          </div>
        </div>
        <div className={styles.blockContent}>
          <div className={styles.blockWithOne}>
            <div className={styles.blockWidthOneContent}>
              <h1>
                Social Media <span className={styles.Ten}>10x</span>
                <i>Faster</i> than Ai
                <span className={styles.Quicker}>quicker.</span>
              </h1>
              <img src="./public/illustration-five-stars.webp" alt="" />
            </div>
          </div>
          <div className={styles.blockLongTwo}>
            <div className={styles.blockLongTwoContent}>
              <img src="./public/illustration-multiple-platforms.webp" alt="" />
              <h1>Manage multiple accounts and platforms.</h1>
              <h1>{">"}56%</h1>
              <p>Faster audience growth</p>
              <img src="./public/illustration-audience-growth.webp" alt="" />
            </div>
          </div>
        </div>
        <div className={styles.blockContent}></div>
      </div>
    </Fragment>
  );
}
export default Body;
