const input = document.getElementById('input'); // кнопка ввода/вывода
const number = document.querySelectorAll('.numbers div'); // кнопки цифр
const operator = document.querySelectorAll('.operators div'); // оператор кнопок
const result = document.getElementById('result'); // кнопка равенства
const clear = document.getElementById('clear'); // кнопка очистки
let resultDisplayed = false; // флаг, чтобы следить за тем, какой вывод отображается

// добавление обработчиков кликов по кнопкам
// eslint-disable-next-line no-plusplus
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener('click', (e) => {
    /** сохранение текущей входной строки и
     * ее последнего символа в переменных - используется позже */
    const currentString = input.innerHTML;
    const lastChar = currentString[currentString.length - 1];

    // если результат не отображается, просто продолжайте добавлять
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    // eslint-disable-next-line no-mixed-operators
    } else if (resultDisplayed === true && lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷') {
      // если в данный момент отображается результат и пользователь нажал оператор
      // нам нужно продолжать добавлять в строку для следующей операции
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // если в данный момент отображается результат и пользователь нажал число
      // нам нужно очистить входную строку и добавить новый ввод, чтобы начать новую операцию
      resultDisplayed = false;
      input.innerHTML = '';
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// добавление обработчиков кликов к кнопкам с цифрами
// eslint-disable-next-line no-plusplus
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener('click', (e) => {
    // сохранение текущей входной строки и ее последнего символа в переменных - используется позже
    const currentString = input.innerHTML;
    const lastChar = currentString[currentString.length - 1];

    // если последний введенный символ является оператором, заменить его текущим нажатым
    if (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷') {
      const newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length === 0) {
      // если первая нажатая клавиша является оператором, ничего не делайте
      // console.log('enter a number first');
    } else {
      // иначе просто добавьте оператор, нажатый на ввод
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// on click of 'equal' button
result.addEventListener('click', () => {
  // this is the string that we will be processing eg. -10+26+33-56*34/23
  const inputString = input.innerHTML;

  /** формирование массива чисел. например, для приведенной выше строки
   * это будет: числа = ["10", "26", "33", "56", "34", "23"] */
  // eslint-disable-next-line no-useless-escape
  const numbers = inputString.split(/\+|\-|\×|\÷/g);

  /** формирование массива операторов. для приведенной выше строки это будет:
   * операторы = ["+", "+", "-", "*", "/"] */
  // сначала мы заменяем все числа и точку пустой строкой, а затем разделяем
  const operators = inputString.replace(/[0-9]|\./g, '').split('');

  // console.log(inputString);
  // console.log(operators);
  // console.log(numbers);
  // console.log('----------------------------');

  // теперь мы перебираем массив и выполняем одну операцию за раз
  // сначала делим, потом умножаем, потом вычитаем, потом складываем
  // по мере продвижения мы меняем исходный массив чисел и операторов
  // последний элемент, оставшийся в массиве, будет выходным

  let divide = operators.indexOf('÷');
  while (divide !== -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf('÷');
  }

  let multiply = operators.indexOf('×');
  while (multiply !== -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf('×');
  }

  let subtract = operators.indexOf('-');
  while (subtract !== -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf('-');
  }

  let add = operators.indexOf('+');
  while (add !== -1) {
    // использование parseFloat необходимо, иначе это приведет к конкатенации строк
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf('+');
  }

  // eslint-disable-next-line prefer-destructuring
  input.innerHTML = numbers[0]; // показываем вывод

  resultDisplayed = true; // поворот флага, если отображается результат
});

// стирает значение по нажатию кнопки
clear.addEventListener('click', () => {
  input.innerHTML = '';
});
