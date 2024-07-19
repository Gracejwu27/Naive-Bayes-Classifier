//AboutPage
'use client';
import {Oxygen} from "next/font/google"
import styles from "./About.module.css";
import Tex2SVG  from "react-hook-mathjax";

const oxygen = Oxygen({
  weight: ['400','700'],
  subsets: ['latin'],
});

export default function About(){
    return(
        <>
        <div id = "home" className={styles.container}>
            <h1 className={styles.about}>About</h1>
            
            
            <div className = {styles.waveContainer}>
                <div>
                <p className = {styles.info}>
                    This is a Naive Bayes text classifier, a machine learning algorithm that uses Bayes Theorem to classify text.
                    The algorithm is useful for many natural language processing tasks such as sentiment analysis, spam filtration,
                    and text classification. This particular text classifier was built from scratch using NodeJS while the website uses Nextjs. 
                    The code can be found here:  
                     <a className= {styles.link}href="https://www.w3schools.com"> Naive-Bayes-Classifier</a>
                    . This particular text classifier used the bag of words model which treats each word as an independent probability.
                    Around 50,000 quotes were used to train sentiment and emotion analysis model taken from various datasets. 
                </p>  
                </div>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
                        <path fill="white" fillOpacity="1" d="M0,128L80,117.3C160,107,320,85,480,101.3C640,117,800,171,960,165.3C1120,160,1280,96,1360,64L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
                            </path>
                    </svg>
            </div>

            <div id = "howToUse" className={styles.howContainer}>
                <h1 className = {styles.howtoUse}>How to use it</h1>
                <h5 className = {styles.smallHeader}>Train your own model (file)</h5>
                <p className = {styles.infoUse}>
                    If you want to use the model to train your own file, you must first
                    make sure that you have the data in the correct format. <br/>
                    The data should be a CSV file with two columns text,label exactly as it is written (no spaces).  <br/>
                    The text column should contain the text you want to classify and the label column should contain the label.
                    The text analyzer should be able to tokenize the training data and then train the model. Make sure
                    that the labels are consistent and do not contain spaces or else the model will treat them as different. 
                </p>
                <img className = {styles.picture} alt = "Example CSV FIle" src = "./ExampleCSVFile.png"/>
                <h5 className = {styles.smallHeader}>Train your own model (text)</h5>
                <p className = {styles.infoUse}>
                    To train the model with text make sure that the data is in the correct format. 
                    The first column should contain the text you want to classify and the second column should
                    contain the label. The columns should be separated by a comma and each row separated by a new line.
                    Make sure there aren't any commas in the text or else the model will treat them as separate columns.
                    <br/>
                    Press the train button and the model will train using the data you provided.
                    Finally input text and click on the classify text button to classify based on the training data you provided.
                </p>
                <img className = {styles.picture2} alt = "Example Text" src = "./ExampleText.png"/> 
            </div>

            <div id = "explain" className={styles.worksContainer}>
                <h1 className={styles.howitworks}>How it Works</h1>
                <div>
                <p className = {styles.infoWorks}>
                    Bayes Theorem is a probability theory that describes the probability of an event,
                    based on prior knowledge of conditions that might be related to the event. <br/> 
                </p>  
                <div className={styles.math}>
                        <Tex2SVG display="inline" latex="P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}" />
                        <ul className = {styles.list}>
                            <li>P(A|B) is the probability of event A given event B (posterior probability)</li>
                            <li>P(B|A) is the probability of event B given event A is true (likelihood)</li>
                            <li>P(A) is the probability of the event A being true (prior probability)</li>
                            <li>P(B) is the probability of event B being true</li>
                        </ul>
                </div>
                <p className = {styles.infoWorks}>
                    The model treats the text as a "bag of words" which ignores the ordering of the words and the frequency.
                    The way the bag of words model in particular works is that each word is treated as an independent probability.
                    P(B) does not depend on event A, so it will be the same for all labels and thus ignored. Therefore we would want to find
                    the label that maximizes the probability score: <b>P(A) * P(B|A) </b> <br/> <br/> 
                    P(A) is the prior probability of the label ie. how common the label is in the dataset. <br/>
                    P(B|A) is the likelihood of the text given the label ie. how often the text is associated with the label. <br/>
                    Looking at P(B|A), since we are assuming that the words are independent. P(B|A) is the product
                    of the probabilities of each word given the label. <b>P(B|A) = P(word_1 | A) * P(word_2 | A) * ... * P(word_N | A)</b> <br/>
                    The likelihood claculation also applies "Laplace smoothing" by adding 1 to each word count to handle when the 
                    word does not appear in the training data. 
                    However, since most of these probabilitie will be extremely small, we use the logarithm function and add these probabilities 
                    to get our <b>log-probability score:     </b>
                    <b>   lnP(A|B) = lnP(A) + lnP(w_1 | A) + lnP(w_2 | A) + ... + lnP(w_N | A)</b> <br/> 
                    To get these probabilities we must train that data using a dataset (supervised learning) and gather the words that are associated
                    with the label. The larger the dataset and more words we have, the better the model will perform. Finally, with the posterior probability
                    calculated, the model will choose the label with the highest probabliity as that label.
                </p>
                </div>
            </div>

        </div>

        </>
    )
}