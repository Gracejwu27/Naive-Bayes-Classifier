import styles from "./page.module.css";
import Header from "../ui/Header";
import TrainAnalyzer from "../ui/TrainAnalyzer";
import {Oxygen} from "next/font/google"

const oxygen = Oxygen({
  weight: ['400','700'],
  subsets: ['latin'],
});

export default function Home() {
  return (
    <>
    <div className={styles.Header}>
      <Header/> 
    </div>
    <div className = {styles.content}>
      <TrainAnalyzer/> 
    </div>
    
    </>


  );
}
