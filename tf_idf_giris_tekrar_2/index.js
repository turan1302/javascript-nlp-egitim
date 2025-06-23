/*

 "Climate change is one of the biggest challenges facing the world today. Governments and organizations are working to reduce carbon emissions.",
  "Advances in renewable energy technologies provide hope for a sustainable future.",
  "Public awareness and education about environmental issues are crucial for effective change.",
  "Innovation in electric vehicles and battery storage is accelerating the shift away from fossil fuels.",
  "International cooperation is essential to address the global impact of climate change."
];

kurulum kütüphanesi:
sudo npm install wink-nlp wink-eng-lite-web-model natural
 */

const natural = require("natural");
const TfIdf = natural.TfIdf;

const tfidf = new TfIdf();

const docs = [
    "Climate change is one of the biggest challenges facing the world today. Governments and organizations are working to reduce carbon emissions.",
    "Advances in renewable energy technologies provide hope for a sustainable future.",
    "Public awareness and education about environmental issues are crucial for effective change.",
    "Innovation in electric vehicles and battery storage is accelerating the shift away from fossil fuels.",
    "International cooperation is essential to address the global impact of climate change."
];

docs.forEach(dc=>tfidf.addDocument(dc));

const word = "energy";
const docIndex = 1;

tfidf.tfidfs(word,(i,measure)=>{
   if (i===docIndex){
       console.log(`Dökümanda Aranan Kelime: ${word}, Döküman Indexi: ${i} : Ağırlık: ${measure}`);
   }
});

// dökümandaki tüm kelimelerin ağırlığını kodlayalım
tfidf.listTerms(docIndex).forEach(item=>{
    console.log(`Döküman Kelimesi: ${item.term} : Ağırlık --> ${item.tfidf}`)
})
