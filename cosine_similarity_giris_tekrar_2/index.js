/*
  "Space exploration has led to numerous scientific discoveries.",
  "Satellites play a crucial role in modern communication systems.",
  "The Mars rover has sent back valuable data from the red planet.",
  "Astronomy helps us understand the origin and structure of the universe.",
  "International space missions require collaboration between countries."

  "Mars missions are expanding our knowledge of space.";

  kutuphane:
  sudo npm i natural
 */

const natural = require("natural");
const TfIdf = natural.TfIdf;

const tfidf = new TfIdf();

const documents = [
    "Space exploration has led to numerous scientific discoveries.",
    "Satellites play a crucial role in modern communication systems.",
    "The Mars rover has sent back valuable data from the red planet.",
    "Astronomy helps us understand the origin and structure of the universe.",
    "International space missions require collaboration between countries."
];

const userInput = "Mars missions are expanding our knowledge of space.";

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
