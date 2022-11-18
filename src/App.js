import { useState, useEffect, useRef } from 'react';

import Display from "./Display/display";
import Main from "./Main/main";
import Operations from "./Operations/operations";

import './App.css';
import "./Display/display.css";
import "./Main/main.css";
import "./Operations/operations.css";

function App() {
  let [input, setInput] = useState("");

  function appendOp(e) {
    if(!input.length) return;
    if('0123456789)'.includes(input.slice(-1))){
      setInput(input + e.target.innerText);
    }
  }

  function countParens(input) {
    let count = 0;
    for(let char of input){
      if(char === "("){
        count++;
      } else if(char === ")"){
        count--;
      }
    }
    return count;
  }

  return (
    <div className="App">
      <div className="calculator">
        <Display input= {input}/>

        <Main
          input = {input}
          setInput={setInput}
          appendOp={appendOp}
          countParens={countParens}
        />

        <Operations
          input={input}
          setInput={setInput}
          appendOp={appendOp}
          countParens={countParens}
        />
      </div>
    </div>
  );
}

export default App;
