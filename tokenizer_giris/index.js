/*
✅ 1️⃣ Tokenization (en temel işlem)
Ne? Cümleyi kelimelere (token) bölme işlemi.
Neden? Çünkü model veya analiz için önce cümleyi parçalara ayırman lazım.
 */

// İngilizce için wink-nlp
const winkNLP = require('wink-nlp');
const winkModel = require('wink-eng-lite-web-model');
const nlpEng = winkNLP(winkModel);

const textEng = 'Today is a beautiful day!';

(async () => {
    // İngilizce Tokenizer
    console.log('--- İngilizce Tokens ---');
    const docEng = nlpEng.readDoc(textEng);
    const tokensEng = docEng.tokens().out();
    console.log(tokensEng);
})();


