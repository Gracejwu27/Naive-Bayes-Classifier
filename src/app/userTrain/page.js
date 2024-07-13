import styles from "./page.module.css";
import Header from "../ui/Header";
import TrainTextAnalyzer from "../ui/TrainAnalyzerText";

export default function Home() {
  return (
    <>
    <div className={styles.Header}>
      <Header/> 
    </div>
    <div className = {styles.content}>
      <TrainTextAnalyzer/>
    </div>
    
    </>

  );
}
