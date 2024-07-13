const natural = require('natural');
const wordnet = new natural.WordNet();
const NGrams = natural.NGrams; 

class TextAnalyzer{
    constructor(){
        //total number of quotes in the entire training set
        this.total_quotes = 0; 
        //number of unique words in the training set
        this.vocab = new Set();
        //for each word, the number of quotes that contain the word
        this.contains_word = new Map();
        //for each sentiment, the number of quotes with that sentiment
        this.contains_label = new Map();
        //the number of quotes with a sentiment label that contain the word
        this.word_in_label = new Map();
        this.stopwords = new Set([
            'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours',
            'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers',
            'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'and',
            'it','on', 'a', 'after','are','as','at','be','because','been','but','doing','during',
            'could', 'did', 'for', 'if','just','me','the','that','too','to','who','who','which','while',
            'under','who','whom','up','very','was','there','these','would','why','is','than','of','now','come',
            'which','up','upon','use','someday','six','since','should','then','therefore','may','maybe','just'
            ,'less','lets','keep','least','meanwhile','neither','either','now','nothing','over','put','where','yet',
            'take','still','such','none','nobody','or','only','onto','our','quite','really','since','thing','think',
            'am','now','oh','o','after','before','being','both','between','same','current','causes','goes','more','nothing',
            'obviously','often','most',
        ]);
    }

    //stemming an array of words to simplify the words to their base form
    stemming(tokens){
        var stemmedTokens = tokens.map(token => natural.PorterStemmer.stem(token));
        //console.log(stemmedTokens);
        return stemmedTokens;
    }

    //tokenizes the data
    tokenize(text){
    //remove punctuation from text - remove anything that isn't a word char or a space
     // Convert to lowercase
     text = text.toLowerCase();
     let newTokens = [];
 
     // Tokenize while removing anything that isn't a word character
     let tokens = text.match(/\b\w+\b/g) || [];
 
     // Remove stopwords
     tokens = tokens.filter(token => !this.stopwords.has(token));

     const negationWords = new Set([
        'not', 'never', 'no', 'cannot', "doesn't", "isn't", "wasn't"
     ])

     const negatedTokens = [];
     let negateNext = false; 

     tokens.forEach(token => {
        if(negationWords.has(token)){
            negateNext = true; 
        }else if(negateNext) {
            token = `not_${token}`;
            negateNext = false; 
        }
        newTokens.push(token)
     })
    
    newTokens = this.stemming(newTokens);

     return newTokens;
    }

    //process the data
    train(quotes){
        //tokenizes each quote
        quotes.forEach(quoteObj => {
            let {label,text} = quoteObj; 
            const tokens = this.tokenize(text);
            //label = label.toLowerCase(); 

            //increment total quotes and quotes that contain a specific label
            this.total_quotes += 1; 
            this.contains_label.set(label, (this.contains_label.get(label) || 0) + 1);

            //loops through each word
            tokens.forEach(token => {
                //adds to the vocab set to get unique words
                this.vocab.add(token);
                
                //if the word is not in label, then we create a new map inside
                if(!this.word_in_label.has(label)){
                    this.word_in_label.set(label, new Map());
                }
                //then we get the map with the key as the label and value as the number of words
                //corresponding to the label
                const labelWordMap = this.word_in_label.get(label);
                //we then intialize the inside map to 0 and then add 1 or we just increase word frequency
                labelWordMap.set(token, (labelWordMap.get(token) || 0) + 1);
                //increments/initializes the word frequency
                this.contains_word.set(token, (this.contains_word.get(token) || 0) + 1)
            });
        });
    }
    
    //predicts and returns a sentiment
    predict(quote){
        const tokens = this.tokenize(quote); // Tokenizing input text
        let maxLogProbability = -Infinity;
        let predictedLabel = null;
        const logProbabilities = []

        // Calculate the prior and likelihoods for each label
        this.contains_label.forEach((labelCount, label) => {
          const logPrior = Math.log(labelCount / this.total_quotes); // Log prior calculation
          let logLikelihood = 0; // This will be the sum of the log likelihoods for each token given the label
          //loops through every word in the quote
          tokens.forEach(token => {
            //gets the word frequency for the particular label
            const wordFreqInLabel = this.word_in_label.get(label).get(token) || 0;

            // Calculate the total number of tokens for this class
            const totalTokensForLabel = Array.from(this.word_in_label.get(label).values())
              .reduce((sum, val) => sum + val, 0) + this.vocab.size;
              
            // (word frequency in class + 1) / (total words in class + number of unique words in vocab)
            logLikelihood += Math.log((wordFreqInLabel + 1) / totalTokensForLabel);
          });
      
          const logProbability = logPrior + logLikelihood;
          logProbabilities.push({ label: label, logProbability: logProbability});
          
          if (logProbability > maxLogProbability) {
            maxLogProbability = logProbability;
            predictedLabel = label;
          }

        });

        const sortedLogProbabilities = this.sort(logProbabilities);
        return {
            sentiment: predictedLabel,
            maxLogProbability: maxLogProbability,
            probabilities: sortedLogProbabilities
        }
    }

    sort(logProbabilities){
        return logProbabilities.sort((a, b) => b.logProbability - a.logProbability);
    }

}

module.exports = TextAnalyzer; 