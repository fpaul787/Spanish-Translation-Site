// The EventTarget method addEventListener() sets up a function 
// that will be called whenever the specified event is delivered 
// to the target.
window.addEventListener('load', init)

import { listDictionaries } from './translations.js'
import { shuffle } from './utility.js'


// Globals

// Get elements and add event listeners
const currentWord = document.querySelector('#current-word')
const buttons = document.querySelector('#buttons').children
const timeDisplay = document.querySelector('#time')
const message = document.querySelector('#message')
const specialMessage = document.querySelector('#specialMessage')
const scoreDisplay = document.querySelector('#score')

// difficulty levels of time
const levels = {
    easy: 2,
    medium: 7,
    hard: 5
}

// Variables
let currentLevel = levels.easy // current difficult level
let time = levels.easy + 1 // time in current game
let maxCorrectInRow = 5     // max amount correct in a row
let isPlaying = false   // boolean to determine if game is over
let prevQuestion = '' // previous question asked
let score = 0   //score in game
let correctInRow = 0 // amount corrent in row

// convert buttons element from DOM to an array
let buttonsElement = Array.prototype.slice.call(buttons)
let wrongButtons = [] // array of wrong answer choices from user


// get random index to get a dictionary from our list 
var randomDictionaryIndex = Math.round(Math.random() * listDictionaries.length)

// dictionary for entire game
var gameDictionary = listDictionaries[0]

var idVar


function init() {


    // Load word from array
    showWords()
    startMatch(gameDictionary)

    // listen to button click event
    document.getElementById("buttons").addEventListener("click", function (event) {

        // I want the individual button elements,
        // not the div. Which is why I'm doing this
        // I also don't want the start over button
        if(event.target.id == 'startoverbtn'){
            let startOverButtonElement = document.getElementById("startoverbtn")
            document.getElementById("buttons").removeChild(startOverButtonElement)

            // disable buttons
            buttonsElement.map((button, index) => {
                button.disabled = false
            })  
            showWords()
            isPlaying = true
            startMatch(gameDictionary)
            
            
        }
        else if (event.target.id != 'buttons' ) {
            startMatch(gameDictionary)
        }

    })    
}


function startMatch(dict) {

    // Gonna make this optional?
    // Call countdown on every second
    idVar = setInterval(() => {
        countDown()
    },1000)

    // if word shown and word clicked match

    if (matchWords()) {
        isPlaying = true
        showWords() // FIXME, might need to be place in better position
        time = currentLevel + 1 // starts time at extra second

        score++ // increment score
        correctInRow++ // increment correct in row


        if (correctInRow == maxCorrectInRow) {
            message.innerHTML += '  Wow, you are really good 😎 '

        } else if (correctInRow == maxCorrectInRow * 2) {
            message.innerHTML += "  Ok, this isn't fair 😲"

            // change level (this will change time user has to choose answer)
            currentLevel = levels.medium


            changeDictionary()

            // change question and values to 
            // reflect change in dictionary
            showWords()


        } else if (correctInRow == maxCorrectInRow * 3) {
            currentLevel = levels.hard
            message.innerHTML += "  Nice! 😜"
        }
    } else { // if user clicks on wrong translation
        score = 0
        correctInRow = 0 // reset correct in row
        currentLevel = levels.easy
        
    }
    scoreDisplay.innerHTML = score
}

function changeDictionary() {

    var index = Math.round(Math.random() * listDictionaries.length)
    while (index === randomDictionaryIndex) {
        index = Math.round(Math.random() * listDictionaries.length)
    }
    randomDictionaryIndex = index
    gameDictionary = listDictionaries[randomDictionaryIndex]

}

function showWords() {



    // english words
    const keysEnglishWords = Object.keys(gameDictionary)

    // spanish words
    const valuesSpanishWords = Object.keys(gameDictionary).map(key => {
        return gameDictionary[key]
    })

    // Generate random index
    var randDictIndex = Math.floor(Math.random() * keysEnglishWords.length)

    // Check if question was asked last time, bascially,
    // I want to make sure same question is not being
    // asked twice (one after another)
    // === is strict comparison

    while (prevQuestion === keysEnglishWords[randDictIndex]) {

        randDictIndex = Math.floor(Math.random() * keysEnglishWords.length)
    }
    prevQuestion = keysEnglishWords[randDictIndex]
    var questionAsked = keysEnglishWords[randDictIndex]

    var answerIndex = randDictIndex // answer to our question

    // create list of choice and add answer
    var choices = []
    choices.push(valuesSpanishWords[answerIndex])

    // Add two more options
    while (choices.length != 3) {
        randDictIndex = Math.floor(Math.random() * keysEnglishWords.length)
        if (!choices.includes(valuesSpanishWords[randDictIndex])) {
            choices.push(valuesSpanishWords[randDictIndex])
        }
    }

    // Shuffle choices
    shuffle(choices)

    // Output random Spanish word
    currentWord.innerHTML = questionAsked

    // Change buttons to show options
    buttonsElement.map((button, index) => {
        return button.innerHTML = choices[index]
    })

}

var wrongAnswerClicked = false

function getKeyByValue(object, value) {

    return Object.keys(object).find(key => object[key] === value)
}

function matchWords() {

    // english words are keys
    // spanish words are values

    // choice that user clicks on
    var choiceValue = event.target.innerHTML

    // getting key of that choice(value)
    var choiceKey = getKeyByValue(gameDictionary, choiceValue)

    if (choiceValue == null) {
        message.innerHTML = 'Please choose a translation'

    } else if (choiceKey === currentWord.innerHTML) {


        message.innerHTML = 'Correct😁'

        if (wrongAnswerClicked) {
            wrongButtons.map(val => {
                val.className = 'button'
            })

        }

        return true
    } else {
        message.innerHTML = 'Not Correct😑'
        wrongButtons.push(event.target)
        event.target.className = "buttonWrongChoice"
        wrongAnswerClicked = true
        return false
    }

}

// Countdown timer
function countDown() {

    // Make sure time is not run out
    if (time > 0) {
        // Decrement 
        time--
    } else if (time === 0) {
        // Game is over
        isPlaying = false
        
        clearInterval(idVar)

        // reset values
        time = 0
        score = 0
        currentLevel = levels.easy
        correctInRow = 0        
        checkStatus()
    }
    // Show time
    timeDisplay.innerHTML = time
}

// Check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!'

        // disable buttons
        buttonsElement.map((button) => {
            button.disabled = true
        })

        var startOverButton = document.createElement("button")
        startOverButton.innerHTML = "Start Over"
        startOverButton.className = "startOverButton"
        startOverButton.id = "startoverbtn"
        document.getElementById("buttons").appendChild(startOverButton)
    }
}