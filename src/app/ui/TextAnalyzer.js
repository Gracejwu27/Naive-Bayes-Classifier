'use client'
import React, {useState} from "react";
import styles from "./textAnalyzer.module.css"
import {Oxygen} from "next/font/google"
import Sidebar from "./Sidebar";
import clsx from "clsx";

const oxygen = Oxygen({
  weight: ['400','700'],
  subsets: ['latin'],
});

export default function TextAnalyzer(){
    const [inputText, setInputText] = useState('');
    const [analysisResult, setAnalysisResult] = useState("");
    const [confidence, setConfidence] = useState("");
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
          const response = await fetch('/api/sentiment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText }), // Send the input text to the API
          });
    
          const data = await response.json();
          setAnalysisResult(data.sentiment); 
          setConfidence(data.confidence.toFixed(2));
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
            <div className={styles.textOutput}>
            {show && (
                <div>
                    <p className={clsx({
                        [styles.positive]: analysisResult === 'positive',
                        [styles.negative]: analysisResult === 'negative',
                        [styles.neutral]: analysisResult === 'neutral'
                    })}>
                        {analysisResult}
                    </p>
                        <ul className={styles.list}>
                            {probabilities.map((item, index) => (
                            <li key={index} className={styles.listItem}>
                            <span className={styles.sentimentLabel}>{item.label}</span>
                            <span className={styles.sentimentScore}>{item.logProbability.toFixed(2)}</span>
                            </li>
                            ))}
                        </ul>
                </div>
                )}
            </div>
        </div>

        </>
    )
}