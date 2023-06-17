
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

// function Calculation() {
//     this.num1 = "";
//     this.num2 = "";
//     this.operater = "";
//     this.calculate = mathOperate(num1, num2, num3);
// }

// gCalculation = {
//     num1: "",
//     num2: "",
//     operator: "",
//     calculate: mathOperate(this.num1, this.num2, this.operator),
// };

let gNum1 = "";
let gNum2 = "";
let gMathOp1 = "";
let gMathOp2 = "";

// calculate

const buttonAction = (button) => {
     input = button.textContent;
    // sort input 
    // classify input and return (num, operator, =, clear, etc)
    const typeOfInput  = classifyInput(input);

    // take action based on classification of input
    switch(typeOfInput)
    {
        case "number":
            inputNum(input);
            break;
        case "operator":
            inputOperator(input);
            break;
        case "self": // input is a unique catagory described by the input string itself
            inputSelf(input);
            break;
        default: console.log("error in switch statement");
    }
    // if num store in object 
    // if operator then]
    // if other then 

    // try to calculate
    // return result or outcomes if failed
    const result = tryMathOp();
    
    if (Boolean(result)) {
        console.log("result outcome");
        gNum1 = result;
        gNum2 = "";
        gMathOp1 = gMathOp2;
        gMathOp2 = ""; 
    }


    // update display
    clearDisplay();
    updateDisplay(gNum1 + gMathOp1 + gNum2);
    
}

setButtonActions(numKeys, buttonAction); 
setButtonActions(opKeys, buttonAction); 

// FUNCTIONS

function tryMathOp()
{
    if (gMathOp2 === "") return false;

    return mathOperate(gNum1, gNum2, gMathOp1);
}

function inputNum(input) 
{
    if (gMathOp2 === "=") {
        gMathOp2 = "";
        gNum1 = "";
    }
    

    if (gMathOp1 != "")       
        gNum2 += input;
    else gNum1 += input;
}
function inputOperator(input) 
{
    if (gMathOp2 === "=") gMathOp2 = "";

    if (gNum2 === "")
        gMathOp1 = input;
    else gMathOp2 = input;
}

function inputSelf(input) 
{
    switch(input)
    {
        case "=":
            const result = mathOperate(gNum1, gNum2, gMathOp1);
    
            if (Boolean(result)) {
                console.log("result outcome");
                clearAll();
                gNum1 = result;
            }
            gMathOp2 = "=";
            break;

        case "CLEAR":
            clearAll();
            break;
            
        case ".":
            //todo
        default:
            console.log("error in switch statement");
    }

}


function classifyInput(input)
{
    if (input <= 9 || input <= 0)
        return "number";

    switch(input)
    {
        case "+": 
        case "-":
        case "*":
        case "/":
            return "operator";
        default: return "self";
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
        default: return false;
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

