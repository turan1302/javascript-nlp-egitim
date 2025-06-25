/*

"Renewable energy sources are essential for sustainable development.",
"Solar power is becoming more affordable and widespread worldwide.",
"Wind turbines convert wind energy into electricity efficiently.",
"Fossil fuels contribute significantly to greenhouse gas emissions.",
"Energy storage technologies improve the reliability of renewable systems."

"Solar and wind energy are key to reducing carbon emissions."

kütüphane:
sudo npm i natural

 */


const natural = require("natural");
const TfIdf = natural.TfIdf;

const tfidf = new TfIdf();

const documents = [
    "Renewable energy sources are essential for sustainable development.",
    "Solar power is becoming more affordable and widespread worldwide.",
    "Wind turbines convert wind energy into electricity efficiently.",
    "Fossil fuels contribute significantly to greenhouse gas emissions.",
    "Energy storage technologies improve the reliability of renewable systems."
];

const userInput = "Solar and wind energy are key to reducing carbon emissions.";


documents.forEach(item=>tfidf.addDocument(item));
tfidf.addDocument(userInput);

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
const inputVector = getTfIdfVector(documents.length); // son index

// Diğer belgelerle karşılaştır
documents.forEach((doc, i) => {
    const docVector = getTfIdfVector(i);
    const sim = cosineSimilarity(docVector, inputVector);
    console.log(`Doc ${i} Similarity: ${sim.toFixed(4)}`);
});
