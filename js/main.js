// The EventTarget method addEventListener() sets up a function 
// that will be called whenever the specified event is delivered 
// to the target.
window.addEventListener('load', init)

import { listDictionaries } from './translations.js'
import { shuffle } from './utility.js'


// Globals

// difficulty levels of time
const levels = {
    easy: 15,
    medium: 10,
    hard: 5
}

// Get elements and add event listeners
const currentWord = document.querySelector('#current-word')
const buttons = document.querySelector('#buttons').children
const timeDisplay = document.querySelector('#time')
const message = document.querySelector('#message')
const scoreDisplay = document.querySelector('#score')
const lowestTime = 5

// Variables
let currentLevel = levels.easy // current difficult level
let time = currentLevel // time in current game
let maxCorrectInRow = 5

let isPlaying
let prevQuestion = ''
let score = 0   //score in game
let correctInRow = 0 // amount corrent in row

// convert buttons to an array
let buttonsElement = Array.prototype.slice.call(buttons)
let wrongButton

// get random index to get a dictionary from our list 
var randomDictionaryIndex 

// dictionary for entire game
var gameDictionary
function init() {

    
    // generate random index, assign it to variable
    randomDictionaryIndex = Math.round(Math.random() * listDictionaries.length)
    gameDictionary = listDictionaries[randomDictionaryIndex]

    // Load word from array
    showWords(gameDictionary)

    // listen to button click event
    document.getElementById("buttons").addEventListener("click", function (event) {

        // I want the individual button elements,
        // not the div. Which is why I'm doing this
        if (event.target.id != 'buttons') {
            startMatch(gameDictionary)
        }

    })

    // Call countdown on every second
    setInterval(countDown, 1000)

    // Check game status
    setInterval(checkStatus, 50)
}

function showWords(dict) {
    

    // english words
    const keysEnglishWords = Object.keys(dict)

    // spanish words
    const valuesSpanishWords = Object.keys(dict).map(key => {

        return dict[key]
    })

    // Generate random index
    var randDictIndex = Math.floor(Math.random() * keysEnglishWords.length)

    // Check if question was asked last time, bascially,
    // I want to make sure same question is not being
    // asked twice
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



    /** Regular Mapping Stop */
}

// Start match
function startMatch(dict) {

    if (matchWords()) {
        isPlaying = true
        showWords(dict)
        time = currentLevel + 1


        score++ // increment score
        correctInRow++ // increment correct in row

        if (correctInRow == maxCorrectInRow && currentLevel != lowestTime) {

            currentLevel = currentLevel - 5 // change level
            time = currentLevel + 1 // change time
            correctInRow = 0 // reset correct in row
            maxCorrectInRow = maxCorrectInRow + 5 // create new max 

        }
    } else {
        score = 0
        correctInRow = 0 // reset correct in row
    }
    scoreDisplay.innerHTML = score

}

var wrongAnswerClicked = false

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value)
}

function matchWords() {

    // english words are keys
    // spanish words are values

    var choiceValue = event.target.innerHTML

    var choiceKey = getKeyByValue(gameDictionary, choiceValue)

    if (choiceValue == null) {
        message.innerHTML = 'Please choose a translation'

    } else if (choiceKey === currentWord.innerHTML) {

        message.innerHTML = 'Correct😁'

        if (wrongAnswerClicked) {
            wrongButton.className = 'button'
        }

        return true
    } else {
        message.innerHTML = 'Not Correct😑'
        wrongButton = event.target
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
        time = 0
    }
    // Show time
    timeDisplay.innerHTML = time
}

// Check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!'
        score = -1
    }
}