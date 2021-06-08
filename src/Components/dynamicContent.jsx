import { Display } from "./Display"

const WordCountUpdate = (props) => {

  // const [count, setCount] = useState(0);
 
  return (
    <div>
      <Display />
    </div>
  );
  // let count = document.querySelector('#wordCount');
  // let input = document.querySelector('#evaluatedText');
  
  // input.addEventListener("keyup", function(ele) {
  //     wordCounter(ele.target.value);
  // });
  
  // function isWord(str) {
  //   var validWord = false;
  //   for (var i = 0; i < str.length; i++) {
  //     var code = str.charCodeAt(i);
  //     if ((code > 47 && code < 58) || (code > 64 && code < 91) || (code > 96 && code < 123)) {
  //       validWord = true;
  //       return validWord;
  //     }
  //   }
  //   return validWord;
  // }
  
  // function wordCounter(text) {
  //   var text = input.value.split(' ');
  //   var wordCount = 0;
  //   for (var i = 0; i < text.length; i++) {
  //     if (!text[i] == ' ' && isWord(text[i])) {
  //       wordCount++;
  //     }
  //   }
  //   count.innerText = wordCount;
  // }
}

export default DynamicContent;
