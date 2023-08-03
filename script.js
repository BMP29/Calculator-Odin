const keys = document.querySelectorAll('.key');
const displayMain = document.getElementById('displayMain');
const displaySecondary = document.getElementById('displaySecondary');
const opKey = document.querySelectorAll('.opKey');
const clear = document.getElementById('clear');
const backSpace = document.getElementById('backSpace');

let isFirst = true;

let num1, num2, op;
num1 = num2 = result = null;

//display the number in the Main Display and store the value in a variable
keys.forEach((key) => {
    key.addEventListener('click', () => {
        if(isNaN(+(displayMain.textContent+key.value))) return;
        
        console.log(+(displayMain.textContent+key.value));
        displayMain.textContent += key.value;
        storeNumbers();
    });
});

//clear the display and reset the variables that make up the expression
clear.addEventListener('click', clearVars);

//delete the last caracter of the number being displayed in the Main Display
backSpace.addEventListener('click', () => {
    displayMain.textContent = displayMain.textContent.slice(0, -1);
    storeNumbers();
});

function clearVars() {
    num1 = num2 = result = op = null;
    isFirst = true;
    displayMain.textContent = '';
    displaySecondary.textContent = '';
}

//store the number typed by the user on num1 or num2, depending on
//wheter this is the 1# or 2# num of the operation
function storeNumbers() {
    if(isFirst) num1 = +(displayMain.textContent);
    else num2 = +(displayMain.textContent);
}

//controls how the expression will be displayed in both displays 
//and when the calculation must be made (if is the 2# num -> does the calculation)
opKey.forEach((key) => {
    key.addEventListener('click', () => {
        displayMain.textContent = '';
        let tempOp;

        console.log("num1 " + num1 + " num2 " + num2);

        if(isFirstNumber() != true) {
            if(num2 == 0 && op == '/') {
                alert("You can't divide by 0");
                clearVars();
                return;
            }
            tempOp = op;
            operate(num1, num2, op);
            result = +result.toFixed(2);
            displayMain.textContent = result;
            op = key.value;
        }else op = key.value;
        
        if(op == '=' && num1 != undefined && num2 != undefined) {
            displaySecondary.textContent = `${num1} ${tempOp} ${num2}`;
            isFirstNumber();
            num1 = result;
            num2 = undefined;
        }
        else if(op != '='){
            if(result != null) {
                num2 = num1 = result;
                isFirstNumber();
            }
            displaySecondary.textContent = `${num1} ${op} `;
        }else {
            clearVars();
        }
    });
});

//return if the number is the first
function isFirstNumber() {
    if(isFirst === true) isFirst = false;
    else isFirst = true;

    return !isFirst;
}

//calls the right operation (the one stored in the variable *operator*)
function operate(a, b, operator) {
    switch(operator) {
        case '+':
            add(a, b);
        break;

        case '-':
            subtract(a, b);
        break;

        case 'x':
            multiply(a, b);
        break;

        case '/':
            divide(a, b);
        break;
    }
    console.log("num1: " + a + " num2: " + b + "operator: " + operator);
}

//operations
function add(a, b) {
    result = (+a) + (+b);
}

function subtract(a, b) {
    result = (+a) - (+b);
}

function multiply(a, b) {
    result = (+a) * (+b);
}

function divide(a, b) {
    result = (+a) / (+b);
}