
// create calculator body structure
const pageContainer = createSubElements( document.body, 1, "div", null, "pageContainer");
const calcDisplay = createSubElements(pageContainer, 1, "div", null, "calcDisplay");
calcDisplay.innerText = "PLACEHOLDER";
const calcKeypad = createSubElements(pageContainer, 1, "div", null, "calcKeypad");
// create calculator buttons
const calcNumKeys = createSubElements(calcKeypad, 1, "div", null, "calcNumKeys");
const calcOpKeys = createSubElements(calcKeypad, 1, "div", null, "calcOpKeys");

createNumKeys(calcNumKeys);
createOpKeys(calcOpKeys);
// input

let gCalcInput = [];

// calculate 

// display 

numKeyAction(calcDisplay);


function numKeyAction(display) 
{
    const button = document.querySelectorAll(".NumKeys");

    button.forEach( (b) => {
        b.addEventListener('click', () => {
            gCalcInput.push(b.innerText);
            display.innerText = gCalcInput.join("");
        });
    });

}

function createOpKeys(parentElement)
{
    const opSymbols = ["+", "-", "*", "/", "=", "CLEAR"];

    let buttonArray = [];

    for (let i = 0; i < 6; i++)
    {
        // create button
        const button = document.createElement("button");

        // add relevant tags
        button.classList.add( "NumKeys");
        button.setAttribute("id", `opKey${opSymbols[i]}`);
        button.innerText = opSymbols[i];
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
        button.innerText = i;
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

function calcDisplayClear()
{
    document.querySelector("#calcDisplay1").innerText = "";
}


function mathOperate( x, y, mathOp)
{
    switch(mathOp)
    {
        case "+": return x + y;
        case "-": return x - y;
        case "*": return x * y;
        case "/": return x / y;
        default: return "?";
    }
}