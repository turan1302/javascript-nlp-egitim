/*

"Machine learning enables computers to learn from data. Companies use machine learning algorithms to make predictions and automate processes. The future of AI is full of exciting possibilities!"
cümlesini tokenize edelim

kütüphane:
sudo npm install wink-nlp wink-eng-lite-web-model
 */

const winkNPL = require("wink-nlp")
const winkModel = require("wink-eng-lite-web-model")
const nlpEng = winkNPL(winkModel)

const textEng = "Machine learning enables computers to learn from data. Companies use machine learning algorithms to make predictions and automate processes. The future of AI is full of exciting possibilities!";

(async ()=>{
   const docEng = nlpEng.readDoc(textEng)
   const tokenEng = docEng.tokens().out()

   console.log(tokenEng)
})()
