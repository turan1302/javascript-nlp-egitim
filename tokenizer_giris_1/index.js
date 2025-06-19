/*
"Artificial intelligence is transforming the world.
 Many industries are adopting AI solutions to enhance productivity
 and efficiency. Let's explore how NLP helps computers understand human language!"

bu metni tokenize edelim
 */

const winkNLP = require("wink-nlp")
const winkModel = require("wink-eng-lite-web-model")
const nlpEng = winkNLP(winkModel)

const textEng = "Artificial intelligence is transforming the world. Many industries are adopting AI solutions to enhance productivity and efficiency. Let's explore how NLP helps computers understand human language!";

(async ()=>{
   const docEng = nlpEng.readDoc(textEng);
   const tokenEng = docEng.tokens().out();

   console.log(tokenEng);
})()

