const TextAnalyzer = require('./textAnalyzer');
const fs = require('fs');
const csv = require('csv-parser');

const emotionSentiment= new TextAnalyzer();
fs.createReadStream('EmotionTrain.csv')
.pipe(csv())
.on('data',function(data){
    //console.log("Quote is:"  + data.text);
    //console.log("Label is: " + data.label);
    emotionSentiment.train([{
        text: data.text,
        label: data.label
    }]);
})
.on('end', () => {
    console.log("Vocab size:", emotionSentiment.vocab.size);
    console.log("Total quotes:", emotionSentiment.total_quotes);    

    console.log("Training Complete");
    /*let correctPredictions = 0;
    let totalPredictions = 0; 
    fs.createReadStream('bookQuotesTest.csv')
    .pipe(csv())
    .on('data',function(data){

        totalPredictions += 1; 
        let quote = data.text;
        let label = data.label; 
        const sentiment = trainedSentiment.predict(quote);
        if(sentiment === label){
            correctPredictions += 1; 
        }
        //console.log(sentiment);
        //console.log(label); 
    })
    .on('end',() =>{
        const accuracy = correctPredictions / totalPredictions;
        console.log(correctPredictions ,"/", totalPredictions)
        console.log('Accuracy ', accuracy)
        //let quote = "You are too skinny.";
        //console.log("Quote: ", quote)
        //const s = trainedSentiment.predict(quote)
        //console.log("Predicted sentiment: ", s);
    })*/
});

module.exports = emotionSentiment