
// create calculator body structure
const pageContainer = createSubElements( document.body, 1, "div", null, "pageContainer");
const calcDisplay = createSubElements(pageContainer, 1, "div", null, "calcDisplay");
const calcKeypad = createSubElements(pageContainer, 1, "div", null, "calcKeypad");
// create calculator buttons
const calcNumKeys = createSubElements(calcKeypad, 1, "div", null, "calcNumKeys");
const calcOpKeys = createSubElements(calcKeypad, 1, "div", null, "calcOpKeys");

const numKeys = createNumKeys(calcNumKeys);
const opKeys = createOpKeys(calcOpKeys);
// input

let gRawInput = "";
let gCountOperatorPress = 0;

const numKeyAction = (button) => {
    const input = button.textContent;
    gRawInput += input;
    updateDisplay(input);
};

const opKeyAction = (button) => {

    if (gRawInput === "") return;

    const mathOp = button.textContent;

    if (mathOp === "CLEAR") {
        clearAll();
        return;
    }

    ++gCountOperatorPress;

    if (gCountOperatorPress >= 2) {
        gCountOperatorPress = 1;
        
        const result = getResult();

        if (result === false) {
            return;
        }
        gRawInput = result; // returns answer to the calculation

        clearDisplay();
        updateDisplay(gRawInput);

    }

    if (mathOp === "=")
    {
        gCountOperatorPress = 0
    } else {
        gRawInput += mathOp;         
        updateDisplay(mathOp);
    }
    
};

setButtonActions(numKeys, numKeyAction); 

setButtonActions(opKeys, opKeyAction); 



// FUNCTIONS

function getResult()
{
    mathOpIndex = gRawInput.search(/[+|-|*|\/]/); // find the operator
    
    mathOp = gRawInput[mathOpIndex];

    numbers = gRawInput.split(mathOp);

    if (numbers[1] === "") return false; // when a only a single operator and operand are submitted (occurs with "=")

    numOne = numbers[0];
    numTwo = numbers[1];

    const result = mathOperate(numOne, numTwo, mathOp);

    return Number(result).toFixed(3);
}

function clearAll()
{
    clearDisplay()
    gRawInput = "";
    gCountOperatorPress = 0
}


function mathOperate( x, y, mathOp)
{
    x = parseFloat(x);
    y = parseFloat(y);

    switch(mathOp)
    {
        case "+": return x + y;
        case "-": return x - y;
        case "*": return x * y;
        case "/": return x / y;
        default: return "?";
    }
}

function updateDisplay(input)
{
    calcDisplay.textContent += input + " ";
}

function clearDisplay()
{
    calcDisplay.textContent = "";
}


function setButtonActions(buttons, buttonAction) 
{
    buttons.forEach( (b) => {
        b.addEventListener('click', () => {
            buttonAction(b);
        });
    });

}

function createOpKeys(parentElement)
{
    const opSymbols = ["+", "-", "*", "/", "=", "CLEAR"];

    let buttonArray = [];

    for (let i = 0; i < opSymbols.length; i++)
    {
        // create button
        const button = document.createElement("button");

        // add relevant tags
        button.classList.add( "NumKeys");
        button.setAttribute("id", `opKey${opSymbols[i]}`);
        button.textContent = opSymbols[i];
        // append to parent element
        parentElement.appendChild(button);
        
        // add node to list
        buttonArray.push(button);
    }

    return buttonArray;
}

function createNumKeys(parentElement)
{
    let buttonArray = [];

    for (let i = 0; i < 10; i++)
    {
        // create button
        const button = document.createElement("button");

        // add relevant tags
        button.classList.add( "NumKeys");
        button.setAttribute("id", `numKey${i}`);
        button.textContent = i;
        // append to parent element
        parentElement.appendChild(button);

        // add node to list
        buttonArray.push(button);
    }

    return buttonArray;
}


function createSubElements( parentElement, quantity, elementType, elementClass =null, elementID =null)
{
    nodeArray = [];

    for (let i = 0; i < quantity; ++i) 
    {
        // create element
        const element = document.createElement(elementType);
        
        // add relevant tags
        if (elementClass != null)
            element.classList.add(elementClass);
        if (elementID != null)
            element.setAttribute("id", `${elementID}${i + 1}`);
        
            // append to parent element
        parentElement.appendChild(element);
        if (quantity === 1)
            return element;
        else 
            nodeArray.push(element);
    }

    return nodeArray;
}

