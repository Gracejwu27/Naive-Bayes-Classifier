import styles from "./page.module.css";
import Header from "./ui/Header";
import TextAnalyzer from "./ui/TextAnalyzer";
import About from "./ui/About";

export default function Home() {
  return (
    <>
    <div className={styles.Header}>
      <Header/> 
    </div>
    <div className = {styles.content}>
      <TextAnalyzer/> 
    </div>
    <div id = "about"> 
      <About/>
    </div>


    </>


  );
}
