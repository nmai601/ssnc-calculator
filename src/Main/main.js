export default function Main(props) {
  let { input, setInput, appendOp, countParens } = props;

  function appendNum(e) {
    if((e.target.innerText === '0' && input.slice(-1) === '/') || input.slice(-1) === ")") return;
    setInput(input + e.target.innerText);
  }

  function appendDec(e) {
    if(input.slice(-1) === ")" || input.slice(-1) === ".") return;

    let lastNum = "";
    for(let i= input.length-1; i >0; i--){
      if('/x-+('.includes(input[i])) break;
        lastNum = input[i] + lastNum;
    }
    if(lastNum.indexOf('.') === -1){
      setInput(input + '.');
    }
  }

  function appendParens(e) {
    if(!input.length){
      setInput("(");
      return;
    }
    const count = countParens(input);

    if(count > 0){
      if('1234567890.)'.includes(input.slice(-1))) setInput(input + ")");
      else return;
    } else {
     if("+-x/^".includes(input.slice(-1))){
        setInput(input + "(");
      }
    }
  }

  function deleteFromInput() {
    setInput(input.substring(0, input.length-1));
  }

  function clear() {
    setInput("");
  }

  return (
    <div className="main">
      <div className="button clear" onClick={clear}>C</div>
      <div className="button" onClick={appendParens}>()</div>
      <div className="button" onClick={appendOp}>^</div>

      <div className="button" onClick= {appendDec}>.</div>
      <div className="button" onClick= {appendNum}>0</div>
      <div className="button" onClick= {deleteFromInput}>del</div>
      <div className="button" onClick= {appendNum}>1</div>
      <div className="button" onClick= {appendNum}>2</div>
      <div className="button" onClick= {appendNum}>3</div>
      <div className="button" onClick= {appendNum}>4</div>
      <div className="button" onClick= {appendNum}>5</div>
      <div className="button" onClick= {appendNum}>6</div>
      <div className="button" onClick= {appendNum}>7</div>
      <div className="button" onClick= {appendNum}>8</div>
      <div className="button" onClick= {appendNum}>9</div>
    </div>
  )
}