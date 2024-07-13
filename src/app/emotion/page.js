import styles from "./page.module.css";
import Header from "../ui/Header";
import EmotionAnalyzer from "../ui/EmotionAnalyzer";
import About from "../ui/About";

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
