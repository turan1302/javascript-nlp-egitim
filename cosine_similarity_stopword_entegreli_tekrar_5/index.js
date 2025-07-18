/*

dokumanlar:
    "Artificial intelligence is revolutionizing the healthcare industry by enabling faster diagnoses.",
    "Social media has become a powerful tool for activism and raising awareness about global issues.",
    "Online education platforms are making learning more accessible to people around the world.",
    "Cybersecurity threats are increasing as more devices become connected to the internet.",
    "Blockchain technology ensures transparency and trust in financial transactions."


kullanıcı verisi:
"Digital platforms are changing the way people learn and share information."

kurulum kütüphanesi:
sudo npm install wink-nlp wink-eng-lite-web-model natural
 */

const winkNLP = require("wink-nlp");
const winkModel = require("wink-eng-lite-web-model");
const nlpEng = winkNLP(winkModel);

const natural = require("natural");
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

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

const documents = [
    "Artificial intelligence is revolutionizing the healthcare industry by enabling faster diagnoses.",
    "Social media has become a powerful tool for activism and raising awareness about global issues.",
    "Online education platforms are making learning more accessible to people around the world.",
    "Cybersecurity threats are increasing as more devices become connected to the internet.",
    "Blockchain technology ensures transparency and trust in financial transactions."
];

const userInput =  "Digital platforms are changing the way people learn and share information.";

function textProcess(text){
    const dotEng = nlpEng.readDoc(text);
    const tokenEng = dotEng.tokens().out();

    const filteredResult = dotEng.tokens().filter(token=>{
        const word = token.out().toLowerCase();
        // Noktalama işaretini çıkarma — regex ile
        const isPunctuation = /^[.,!?;:()'"`]+$/.test(word);
        return !stopWords.has(word) && !isPunctuation;
    }).out();


    return {
        tokenEng,
        filteredResult
    }
}


const newDocuments = [];
const newUserInput = textProcess(userInput).filteredResult.join(" ").toLowerCase();

documents.forEach((item)=>{
    newDocuments.push(textProcess(item).filteredResult.join(" ").toLowerCase());
})

newDocuments.forEach(item=>tfidf.addDocument(item));
tfidf.addDocument(newUserInput);


// Vocab uzunluğu için alınan tüm terimler (gerekiyor çünkü vektör uzunluğu eşit olmalı)
const allTerms = new Set();
for (let i = 0; i < tfidf.documents.length; i++) {
    tfidf.listTerms(i).forEach(item => allTerms.add(item.term));
}
const vocabArray = Array.from(allTerms);

// Belirli belge için vektör oluştur
function getTfIdfVector(index) {
    const termMap = {};
    tfidf.listTerms(index).forEach(item => {
        termMap[item.term] = item.tfidf;
    });

    return vocabArray.map(term => termMap[term] || 0);
}

// Cosine Similarity
function cosineSimilarity(a, b) {
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Kullanıcı vektörü
const inputVector = getTfIdfVector(newDocuments.length); // son index

// Diğer belgelerle karşılaştır
newDocuments.forEach((doc, i) => {
    const docVector = getTfIdfVector(i);
    const sim = cosineSimilarity(docVector, inputVector);
    console.log(`Doc ${i} Similarity: ${sim.toFixed(4)}`);
});
