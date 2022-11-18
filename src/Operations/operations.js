export default function Operations(props) {
  let { input, setInput, appendOp, countParens } = props;

  function calculate() {
    if(!input.length) return;

    const count = countParens(input);
    if(count !== 0){
      alert("FORMAT ERROR: Please delete or add more parentheses");
      return;
    }

    const calculations = input.split('^');
    let result = 1;


    const helper = (calculation) => {
      const stack = [];
      let op ='+';
      let num = 0;
      while(calculation.length){
        let char = calculation.shift();

        if('0123456789.'.includes(char)){
          num += char;

        } else if(char ==="("){
          num = helper(calculation);
        }
        if(!calculation.length || "+-x/)".includes(char)){
          num = parseFloat(num);

          if(op === "+"){
            stack.push(num);
          } else if(op ==="-"){
              stack.push(-num);
          } else if(op === "x"){
              stack.push(stack.pop()*num);
          } else if(op === "/"){
              stack.push(stack.pop()/num);
          }

          op = char;
          num=0
          if(op===")") break;
        }
      }

      let sum = 0;
      while(stack.length){
          sum += stack.pop();
      }
      return sum;
    }

    for(let j = calculations.length-1; j >= 0; j--){
      let calculation= calculations[j];
      let sum = helper(calculation.split(''));
      result = Math.pow(sum, result);
    }
    result = result.toString();
    setInput(result);
  }
  return (
    <div className="operations">
      <div className="button" onClick= {appendOp}>/</div>
      <div className="button" onClick= {appendOp}>x</div>
      <div className="button" onClick= {appendOp}>-</div>
      <div className="button" onClick= {appendOp}>+</div>
      <div className="button equal" onClick= {calculate}>=</div>
    </div>
  )
}