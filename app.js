// BTN
const numberButtons = document.querySelectorAll(".btn-number");
const operatorButtons = document.querySelectorAll(".btn-operator");
const clearButton = document.getElementById("btn-clear");
const equalButton = document.getElementById("btn-equal");
const subtractionButton = document.getElementById("btn-subtraction");
const allButtons = document.querySelectorAll("button");

// DISPLAY
const display = document.getElementById("display");
const miniDisplay = document.getElementById("mini-display");

// VAR
let currentOperator = "";
let numberA = 0, numberB = 0;
let result = 0;
let mode = 2; // 0 --> NUMBER INPUT // 1 --> OPERATION INPUT // 2 --> DEFAULT

/* -------------------------------- FUNCTION -------------------------------- */
const operation = (numberA, numberB, operator) => {
    switch (operator) {
        case "btn-addition":
            // console.log(numberA + numberB)
            return numberA + numberB;
        case "btn-subtraction":
            // console.log(numberA - numberB)
            return numberA - numberB;
        case "btn-multiplication":
            // console.log(numberA * numberB)
            return numberA * numberB;
        case "btn-division":
            // console.log(numberA / numberB)
            return numberA / numberB;
        default:
            console.log("Error");
            return 0;
    }
}

const subSymbol = () => {
    if (display.textContent === "") {
        subtractionButton.textContent = "( - )";
    } else {
        subtractionButton.textContent = "-";
    }
}

/* ---------------------------------- EVENT --------------------------------- */
numberButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        clearButton.textContent = "CE";
        if (mode !== 0) {
            display.textContent = "";
        }
        mode = 0;
        if (btn.textContent === "." && display.textContent.includes(".")) return;
        if (display.textContent === "" && btn.textContent === ".") {
            display.textContent = "0.";
        } else if (display.textContent === "0" && btn.textContent !== ".") {
            display.textContent = "0." + btn.textContent;
        }
        else {
            display.textContent += btn.textContent;
        }
        subSymbol();
    });
});

operatorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (mode === 0) {
            if (currentOperator) {
                let currentDisplay = parseFloat(display.textContent);
                if (isNaN(currentDisplay)) currentDisplay = 0;
                numberB = currentDisplay;
                numberA = operation(numberA, numberB, currentOperator);
                display.textContent = numberA;
            } else {
                if (display.textContent === "") {
                    numberA = 0;
                } else {
                    numberA = parseFloat(display.textContent);
                }
            }
        }
        currentOperator = btn.id;
        miniDisplay.textContent = numberA + " " + btn.textContent;
        mode = 1;
        subSymbol();
    });
});


equalButton.addEventListener("click", () => {
    if (display.textContent === "" || mode === 1) {
        display.textContent = result;
    } else if (currentOperator !== "") {
        const operatorSymbol = document.getElementById(currentOperator).textContent;
        numberB = parseFloat(display.textContent);
        result = operation(numberA, numberB, currentOperator);
        display.textContent = result;
        miniDisplay.textContent = numberA + " " + operatorSymbol + " " + numberB;
        numberA = result;
        numberB = 0;
        currentOperator = "";
    }
    mode = 0;
    subSymbol();
});

clearButton.addEventListener("click", () => {
    if (display.textContent !== "") {
        display.textContent = "";
    } else if (miniDisplay.textContent !== "") {
        miniDisplay.textContent = "";
        numberA = 0;
        numberB = 0;
        mode = 2;
        currentOperator = "";
        result = 0;
    }
    clearButton.textContent = "C";
    subSymbol();
});

// KEYBOARD INPUT
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        const btn = document.getElementById(`btn-${key}`);
        if (btn) btn.click();
    } else if (key === ".") {
        const btn = document.getElementById("btn-dot");
        btn.click();
    } else if (key === "+") {
        const btn = document.getElementById("btn-addition");
        btn.click();
    } else if (key === "-") {
        const btn = document.getElementById("btn-subtraction");
        btn.click();
    } else if (key === "*") {
        const btn = document.getElementById("btn-multiplication");
        btn.click();
    } else if (key === "/") {
        const btn = document.getElementById("btn-division");
        btn.click();
    } else if (key === "=" || key === "Enter") {
        equalButton.click();
    } else if (key === "c" || key === "C" || key === "Escape") {
        clearButton.click();
    }
});

// OPERATOR BUTTONS CHANGE STYLE
allButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.classList.contains("btn-operator")) {
            operatorButtons.forEach(b => b.classList.remove("btn-operator-pressed"));
            btn.classList.add("btn-operator-pressed");
        } else {
            operatorButtons.forEach(b => b.classList.remove("btn-operator-pressed"));
        }
    });
});