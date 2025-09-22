class Calculator{

   constructor(containerElement) {
    this.container = containerElement;
    this.display = null; 
    this.keys = null;   
  }

  calculatorHTML = `
      <div id="display"></div>
      <div class="keys" id="calculatorKeys">
        <button type="button" class="op" data-value="C">C</button>
        <button type="button" class="op" data-value="/">/</button>
        <button type="button" class="op" data-value="*">*</button>
        <button type="button" class="op" data-value="⌫">⌫</button>

        <button type="button" data-value="7">7</button>
        <button type="button" data-value="8">8</button>
        <button type="button" data-value="9">9</button>
        <button type="button" class="op" data-value="-">-</button>

        <button type="button" data-value="4">4</button>
        <button type="button" data-value="5">5</button>
        <button type="button" data-value="6">6</button>
        <button type="button" class="op" data-value="+">+</button>

        <button type="button" data-value="1">1</button>
        <button type="button" data-value="2">2</button>
        <button type="button" data-value="3">3</button>
        <button type="button" class="op" data-value="^">^</button>

        <button type="button" data-value=".">.</button>
        <button type="button" data-value="0">0</button>
        <button type="button" data-value="%">%</button>
        <button type="button" class="op" data-value="=">=</button>
      </div>
  `

    init() {
      this.container.innerHTML = this.calculatorHTML;
      
      this.display = this.container.querySelector('#display');
      this.keys = this.container.querySelector('#calculatorKeys');

      this.keys.addEventListener("click", (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const value = this.getButtonValue(btn);
        this.handleInput(value);
      });
      
      this.clearDisplay();
  }

  getButtonValue = (btn) => {
    return (btn.dataset && btn.dataset.value) ? btn.dataset.value : btn.textContent.trim();
  }

  clearDisplay = () => {
    this.display.textContent = '0';
  }

  backspace = () => {
    this.display.textContent = this.display.textContent.slice(0, -1) || '0';
  }

  prepareExpression = (expr) => {
    return expr.replace(/\^/g, '**').replace(/%/g, '/100');
  }

  evaluateExpression = () => {
    let expression = (this.display.textContent || '').trim();
    
    let expressionToEvaluate = this.prepareExpression(expression);

    if (/[A-Za-z]/.test(expressionToEvaluate)) {
      this.display.textContent = 'Error';
      return;
    }

    try {
      const result = Function('"use strict"; return (' + expressionToEvaluate + ')')();

      if (result === undefined || Number.isNaN(result) || !Number.isFinite(result)) {
        this.display.textContent = 'Error';
      } else {
        this.display.textContent = String(result);
      }
    } catch (err) {
      this.display.textContent = 'Error';
    } 
  }

  handleInput = (value) => {
    switch (value) {
      case 'C':
        this.clearDisplay();
        break;
      case '⌫':
        this.backspace();
        break;
      case '=':
        this.evaluateExpression();
        break;
      default:
        if (this.display.textContent === '0') {
          this.display.textContent = value;
        } else {
          this.display.textContent += value;
        }
        break;
    }
  }
}

const calculatorDiv = document.querySelector(".calculator");
const myCalculator = new Calculator(calculatorDiv);

myCalculator.init();