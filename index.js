
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

let gNum1 = "";
let gNum2 = "";
let gMathOp = "";
let gResult = 0;
calcDisplay.textContent = gResult;

// calculate

const inputAction = (input) => {

    switch(input)
    {
        case "+": 
        case "-": 
        case "*": 
        case "/": 

            // gMathOp = input;
            gResult = mathOperate(gNum1, gNum2, gMathOp);
            gMathOp = input;

            gNum1 = gResult;
            gNum2 = "";
            break;

        default: 
            // if ( gMathOp === "") {
            //     gNum1 += input;
            //     gResult = gNum1;
            // } else {
            //     gNum2 += input;
            //     gResult = gNum2;
            // }

            gResult = (gMathOp === "") ? gNum1 += input : gNum2 += input;
    }

    
    // first number
    // operator 
    // second number


    // update display
    console.log(gNum1 + " " + gMathOp + " " + gNum2);
    console.log(gResult);

    calcDisplay.textContent = gResult;
}

setButtonActions(numKeys, inputAction); 
setButtonActions(opKeys, inputAction); 

document.addEventListener("keydown", (e) => {

    if (e.repeat) return;

    inputAction(e.key);
});


// FUNCTIONS

function mathOperate( x, y, op)
{
    // x = (Boolean(x) === false ? 0 : parseFloat(x));
    // y = (Boolean(y) === false ? 1 : parseFloat(y));
    // op = (Boolean(op) === false ? "*" : op);

    if (Boolean(y) === false) return x;
    
    x = parseFloat(x);
    y = parseFloat(y);

    switch(op)
    {
        case "+": return x + y;
        case "-": return x - y;
        case "*": return x * y;
        case "/": return x / y;
        default: return false;
    }
}

function clearAll()
{
    clearDisplay();
    gNum1 = "";
    gNum2 = "";
    gMathOp1 = "";
    gMathOp2 = "";

}




function updateDisplay(input)
{
    calcDisplay.textContent += input;
}

function clearDisplay()
{
    calcDisplay.textContent = "";
}


function setButtonActions(buttons, buttonAction) 
{
    buttons.forEach( (b) => {
        b.addEventListener('click', () => {
            buttonAction(b.textContent);
        });
    });

}

function createOpKeys(parentElement)
{
    const opSymbols = ["+", "-", "*", "/", "=", "CLEAR", "MINUS", "DEL", "."];

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

