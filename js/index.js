document.addEventListener('DOMContentLoaded', () => {
  const text = document.querySelector('.text');
  const clear = document.querySelector('.clear');
  const del = document.querySelector('.delete');
  const result = document.querySelector('.equal');
  const buttons = document.querySelectorAll('.btn');
  let flag = false;

  /** clear numbers */
  clear.addEventListener('click', () => {
    text.innerHTML = '';
  });

  /** delete a number */
  del.addEventListener('click', () => {
    text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1);
  });

  /** handle numbers and operators */
  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', (e) => {
      text.innerHTML += e.target.value;
    });
  }

  /** validation before calculating */
  const validation = (firstChar, inputString) => {
    if (firstChar === '÷' || firstChar === '×' || firstChar === '-' || firstChar === '+') {
      text.innerHTML = 'ERROR';
    } else {
      const inputValue = inputString.substring(0, inputString.length);
      for (let i = 0; i < inputValue.length; i += 1) {
        if (
          (inputValue[i] === '÷'
            || inputValue[i] === '×'
            || inputValue[i] === '-'
            || inputValue[i] === '+')
          && inputValue[i] === inputValue[i + 1]
        ) {
          text.innerHTML = 'ERROR';
        } else {
          flag = true;
        }
      }
    }
  };

  /** check until there is no divide operator in the array
   * numbers.splice(index, number of elements to be replaced, new value)
   * => return a new numbers array
   */
  const divide = (numbers, operators) => {
    let indexDivide = operators.indexOf('÷');
    while (indexDivide !== -1) {
      numbers.splice(indexDivide, 2, numbers[indexDivide] / numbers[indexDivide + 1]);
      operators.splice(indexDivide, 1);
      indexDivide = operators.indexOf('÷');
    }
    return numbers;
  };

  /** check until there is no Multiplication in the array  */
  const multiple = (numbers, operators) => {
    let indexMulti = operators.indexOf('×');
    while (indexMulti !== -1) {
      numbers.splice(indexMulti, 2, numbers[indexMulti] * numbers[indexMulti + 1]);
      operators.splice(indexMulti, 1);
      indexMulti = operators.indexOf('×');
    }
    return numbers;
  };

  /** check until there is no minus operator in the operators array */
  /** example: numbers [3,3,3]
   * numbers.splice(0,2,3-3) => return numbers[0,3]
   *
   */
  const minus = (numbers, operators) => {
    let indexMinus = operators.indexOf('-');
    while (indexMinus !== -1) {
      numbers.splice(
        indexMinus,
        2,
        parseFloat(numbers[indexMinus]) - parseFloat(numbers[indexMinus + 1]),
      );
      operators.splice(indexMinus, 1);
      indexMinus = operators.indexOf('-');
    }
    return numbers;
  };

  const plus = (numbers, operators) => {
    let indexAdd = operators.indexOf('+');
    while (indexAdd !== -1) {
      numbers.splice(
        indexAdd,
        2,
        parseFloat(numbers[indexAdd]) + parseFloat(numbers[indexAdd + 1]),
      );
      operators.splice(indexAdd, 1);
      indexAdd = operators.indexOf('+');
    }
    return numbers;
  };

  /** calculating values */
  const calculation = (numbers, operators) => {
    if (flag) {
      divide(numbers, operators);
      multiple(numbers, operators);
      minus(numbers, operators);
      plus(numbers, operators);

      [text.innerHTML] = numbers;
    }
  };

  /** handle equal  */
  result.addEventListener('click', () => {
    const inputString = text.innerHTML;
    const numbers = inputString.split(/\+|-|×|÷/g); // type if array, example ["1","55","33"]
    const operators = inputString.replace(/[0-9]|\./g, '').split(''); // type is array, example ["+","-"]
    const firstChar = text.innerHTML.substring(0, 1);
    validation(firstChar, inputString);
    calculation(numbers, operators);
  });
});
