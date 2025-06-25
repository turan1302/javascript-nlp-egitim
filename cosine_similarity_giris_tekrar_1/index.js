/*

kutuphane:
sudo npm i natural
 */

const natural = require("natural");
const TfIdf = natural.TfIdf;

const tfidf = new TfIdf();

// Belge dizisi
const documents = [
    "Artificial intelligence is changing the world.",
    "Machine learning is a subset of AI.",
    "Cooking is a great hobby."
];

const userInput = "AI is transforming our world through learning.";

// Belgeleri ekle
documents.forEach(doc => tfidf.addDocument(doc));

// Kullanıcı girdisini de ekle (geçici 4. belge)
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
