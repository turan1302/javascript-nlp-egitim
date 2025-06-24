/*

"The rapid growth of e-commerce platforms is changing consumer purchasing habits worldwide."
"Secure payment gateways and fast delivery services are crucial for customer satisfaction."
"Mobile shopping apps make online purchases more accessible and convenient."
"Personalized recommendations and targeted advertising enhance the online shopping experience."
"Data privacy and cybersecurity remain key concerns for businesses and consumers alike."


kurulum kütüphanesi:
sudo npm install wink-nlp wink-eng-lite-web-model natural
 */

const natural = require("natural")
const TfIdf = natural.TfIdf;

const tfidf = new TfIdf();

const documents = [
    "The rapid growth of e-commerce platforms is changing consumer purchasing habits worldwide.",
    "Secure payment gateways and fast delivery services are crucial for customer satisfaction.",
    "Mobile shopping apps make online purchases more accessible and convenient.",
    "Personalized recommendations and targeted advertising enhance the online shopping experience.",
    "Data privacy and cybersecurity remain key concerns for businesses and consumers alike."
];

const word = "shopping";
const docIndex = 3;

documents.forEach(dc=>tfidf.addDocument(dc)); // dökümanı ekleyelim

// geçerli metinde arayalım (2. metinde shopping kelimesinin ağırlığı)
tfidf.tfidfs(word,(i,measure)=>{
    if (i===docIndex){
        console.log(`Aranan Döküman: ${i}, Aranan Kelime: ${word}, Ağırlık: ${measure}`);
    }
})

// 2. dökümandaki metinde tüm metinlerin ağırlıklarını bulalım
tfidf.listTerms(docIndex).forEach(item=>{
    console.log(`Metin: ${item.term.toUpperCase()}, Ağırlık: ${item.tfidf}`);
})
