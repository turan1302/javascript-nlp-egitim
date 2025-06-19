/*

"In 2025, artificial intelligence will become even more integrated into daily life. From self-driving cars to personalized healthcare, AI innovations continue to shape the future. Meanwhile, ethical concerns and regulations around AI remain hot topics in the tech community."
metnini tokneize edelim

kütüphane:
sudo npm install wink-nlp wink-eng-lite-web-model
 */

const winkNLP = require("wink-nlp")
const winkModel = require("wink-eng-lite-web-model")
const nlpEng = winkNLP(winkModel)

const textEng = "In 2025, artificial intelligence will become even more integrated into daily life. From self-driving cars to personalized healthcare, AI innovations continue to shape the future. Meanwhile, ethical concerns and regulations around AI remain hot topics in the tech community.";

(async ()=>{
   const docEng = nlpEng.readDoc(textEng)
   const tokenEng = docEng.tokens().out()

   console.log(tokenEng)
})()
