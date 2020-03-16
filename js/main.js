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
    easy: 10,
    medium: 7,
    hard: 5
}

// Variables
let currentLevel = levels.easy // current difficult level
let time = levels.easy + 1 // time in current game
let maxCorrectInRow = 3
let isPlaying
let prevQuestion = ''
let score = 0   //score in game
let correctInRow = 0 // amount corrent in row

// convert buttons to an array
let buttonsElement = Array.prototype.slice.call(buttons)
let wrongButtons = []

// get random index to get a dictionary from our list 
var randomDictionaryIndex

// dictionary for entire game
// generate random index, assign it to variable
// randomDictionaryIndex = Math.round(Math.random() * listDictionaries.length)
const gameDictionary = listDictionaries[0]


function init() {


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

    // Gonna make this optional?
    // Call countdown on every second
    setInterval(countDown, 1000)

    // Check game status 50 millisecond or .05 second
    setInterval(checkStatus, 50)
}



// Start match
// begins match 
// decreases time if
// user gets maxCorrectInRow * 2
// ...d 
function startMatch(dict) {

    // if word shown and word clicked match
    if (matchWords()) {
        isPlaying = true
        showWords(dict)
        time = currentLevel + 1 // starts time at extra second

        score++ // increment score
        correctInRow++ // increment correct in row

        
        if (correctInRow == maxCorrectInRow) {
            message.innerHTML += '  Wow, you are really good 😎 '
        } else if (correctInRow == maxCorrectInRow * 2) {
            message.innerHTML += "  Ok, this isn't fair 😲"  
            currentLevel = levels.medium   // change level (nu)
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

        // reset values
        time = 0
        score = 0
        currentLevel = levels.easy 
        correctInRow = 0
    }
    // Show time
    timeDisplay.innerHTML = time
}

// Check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!'
    }
}