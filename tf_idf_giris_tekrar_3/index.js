/*

"Artificial intelligence is transforming industries by automating complex tasks and improving decision-making.",
  "Machine learning algorithms help systems learn from data and improve their performance over time.",
  "Deep learning, a subset of machine learning, uses neural networks to model complex patterns.",
  "Natural language processing enables computers to understand and generate human language effectively.",
  "Ethical considerations in AI development are crucial to ensure responsible and fair use of technology."

kurulum kütüphanesi:
sudo npm install wink-nlp wink-eng-lite-web-model natural
 */

const natural = require("natural")
const TfIdf = natural.TfIdf;

const tfidf = new TfIdf();

const docs = [
    "Artificial intelligence is transforming industries by automating complex tasks and improving decision-making.",
    "Machine learning algorithms help systems learn from data and improve their performance over time.",
    "Deep learning, a subset of machine learning, uses neural networks to model complex patterns.",
    "Natural language processing enables computers to understand and generate human language effectively.",
    "Ethical considerations in AI development are crucial to ensure responsible and fair use of technology."
];

docs.forEach(dc=>tfidf.addDocument(dc));

const word = "learning"; // ağırlığı hesaplanacak kelime
const docIndex = 2; // aranacak döküman

tfidf.tfidfs(word,(i,measure)=>{
    if (i===docIndex){
        console.log(`Aranan Döküman: ${docIndex}, Aranan Kelime: ${word}, Ağırlık: ${measure}`);
    }
})

console.log("--------  --------");
console.log(`-------- ${docIndex}. Döküman Tüm Analizler --------`);
console.log("--------  --------");
// 2. dökümandaki tüm kelimelerin ağırlıklarını bulalım
tfidf.listTerms(docIndex).forEach(item=>{
    console.log(`Aranan Döküman: ${docIndex}, Aranan Kelime: ${item.term}, Kelime Ağırlığı: ${item.tfidf}`);
})
