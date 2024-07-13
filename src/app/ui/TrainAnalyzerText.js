'use client'
import React, {useState} from "react";
import styles from "./textAnalyzer.module.css"
import {Oxygen} from "next/font/google"
import Sidebar from "./Sidebar";
import  { CheckCircleIcon } from "@heroicons/react/20/solid";


const oxygen = Oxygen({
  weight: ['400','700'],
  subsets: ['latin'],
});

export default function TrainTextAnalyzer(){
    const [inputText, setInputText] = useState('');
    const [analysisResult, setAnalysisResult] = useState("");
    const [confidence, setConfidence] = useState("");
    const [probabilities, setProbabilities] = useState([])
    const [show, setShow] = useState(false);
    const [inputData, setInputData] = useState('');
    const [submit, setSubmit] = useState(false); 

    const handleInputChange = (e) => {
        setInputText(e.target.value);
        setShow(false);
    };

    const handleInputTrain = (e) =>{
        setInputData(e.target.value);
        setSubmit(false);
    }

    const handleTrainingChange = async(e) => {
        e.preventDefault(); 

        // Split inputData by lines, then map over each line to process
        const quoteLines = inputData.split('\n');
        
        // Process each line into an object with text and label
        const trainingData = quoteLines.map(line => {
            const [text, label] = line.split(',').map(s => s.trim());

            // Validation could go here (skipped if one is empty, for example)
            if (!text || !label) {
                console.error(`Invalid format or missing data in line: "${line}"`);
                return null;  // Return null for lines that don't match the format
            }
            
            return { text, label };
        }).filter(quote => quote !== null);  // Filter out null entries from the array

        if (trainingData.length === 0) {
            alert("Please enter data in the format 'text, label' on separate lines.");
            return;
        }
        //console.log(JSON.stringify(trainingData));
        try{
            const response = await fetch('/api/trainText',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trainingData),
            });

            const responseData = await response.json(); 
            setSubmit(true);
            console.log(responseData);

        } catch(error){
            console.error("Error sending training data: ", error);
        }

    }

    //request to backend to classify the input text
    const classifyText = async (e) => {
        e.preventDefault(); 
        console.log(inputText);
        try {
          const response = await fetch('/api/classifyText', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText }), // Send the input text to the API
          });
    
          const data = await response.json();
          console.log(data);
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
        <div className={styles.container2}>
            <Sidebar/>
            <form className={styles.trainForm}>
            {/* Render the CheckCircleIcon conditionally based on the submit state */}
            
            <textarea
                className={styles.trainInput}
                id="text"
                name="text"
                onChange={handleInputTrain}
                placeholder="Input training data:
                            text, label"
            >
                
            </textarea>
                <button 
                className={styles.button}
                onClick={handleTrainingChange}
                >
                    Submit Training Data
                </button>
                {submit && <CheckCircleIcon className={styles.checkCircle} />}
            </form>
            <div className = {styles.inputText}>
            <textarea 
                className={styles.trainText}
                id="text"
                name = "text"
                onChange={handleInputChange}
                placeholder="Input">
            </textarea>
            <button 
                className={styles.button}
                onClick={classifyText}
                >
                    Classify Text
                </button>
            </div>
            
            <div className={styles.trainOutput}>
            {show && (
                <div>
                    <p className = {styles.emotion}>
                        {analysisResult}
                    </p>
                        <ul className={styles.list}>
                            {probabilities.slice(0,3).map((item, index) => (
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