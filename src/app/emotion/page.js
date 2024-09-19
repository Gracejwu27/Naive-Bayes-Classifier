"use client";

import styles from "./page.module.css";
import Header from "/src/app/ui/Header.js";
import EmotionAnalyzer from "/src/app/ui/Header.js";
import About from "/src/app/ui/About.js";

export default function Home() {
  return (
    <>
    <div className={styles.Header}>
      <Header/> 
    </div>
    <div className = {styles.content}>
         <EmotionAnalyzer/> 
    </div>
    <div id = "about"> 
      <About/>
    </div>


    </>


  );
}
