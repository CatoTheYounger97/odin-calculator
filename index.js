
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
let gEqualsUsed = false;

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
    if (gMathOp1 === "/" && gNum2 === "0")
    {
        alert("can't divide by 0!");
        clearAll();
        return false;
    }
    return mathOperate(gNum1, gNum2, gMathOp1);
}

function inputNum(input) 
{
    if (gEqualsUsed) {
        gNum1 = "";
        gEqualsUsed = false;
    }
    
    if (gMathOp1 === "")       
        gNum1 += input;
    else gNum2 += input;
}
function inputOperator(input) 
{
    gEqualsUsed = false;

    if (gNum1 === "" &&  gNum2 === "") return;

    if (gNum2 === "")
        gMathOp1 = input;
    else gMathOp2 = input;
}

function inputSelf(input) 
{
    switch(input)
    {
        case ".":
            if (gEqualsUsed) {
                gNum1 = "0.";
                gEqualsUsed = false;
            }

            if (gNum2 != "" && !gNum2.includes("."))
                gNum2 += ".";
             else if (gNum1 != "" && !gNum1.includes("."))  
                gNum1 += ".";
            else ; // do nothing

            break;
        case "=":
            gMathOp2 = "=";
            const result = tryMathOp();
            
            if (Boolean(result)) {
                clearAll();               
                gNum1 = result;
                gEqualsUsed = true;
            }
            gMathOp2 = "";
            break;

        case "CLEAR":
            clearAll();
            break;
            
        case "MINUS":
            //todo
            if (gNum2 != "")
                gNum2 = (+gNum2 * (-1)).toString();
            else if (gNum1 != "")  
                gNum1 = (+gNum1 * (-1)).toString();
            else ; // do nothing

            break;
            
        case "DEL":
            if (gNum2 != "")
                gNum2 = gNum2.slice(0, -1);
            else if (gMathOp1 != "")
                gMathOp1 = "";
            else if (gNum1 != "") // allows deletion pre and calculation
                gNum1 = gNum1.toString().slice(0, -1);
            else ;// do nothing

            break;

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

