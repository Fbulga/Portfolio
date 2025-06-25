document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.calculator-display');
    const keys = document.querySelector('.calculator-keys');

    let displayValue = '0';
    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false;

    function updateDisplay() {
        display.value = displayValue;
    }

    updateDisplay();

    keys.addEventListener('click', (e) => {
        const { target } = e;
        if (!target.matches('button')) {
            return;
        }

        if (target.dataset.action) {
            handleAction(target.dataset.action);
        } else {
            handleNumber(target.dataset.value);
        }
        updateDisplay();
    });

    function handleNumber(number) {
        if (waitingForSecondValue) {
            displayValue = number;
            waitingForSecondValue = false;
        } else {
            displayValue = displayValue === '0' ? number : displayValue + number;
        }
    }

    function handleAction(action) {
        const currentValue = parseFloat(displayValue);

        switch (action) {
            case 'decimal':
                if (!displayValue.includes('.')) {
                    displayValue += '.';
                }
                break;
            case 'clear':
                displayValue = '0';
                firstValue = null;
                operator = null;
                waitingForSecondValue = false;
                break;
            case 'clearEntry':
                displayValue = '0';
                break;
            case 'percentage':
                displayValue = (currentValue / 100).toString();
                break;
            case 'sqrt':
                if (currentValue >= 0) {
                    displayValue = Math.sqrt(currentValue).toString();
                }
                break;
            case 'calculate':
                if (firstValue !== null && operator) {
                    const result = calculate(firstValue, operator, currentValue);
                    displayValue = String(result);
                    firstValue = null;
                    operator = null;
                }
                break;
            default:
                if (operator && waitingForSecondValue) {
                    operator = action;
                    return;
                }
                if (firstValue === null) {
                    firstValue = currentValue;
                } else if (operator) {
                    const result = calculate(firstValue, operator, currentValue);
                    displayValue = String(result);
                    firstValue = result;
                }
                waitingForSecondValue = true;
                operator = action;
                break;
        }
    }

    function calculate(first, op, second) {
        switch (op) {
            case 'add': return first + second;
            case 'subtract': return first - second;
            case 'multiply': return first * second;
            case 'divide': return first / second;
            default: return second;
        }
    }
});