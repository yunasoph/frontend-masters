let operandOne= "", operandTwo="", opCode= "";
const inputSection= document.querySelector(".calculator-input");
const ops= ['+', '-', 'x', '÷'];
let isWaitingForSecondInput= false;
document.querySelector(".calculator").addEventListener("click", function (event) {
    if (event.target.tagName !== "BUTTON") {
        return; 
    }
    let numberOrSymbol= event.target.innerText.trim();
    if(numberOrSymbol>="0" && numberOrSymbol<="9") {
        if(ops.includes(inputSection.value)){
            inputSection.value="";
        }
        if(isWaitingForSecondInput) {
            operandOne+=numberOrSymbol;
        }
        else {
            operandTwo+=numberOrSymbol;
        }
        inputSection.value+=numberOrSymbol;
    }
    else if(ops.includes(numberOrSymbol)) {
        inputSection.value= numberOrSymbol;
        opCode= inputSection.value;
        isWaitingForSecondInput=true;
    }
    else if(numberOrSymbol=="C") {
        inputSection.value="";
    }
    else if(numberOrSymbol=="<-") {
        inputSection.value = inputSection.value.substring(0, inputSection.value.length-1);
    }
    else {
        return;
    }
})
document.querySelector(".calculate").addEventListener("click", function(event) {
    operandTwo= parseInt(operandTwo);
    operandOne= parseInt(operandOne);
    const finalAnswer= calculateTwoNumbers(operandOne, operandTwo, opCode);
    inputSection.value= finalAnswer;
})


function calculateTwoNumbers(opOne, opTwo, opCode) {
    if(opCode=="+") {
        return opOne + opTwo;
    }
    else if(opCode=="-") {
        return opOne - opTwo;
    }
    else if(opCode=="x") {
        return opOne* opTwo;
    }
    else if(opCode=="÷") {
        return opOne / opTwo;
    }
}