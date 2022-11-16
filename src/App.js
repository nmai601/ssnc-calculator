import './App.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  let [input, setInput] = useState("");
  const scrollRef = useRef();

  function appendNum(e) {
    if(e.target.innerText === '0' && input.slice(-1) === '/') return;
    setInput(input + e.target.innerText);
  }

  function appendDec(e) {
    if(!input.length) return;

    let lastNum = "";
    for(let i= input.length-1; i >0; i--){
      if('/x-+'.includes(input[i])) break;
        lastNum = input[i] + lastNum;
    }
    if(lastNum.indexOf('.') === -1){
      setInput(input + '.');
    }
  }

  function appendOp(e) {
    if(!input.length) return;
    if('0123456789'.includes(input.slice(-1))){
      setInput(input + e.target.innerText);
    }
  }

  function deleteFromInput() {
    setInput(input.substring(0, input.length-1));
  }

  function clear() {
    setInput("");
  }

  function calculate() {
    const stack = [];
    let op ='+';
    let curr=0;

    for(let i=0; i<input.length; i++){
      if('0123456789.'.includes(input[i])){
          curr += input[i];
      }

      if(!'0123456789.'.includes(input[i]) || i === input.length-1){
        curr = parseFloat(curr)
        if(op === "+"){
            stack.push(curr);
        } else if(op ==="-"){
            stack.push(-curr);
        } else if(op === "x"){
            stack.push(stack.pop()*curr);
        } else if(op === "/"){
            stack.push(stack.pop()/curr);
        }

        op= input[i];
        curr=0;
      }
    }

    let result=0;
    while(stack.length){
        result += stack.pop();
    }

    result = result.toString().length > 9 ? result.toString().slice(0,9) : result.toString();

    setInput(result);
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ block: 'nearest', inline: 'end' });
    }
  }, [input]);

  return (
    <div className="App">
      <div className="calculator">

        <div className="display">
          <span className="input">{input}<span class="blinking-cursor" ref={scrollRef}>I</span></span>

        </div>

        <div className="header">
          <div className="button clear" onClick={clear}>Clear</div>
        </div>

        <div className="main">
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

        <div className="sidebar">
          <div className="button" onClick= {appendOp}>/</div>
          <div className="button" onClick= {appendOp}>x</div>
          <div className="button" onClick= {appendOp}>-</div>
          <div className="button" onClick= {appendOp}>+</div>
          <div className="button equal" onClick= {calculate}>=</div>
        </div>

      </div>
    </div>
  );
}

export default App;
