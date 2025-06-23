/*

"Globalization has significantly influenced cultural exchange, enabling people from different backgrounds to connect and share ideas. This interconnectedness fosters greater understanding and collaboration across nations."

burada hem tokens, hem stopword ve noktalama işaretlerini kaldırcaz, hem de kelimelerin köklerini bulcaz

kurulum kütüphanesi:
sudo npm install wink-nlp wink-eng-lite-web-model natural
 */

const winkNLP = require("wink-nlp")
const winkModel = require("wink-eng-lite-web-model")
const winkEng = winkNLP(winkModel)

const natural = require("natural")
const stemmer = natural.PorterStemmer;

const textEng = "Globalization has significantly influenced cultural exchange, enabling people from different backgrounds to connect and share ideas. This interconnectedness fosters greater understanding and collaboration across nations.";

// stop word listesi
const stopWordsData = new Set([
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

function tokenProcess(text){
    const dotEng = winkEng.readDoc(text)

    const tokenEng = dotEng.tokens().out();

    const stopWords = dotEng.tokens().filter(token=>{
        const word = token.out().toLowerCase();
        const isPunctuation = /^[.,!?;:()'"`]+$/.test(word);
        return !stopWordsData.has(word) && !isPunctuation;
    }).out();

    // Stem işlemi
    const stemmedTokens = stopWords.map(token => stemmer.stem(token.lemma()));

    return {
        tokenEng,
        stopWords,
        stemmedTokens
    }
}

const textResult = tokenProcess(textEng);

console.log("--- Ham Tokenler ---");
console.log(textResult.tokenEng);
console.log("--- Stop Words Token ---");
console.log(textResult.stopWords);
console.log("--- Stemmed Tokens ---");
console.log(textResult.stemmedTokens);

