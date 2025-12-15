let operandOne= "", operandTwo="", opCode= "";
const inputSection= document.querySelector(".calculator-input");
const ops= ['+', '-', 'x', '÷'];
let isWaitingForSecondInput= false;
let isCalculationDone=false;
document.querySelector(".calculator").addEventListener("click", function (event) {
    if (event.target.tagName !== "BUTTON") {
        return; 
    }
    let numberOrSymbol= event.target.innerText.trim();
    if(numberOrSymbol>="0" && numberOrSymbol<="9") {
        if(ops.includes(inputSection.value)){
            inputSection.value="";
        }
        if(isCalculationDone) {
            operandOne= "";
            operandTwo= "";
            inputSection.value="";
            isCalculationDone=false;
        }
        if(!isWaitingForSecondInput) {
            operandOne+=numberOrSymbol;
        }
        else {
            operandTwo+=numberOrSymbol;
        }
        inputSection.value+=numberOrSymbol;
    }
    else if(ops.includes(numberOrSymbol)) {
        operandOne=inputSection.value;
        inputSection.value= numberOrSymbol;
        opCode= inputSection.value;
        isWaitingForSecondInput=true;
        isCalculationDone=false;
    }
    else if(numberOrSymbol=="C") {
        inputSection.value="";
        operandOne= "";
        operandTwo="";
        isWaitingForSecondInput=false;
    }
    else if(numberOrSymbol=="<-") {
        inputSection.value = inputSection.value.substring(0, inputSection.value.length-1);
        
    }
    else {
        return;
    }
})
document.querySelector(".calculate").addEventListener("click", function(event) {
    if(!ops.includes(inputSection.value)) {
        operandTwo=inputSection.value;
    }
    newOperandTwo= parseFloat(operandTwo);
    newOperandOne= parseFloat(operandOne);
    const finalAnswer= calculateTwoNumbers(newOperandOne, newOperandTwo, opCode);
    inputSection.value= finalAnswer;
    operandOne=finalAnswer;
    operandTwo="";
    isWaitingForSecondInput=false;
    isCalculationDone=true;
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