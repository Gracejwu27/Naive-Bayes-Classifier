"use client";

import styles from "./page.module.css";
import Header from "/Users/gracewu/text_analyzer/src/app/ui/Header.js";
import EmotionAnalyzer from "/Users/gracewu/text_analyzer/src/app/ui/EmotionAnalyzer.js";
import About from "/Users/gracewu/text_analyzer/src/app/ui/About.js";

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
