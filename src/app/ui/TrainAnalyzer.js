'use client'
import React, {useState} from "react";
import styles from "./textAnalyzer.module.css"
import {Oxygen} from "next/font/google"
import Sidebar from "./Sidebar";
import UploadFile from "./DropFile";

const oxygen = Oxygen({
  weight: ['400','700'],
  subsets: ['latin'],
});

export default function TrainAnalyzer(){
    const [inputText, setInputText] = useState('');
    const [analysisResult, setAnalysisResult] = useState("");
    const [probabilities, setProbabilities] = useState([])
    const [show, setShow] = useState(false);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
        setShow(false);
    };

    //request to backend to classify the input text
    const classifyText = async (e) => {
        e.preventDefault(); 
    
        try {
          const response = await fetch('/api/train', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText }), // Send the input text to the API
          });
    
          const data = await response.json();
          console.log("DATA", data);
          setAnalysisResult(data.sentiment); 
          setProbabilities(data.probabilities)
          setShow(true);

        } catch (error) {
          console.error('Error while classifying text:', error);
        }
      };

    return(
        <>
        <div className={styles.container}>
            <Sidebar/>
            <form className={styles.textAreaForm}>
            <UploadFile /> 
            <textarea 
                className={styles.textInput}
                id="text"
                name = "text"
                onChange={handleInputChange}
                placeholder="Test out with your own text here.">
            </textarea>

            <button 
                className={styles.button}
                onClick={classifyText}
                >
                    Classify Text
                </button>
            </form>
      
            <div className={styles.dropOutput}>
            {show && (
                <div>
                    <p className = {styles.emotion}>
                        {analysisResult}
                    </p>
                    {probabilities && probabilities.length > 0 ? (
                    <ul className={styles.list}>
                        {probabilities.slice(0, 3).map((item, index) => (
                        <li key={index} className={styles.listItem}>
                            <span className={styles.sentimentLabel}>{item.label}</span>
                            <span className={styles.sentimentScore}>{item.logProbability.toFixed(2)}</span>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p>
                        No probabilities available.
                        <br/> 
                        Make sure you're file is in the right form.
                    </p>
                    
                    )}
                </div>
                )}
                
            </div>
            
        </div>

        </>
    )
}