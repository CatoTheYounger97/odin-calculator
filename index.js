
// create calculator body structure
const pageContainer = createSubElements( document.body, 1, "div", null, "pageContainer");
const calcContainer = createSubElements( pageContainer, 1, "div", null, "calcContainer");
const calcDisplayContainer = createSubElements(calcContainer, 1, "div", null, "calcDisplayContainer");
const calcDisplayTop = createSubElements(calcDisplayContainer, 1, "div", "CalcDisplay", "calcDisplayTop");
const calcDisplayBottom = createSubElements(calcDisplayContainer, 1, "div", "CalcDisplay", "calcDisplayBottom");
const calcKeypad = createSubElements(calcContainer, 1, "div", null, "calcKeypad");
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
calcDisplayBottom.textContent = gResult;
calcDisplayTop.textContent = gResult;


// calculate

const inputAction = (input) => {

    switch(input)
    {   
        case "CLEAR":
            clearAll();
            break;

        case "DEL": 
            gResult = (gMathOp === "") 
                ? gNum1 = gNum1.slice(0, -1) 
                : gNum2 = gNum2.slice(0, -1);
            break;

        case "MINUS": 
            if (gMathOp === "=") {
                gNum1 = (gNum1 * (-1)).toString()
                gResult = gNum1;
                break;
            }
            gResult = (gMathOp === "") 
                ? gNum1 = (gNum1 * (-1)).toString() 
                : gNum2 = (gNum2 * (-1)).toString();
            break;

        case ".": 
                

            gResult = (gMathOp === "") 
                ? gNum1 = (gNum1.includes(".") === false) ? gNum1 = (gNum1*1).toString() + input : gNum1
                : gNum2 = (gNum2.includes(".") === false) ? gNum2 = (gNum2*1).toString() + input : gNum2;
            break;

        case "+": 
        case "-": 
        case "*": 
        case "/": 
        case "=":

            if (gMathOp  === "/" && gNum2 == 0 && gNum1 != "") {
                calcDisplayBottom.textContent = "Can't divide by 0!";
                clearAll();
                return; // after a clear all, warning message remains until next input
            }

            gResult = mathOperate(gNum1, gNum2, gMathOp);

            gMathOp = input;

            gNum1 = gResult;
            gNum2 = "";
            break;            

        default: 
            if (gMathOp === "=" || gNum1 === "") {
                gNum1 = "";
                gMathOp = "";
            }

            gResult = (gMathOp === "") ? gNum1 += input : gNum2 += input;
            // prevents second operand from being inputed if no operator is provided.
    }

    
    // first number
    // operator 
    // second number


    // update display
    console.log(gNum1 + " " + gMathOp + " " + gNum2);
    console.log(gResult);

    calcDisplayBottom.textContent = gResult;

    if ( gMathOp === "=")
        calcDisplayTop.textContent += (calcDisplayTop.textContent.includes("=") === false) ? " =" : "";
    else
        calcDisplayTop.textContent = gNum1 + " " + gMathOp + " " + gNum2; // add to sum preview

    if (calcDisplayTop.textContent === "  ") calcDisplayTop.textContent = 0; // value will be double empty space after clear/full Del
    if (calcDisplayBottom.textContent === "") calcDisplayBottom.textContent = 0;
    
}

setButtonActions(numKeys, inputAction); 
setButtonActions(opKeys, inputAction); 

document.addEventListener("keydown", (e) => {
    
    // if (e.repeat) return;

    let key = e.key;

    switch(key)
    {
        case "+": 
        case "-": 
        case "*": 
        case "/": 
        case "=":
        case "Backspace":
        case "Enter":
            break;
        default:
            if (key >= 0) break;
            return;
    }

    switch(key)
    {
        case "Backspace": key = "DEL"; break;
        case "Enter": key = "="; break;
    }

    inputAction(key);
});


// FUNCTIONS

function mathOperate( x, y, op)
{
    if (y === "") return x;
    
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
    gNum1 = "";
    gNum2 = "";
    gMathOp = "";
    gResult = 0;

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
    const opSymbols = ["+", "CLEAR", "-", "DEL", "*", "MINUS", "/", ".", "="];

    let buttonArray = [];

    for (let i = 0; i < opSymbols.length; i++)
    {
        // create button
        const button = document.createElement("button");

        // add relevant tags
        button.classList.add( "OpKeys");
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

    for (let i = 1; i <= 10; i++)
    {
        // create button
        const button = document.createElement("button");

        // add relevant tags
        button.classList.add( "NumKeys");
        button.setAttribute("id", `numKey${i}`);
        button.textContent = i ;

        if ( i == 10) {
            button.setAttribute("id", `numKey0`);
            button.textContent = "0" ;
        }

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

