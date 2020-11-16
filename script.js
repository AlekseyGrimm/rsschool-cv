const numberButtons = document.querySelectorAll('[button-number]');
const operationButtons = document.querySelectorAll('[button-operation]');
const equalsButton = document.querySelector('[button-equals]');
const deleteButton = document.querySelector('[button-delete]');
const allClearButton = document.querySelector('[button-all-clear]');
const previousOperandTextElement = document.querySelector('[screen-last-result]');
const minusScreen = document.querySelector('[screen-minus]');
const currentOperandTextElement = document.querySelector('[screen-now-result]');
const squareButton = document.querySelector('[button-square]');
const minusButton = document.querySelector('[button-min]');

class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear()
	}


	clear() {
		this.currentOperand = '';
		this.previousOperand = '';
		minusScreen.innerText = '';
		this.operation = undefined;
		this.minus = false;
		this.empty = '';
		this.equal = false;
		this.squar = false;


	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);

	}

	appendNumber(number) {
		if (this.currentOperand.length > 17) {
			return;
		}
		if (number == '-') {
			if (this.currentOperandTextElement.innerText.length < 1) {
				if (minusScreen.innerText == '-') {
					minusScreen.innerText = '';
					this.currentOperand = this.empty;
				} else if (minusScreen.innerText == '') {
					minusScreen.innerText = '-';
					this.currentOperand = this.currentOperand.toString() + '-';
				}
			} else if (this.currentOperandTextElement.innerText.length >= 1) {
				if (this.equal == true) {
					if (this.minus = false) {
						this.minus = true;
						this.currentOperand = this.currentOperand.toString() * -1;
					} else if (this.minus = true) {
						this.minus = false;
						this.currentOperand = this.currentOperand.toString() * -1;
					}
					this.equal = false;
				} else {
					if (this.minus = false) {
						this.minus = true;
						this.currentOperand = this.currentOperand.toString() * -1;
					} else if (this.minus = true) {
						this.minus = false;
						this.currentOperand = this.currentOperand.toString() * -1;
					}
				}
			}
		} else if (this.equal == true) {
			if (minusScreen.innerText == '-' && this.currentOperandTextElement.innerText.length < 1) {
				minusScreen.innerText = '';
				let scope = number * -1;
				this.currentOperand = scope;
			} else {
				if (this.currentOperand && this.currentOperand < 0) {
					if (this.previousOperand == '') {
						this.currentOperand = this.empty;
						this.equal = false;
						this.currentOperand = this.currentOperand.toString() + number.toString();
					} else {
						this.equal = false;
						this.currentOperand = this.currentOperand.toString() + number.toString();
					}
				} else {
					this.currentOperand = this.empty;
					this.equal = false;
					this.currentOperand = this.currentOperand.toString() + number.toString();
				}
			}
		} else if (this.squar == true) {
			this.currentOperand = this.empty;
			this.squar = false;
			this.currentOperand = this.currentOperand.toString() + number.toString();

		}
		else {
			minusScreen.innerText = '';
			this.currentOperand = this.currentOperand.toString() + number.toString();
		}

		if (number === '.' && this.currentOperand.includes('.')) return;
	}


	chooseOperation(operation) {
		if (this.currentOperand && this.previousOperand) {
			this.compute();
		} else if (this.previousOperand !== '') {
			this.compute();
		}
		if (this.operation) {
			this.operation = operation;
		}
		if (this.currentOperand === '') return;
		if (this.currentOperand === '.') {
			this.currentOperand = 0;
		}
		if (this.currentOperand === '-') {
			this.currentOperand = 0;
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	numSquare() {
		let complutation;
		const current = parseFloat(this.currentOperand),
			previous = parseFloat(this.previousOperand);
		if (isNaN(current)) return;
		else if (!isNaN(current) && !isNaN(previous)) {
			let num = this.chooseOperation(operation),
				res = Math.sqrt(num);
			computation = res;
		} else if (current < 0) {
			this.currentOperandTextElement.innerText =
				"NaN =(";
		} else {
			complutation = Math.sqrt(current);
		}
		if (Number.isInteger(complutation)) {
			this.currentOperand = complutation;
			this.squar = true;
		} else {
			this.currentOperand = +complutation.toFixed(12);
			this.squar = true;
		};
		this.reset = true;
		this.operation = undefined;
		this.previousOperand = "";
	}
	compute() {
		let complutation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case '+':
				complutation = prev + current
				break
			case '-':
				complutation = prev - current
				break
			case '*':
				if (prev == Infinity && current == 0) {
					complutation = 0;
					break
				}
				complutation = prev * current
				break
			case '÷':
				if (prev == 0 && current == 0) {
					this.currentOperandTextElement.innerText =
						'NaN';
					this.previousOperandTextElement.innerText =
						'';
				} else {
					complutation = prev / current;
				}
				break
			case '^':
				complutation = Math.pow(prev, current)
				break
			default:
				return

		}
		this.readyToReset = true;
		if (Number.isInteger(complutation)) {
			this.currentOperand = complutation;
			this.equal = true;
		} else {
			this.currentOperand = +complutation.toFixed(5);
			this.equal = true;
		};
		this.operation = undefined;
		this.previousOperand = "";
		return this.currentOperand;

	}

	getDisplayNumber(number) {

		const stringNumber = number.toString();

		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
		integerDisplay = '';
		if (isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
		}
		if (decimalDigits != null) {
			integerDisplay = `${integerDisplay}.${decimalDigits}`;
			return integerDisplay;
		} else {
			return integerDisplay;
		}
	}
	updateDisplay() {
		this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
		if (this.operation != null) {
			this.previousOperandTextElement.innerText =
				`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
		} else {
			this.previousOperandTextElement.innerText = ''
		}


	}
}
const numToFixed = x => ~(x + '').indexOf('.') ? (x + '').split('.')[1].length : 0;
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	})
})


operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	})
})

squareButton.addEventListener('click', button => {
	calculator.numSquare();
	calculator.updateDisplay();
})

equalsButton.addEventListener('click', button => {
	calculator.compute();
	calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
	calculator.clear();
	calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
	calculator.delete();
	calculator.updateDisplay();
})
