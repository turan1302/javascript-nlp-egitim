/*

"Digital marketing strategies are evolving with the increasing use of social media and mobile devices. Companies must adapt to changing consumer behaviors to stay competitive in the market."

burada hem tokens, hem stopword ve noktalama işaretlerini kaldırcaz, hem de kelimelerin köklerini bulcaz

kurulum kütüphanesi:
sudo npm install wink-nlp wink-eng-lite-web-model natural
 */

const winkNLP = require("wink-nlp")
const winkModel = require("wink-eng-lite-web-model")
const nlpEng = winkNLP(winkModel)
const natural = require("natural")

const stemmer = natural.PorterStemmer; // Ing için

// stop word dartasını manuel yapalım
const stopWords = new Set([
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at",
    "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
    "can't", "cannot", "could", "couldn't",
    "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during",
    "each",
    "few", "for", "from", "further",
    "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's",
    "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself",
    "let's",
    "me", "more", "most", "mustn't", "my", "myself",
    "no", "nor", "not",
    "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own",
    "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such",
    "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too",
    "under", "until", "up",
    "very",
    "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't",
    "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"
]);

const textEng =  "Digital marketing strategies are evolving with the increasing use of social media and mobile devices. Companies must adapt to changing consumer behaviors to stay competitive in the market.";

(async ()=>{
   const dotEng = nlpEng.readDoc(textEng)
   const tokenEng = dotEng.tokens().out();

   console.log("--- Tokens ---")
    console.log(tokenEng)

    const stopWordData = dotEng.tokens().filter(token =>{
        const word = token.out().toLowerCase();
        // Noktalama işaretini çıkarma — regex ile
        const isPunctuation = /^[.,!?;:()'"`]+$/.test(word);
        return !stopWords.has(word) && !isPunctuation;
    }).out()

    console.log("--- Stop Words ---")
    console.log(stopWordData)

    const stemmedText = stopWordData.map(text => stemmer.stem(text));

   console.log("--- Stemmd Text ---");
   console.log(stemmedText);
})()
