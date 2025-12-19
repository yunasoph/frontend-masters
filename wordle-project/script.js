const WORD_URL = "https://words.dev-apis.com/word-of-the-day";
const VALID_URL = "https://words.dev-apis.com/validate-word";
let currentColumn= 0, currentRow= 0;
let wonTheGame= false, lostTheGame= false, isLoading=false;
const inputArray = [
    [".grid-1", ".grid-2", ".grid-3", ".grid-4", ".grid-5"],
    [".grid-6", ".grid-7", ".grid-8", ".grid-9", ".grid-10"],
    [".grid-11", ".grid-12", ".grid-13", ".grid-14", ".grid-15"],
    [".grid-16", ".grid-17", ".grid-18", ".grid-19", ".grid-20"],
    [".grid-21", ".grid-22", ".grid-23", ".grid-24", ".grid-25"],
    [".grid-26", ".grid-27", ".grid-28", ".grid-29", ".grid-30"]
]
async function wordOfTheDay() {
    const promise = await fetch(WORD_URL);
    const processedResponse = await promise.json();
    const word= processedResponse.word;
    return word;
}
async function isvalidResponse(guessedWord) {
    const postJSON= {"word" : guessedWord};
    const promise = await fetch(VALID_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(postJSON)
    })
    const data= await promise.json();
    return data.validWord;
}

function isValidKey(key) {
    return /^[a-zA-Z]$/.test(key);
}

function backSpace() {
    if(currentColumn==0) {
        return;
    }
    currentColumn--;
    document.querySelector(inputArray[currentRow][currentColumn]).innerText= "";
}

function checkifCorrectAnswer(correctWord) {
    if(correctWord==secretWord) {
        return true;
    }
    return false;
}

function colourTheLetters(caseToConsider) {
    if(caseToConsider=="Won") {
        for(let i=0; i<5; i++) {
            const div= document.querySelector(inputArray[currentRow][i]);
            div.classList.add("green");
        }
    }
    else if(caseToConsider=="Invalid") {
        for(let i=0; i<5; i++) {
            document.querySelector(inputArray[currentRow][i]).classList.add("red");
        }
        setTimeout(function() {
          for (let i = 0; i < 5; i++) {
            document.querySelector(inputArray[currentRow][i]).  classList.remove("red");
          }
        }, 2000);
    }
    else {
        for(let i=0;i<5;i++) {
            const div=document.querySelector(inputArray[currentRow][i]);
            if(secretWord.includes(div.innerText)) {
                if(secretWord[i]==div.innerText) {
                    div.classList.add("green");
                }
                else {
                    div.classList.add("yellow");
                }
            }
            else {
                div.classList.add("grey");
            }
        }
    }
}

async function onPress(event) {
    if(wonTheGame || lostTheGame) {
        return;
    }
    if(event.key=="Backspace") {
        backSpace();
        return;
    }
    if(isLoading) {
        return;
    }

    if(event.key=="Enter" && currentColumn==5) {
        let correctWord= "";
        for(let i=0; i<5; i++) {
            correctWord+=document.querySelector(inputArray[currentRow][i]).innerText;
        }
        if(checkifCorrectAnswer(correctWord)) {
            wonTheGame=true;
            colourTheLetters("Won");
            alert("You won!");
            return;
        }
        isLoading= true;
        const isValid= await isvalidResponse(correctWord);
        isLoading=false;
        if(isValid) {
            colourTheLetters("Valid");
            if(currentRow<5) {
                currentRow++;
                currentColumn=0;
            }
            else {
                lostTheGame=true;
               
                alert(`You lost! The word was ${secretWord}`);
            }
            return;
        }
        else {
            alert("Not a valid word!");
            colourTheLetters("Invalid")
        }
    }

    if(!isValidKey(event.key)) {
        event.preventDefault();
        return;
    }
    if(currentColumn<5) { 
        document.querySelector(inputArray[currentRow][currentColumn]).innerText= event.key.toUpperCase();
        currentColumn++;
    }
    return;
}
 
let secretWord = "";

async function init() {
    secretWord = await wordOfTheDay();
    secretWord = secretWord.toUpperCase(); 
}

init();
document.addEventListener("keydown", onPress);