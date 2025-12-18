const WORD_URL = "https://words.dev-apis.com/word-of-the-day";
const VALID_URL = "https://words.dev-apis.com/validate-word";
let currentColumn= 0, currentRow= 0;
let wonTheGame= false, lostTheGame= false;
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

function checkifValidAnswer(correctWord) {
    if(isvalidResponse(correctWord)) {
        return true;
    }
    //add class here
    return false;
}

function checkifCorrectAnswer(correctWord) {
    if(correctWord==secretWord) {
        return true;
        // add class here
    }
   
    return false;
}

function colourTheLetters() {

}

function onPress(event) {
    if(wonTheGame || lostTheGame) {
        return;
        
    }
    if(event.key=="Backspace") {
        backSpace();
        return;
    }

    if(event.key=="Enter" && currentColumn==5) {
        let correctWord= ""
        for(let i=0; i<5; i++) {
            correctWord+=document.querySelector(inputArray[currentRow][i]).innerText;
        }
        if(checkifCorrectAnswer(correctWord)) {
            wonTheGame=true;
            //add animation and alert
            return;
        }
        if(checkifValidAnswer(correctWord)) {
            colourTheLetters();
            if(currentRow<6) {
                currentRow++;
                currentColumn=0;
            }
            return;
        }
        else {
            if(currentRow==5) {
                lostTheGame=true;
                //add alert
                return;
            }
        }
    }

    if(!isValidKey(event.key)) {
        event.preventDefault;
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