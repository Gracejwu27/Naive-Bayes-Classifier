"use client";
import { useEffect } from "react";
import styles from "./page.module.css";
import Header from "/src/app/ui/Header.js";
import TrainTextAnalyzer from "/src/app/ui/TrainAnalyzerText.js";
import About from "/src/app/ui/About.js";

export default function Home() {
  useEffect(() => {
    // Any client-side code that uses the window object can go here
  }, []);

  return (
    <>
      <div className={styles.Header}>
        <Header/> 
      </div>
      <div className={styles.content}>
        <TrainTextAnalyzer/>
      </div>
      <div id="about"> 
        <About/>
      </div>
    </>
  );
}