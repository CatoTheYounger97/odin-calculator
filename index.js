
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
let gMathOpOne = "";
let gMathOpTwo = "";

const numKeyAction = (button) => {
    const numInput = button.textContent;
    gRawInput += numInput;
    updateDisplay(numInput);
};

const opKeyAction = (button) => {

    const opInput = button.textContent;
            
    if (gNumOne === "") gNumOne = gRawInput;
    else gNumTwo = gRawInput;
    // gNumTwo = (gNumOne != "") ? gRawInput : gNumTwo;
    // gNumOne = (gNumOne === "") ? gRawInput : gNumOne;
    
    gRawInput = "";

    gMathOpOne = (gMathOpOne === "") ? opInput : gMathOpOne;

    if (gNumTwo == "") { // if an operator is pressed but no second number has been inputted
        // do nothing
    } else  {
        const result = mathOperate( gNumOne,gNumTwo, gMathOpOne);

        gNumOne = result;
        gNumTwo = "";
        gMathOpOne = (opInput === "=") ? "" : opInput;
    }

    clearDisplay();
    updateDisplay(`${gNumOne} ${gMathOpOne} ${gNumTwo}`);

};




setButtonActions(numKeys, numKeyAction); 

setButtonActions(opKeys, opKeyAction); 



// FUNCTIONS


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

