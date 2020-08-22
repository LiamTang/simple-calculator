document.addEventListener('DOMContentLoaded', () => {
  const text = document.querySelector('.text');
  const clear = document.getElementById('clear');
  const del = document.getElementById('delete');
  const result = document.getElementById('equal');
  const buttons = document.querySelectorAll('.btn');
  let flag = false;

  /** clear numbers */
  clear.addEventListener('click', () => {
    text.innerHTML = '0';
  });

  /** delete a number */
  del.addEventListener('click', () => {
    text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1);
  });

  const initialValidation = (value) => {
    if (value[0] === '0' && value[1] === '0') {
      text.innerHTML = '0';
    } else if (text.innerHTML.startsWith('0') && value[1] !== '.') {
      text.innerHTML = text.innerHTML.substring(1, text.innerHTML.length);
    } else if (text.innerHTML.startsWith('.')) {
      text.innerHTML = `0${text.innerHTML.slice()}`;
    } else if (text.innerHTML.startsWith('NaN')) {
      text.innerHTML = text.innerHTML.substring(3, text.innerHTML.length);
    }
  };

  /** handle numbers and operators */
  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', (e) => {
      text.innerHTML += e.target.value;

      const displayValue = text.innerHTML.split('');
      initialValidation(displayValue);
    });
  }

  /** validation before calculating */
  const secValidation = () => {
    if (flag === false) {
      if (text.innerHTML.startsWith(('×', '÷', '+', '-'))) {
        text.innerHTML = 'NaN';
      } else {
        const inputValue = text.innerHTML.split('');
        for (let i = 0; i < inputValue.length; i += 1) {
          if (
            (inputValue[i] === '÷'
              || inputValue[i] === '×'
              || inputValue[i] === '-'
              || inputValue[i] === '+')
            && inputValue[i] === inputValue[i + 1]
          ) {
            text.innerHTML = 'NaN';
          } else {
            flag = true;
          }
        }
      }
    }
  };

  /** check until there is no divide operator in the array
   * numbers.splice(index, number of elements to be replaced, new value)
   * => return a new numbers array
   * example: numbers [3,3,3]
   * numbers.splice(0,2,3/3) => return numbers[1,3]
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

  const multiple = (numbers, operators) => {
    let indexMulti = operators.indexOf('×');
    while (indexMulti !== -1) {
      numbers.splice(indexMulti, 2, numbers[indexMulti] * numbers[indexMulti + 1]);
      operators.splice(indexMulti, 1);
      indexMulti = operators.indexOf('×');
    }
    return numbers;
  };

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
    divide(numbers, operators);
    multiple(numbers, operators);
    minus(numbers, operators);
    plus(numbers, operators);
    [text.innerHTML] = numbers;
  };

  /** handle equal, get final result */
  result.addEventListener('click', () => {
    const inputString = text.innerHTML;
    const numbers = inputString.split(/\+|-|×|÷/g); // type if array, example ["1","55","33"]
    const operators = inputString.replace(/[0-9]|\./g, '').split(''); // type is array, example ["+","-"]
    secValidation();
    if (flag === true) {
      calculation(numbers, operators);
    }
  });
});
