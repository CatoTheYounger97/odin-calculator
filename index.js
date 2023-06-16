
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
let gNumOne = "";
let gNumTwo = "";
let gMathOperator = "";

const numKeyAction = (button) => {

    if ( calcDisplay.textContent.includes("=") ) return;

    num = button.textContent;

    gRawInput += num;

    // update display
    updateDisplay(num);

    console.log(gRawInput);

};

const opKeyAction = (button) => {

    if (button.textContent === "CLEAR") {
        clearAll();
        return;
    }

    if (gRawInput === "") return; // no number present to operate on

    if (gMathOperator === "") {
        gMathOperator = button.textContent;
        gNumOne = gRawInput;
        gRawInput = "";
        updateDisplay(gMathOperator);
    } else {
        gNumTwo = gRawInput;
        gRawInput = 0;

        let result = mathOperate(gNumOne, gNumTwo, gMathOperator);

        result = Number(result.toFixed())
        
        gNumOne = result;
        gNumTwo = "";
        gMathOperator = button.textContent;

        clearDisplay();

        updateDisplay(result);

        if ( gMathOperator === "=") {
            gMathOperator = "";

        } else {
            updateDisplay(gMathOperator);
        }
        
    }
};

setButtonActions(numKeys, numKeyAction); 

setButtonActions(opKeys, opKeyAction); 



// FUNCTIONS

function clearAll()
{
    clearDisplay()
    gRawInput = "";
    gNumOne = "";
    gNumTwo = "";
    gMathOperator = "";
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

