/*

tf-idf kütüphanesine girelim

TF-IDF Nedir
bir kelimenin bir dokümanda ne kadar önemli olduğunu ölçmek için kullanılan bir yöntem. Yani:

Term Frequency (TF): Kelimenin o dokümanda kaç kere geçtiği

Inverse Document Frequency (IDF): Kelimenin tüm dokümanlar içinde ne kadar nadir olduğu

Bu sayede sadece sık geçen ama anlamsız kelimeler değil, gerçekten anlamlı kelimeler ön plana çıkar.

TF-IDF neden önemli?
Metin verisini sayısal (vektör) forma çevirmek için

Makine öğrenmesi algoritmalarına girdi hazırlamak için

Arama motorlarında kelime ağırlığı belirlemek için



kurulum kütüphanesi:
sudo npm install wink-nlp wink-eng-lite-web-model natural
 */

const natural = require("natural");
const TfIdf = natural.TfIdf;

const tfidf = new TfIdf();   // nesnemizi oluşturalım

// Örnek birkaç metin (doküman)
const documents = [
    "Globalization has significantly influenced cultural exchange.",
    "Technological advancements reshape industries worldwide.",
    "Artificial intelligence and machine learning are future technologies.",
];

// Dokümanları TF-IDF modeline ekle
documents.forEach(doc => tfidf.addDocument(doc)); // her bir satırı tfidf dökümanımıza ekleyelim

// Şimdi bir kelimenin belirli dokümanda TF-IDF değerine bakalım
// Mesela "technology" kelimesinin 2. dokümandaki (index 2) skoruna bakalım:
const word = "technology";
const docIndex = 2;

tfidf.tfidfs(word, (i, measure) => {
    if (i === docIndex) {
        console.log(`TF-IDF score of "${word}" in document ${i}: ${measure}`);
    }
});

// Ayrıca bir dokümandaki tüm kelimelerin TF-IDF skorlarını yazdırmak için:
console.log(`\nAll terms TF-IDF scores in document ${docIndex}:`);

tfidf.listTerms(docIndex).forEach(item => {
    console.log(item.term, item.tfidf);

    /*
    ekran çıktıları:

All terms TF-IDF scores in document 2:
artificial: 1.4054651081081644
intelligence: 1.4054651081081644
machine: 1.4054651081081644
learning: 1.4054651081081644
future: 1.4054651081081644
technologies: 1.4054651081081644

burada cümle içindeki her bir metnin ağırlıklarını bulmuş olduk
     */
})
