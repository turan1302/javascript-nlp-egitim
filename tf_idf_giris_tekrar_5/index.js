/*

"The adoption of telemedicine has increased significantly during the pandemic.",
"Remote consultations allow patients to access healthcare services from home.",
"Wearable devices track vital signs and provide real-time health insights.",
"AI-powered diagnostics assist doctors in making accurate medical decisions.",
"Privacy of patient data is a top priority in digital health solutions."



kurulum kütüphanesi:
sudo npm install wink-nlp wink-eng-lite-web-model natural
 */

const natural = require("natural");
const TfIdf = natural.TfIdf;

const tfidf = new TfIdf();


const documents = [
    "The adoption of telemedicine has increased significantly during the pandemic.",
    "Remote consultations allow patients to access healthcare services from home.",
    "Wearable devices track vital signs and provide real-time health insights.",
    "AI-powered diagnostics assist doctors in making accurate medical decisions.",
    "Privacy of patient data is a top priority in digital health solutions."
];

const word = "health";
const docIndex = 4;

documents.forEach(item=>tfidf.addDocument(item));

// 2. dökümandaki health kelimesinin ağırlığına bakalım
tfidf.tfidfs(word,(i,measure)=>{
    if (i===docIndex){
        console.log(`Metin: ${word}, Metin Index: ${i}, Ağırlık: ${measure}`);
    }
})

// 2. dökümandaki tüm ağırlıklara bakalım
tfidf.listTerms(docIndex).forEach(item=>{
    console.log(`Metin: ${item.term.toUpperCase()}, Ağırlık: ${item.tfidf}`);
})

