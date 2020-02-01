// The EventTarget method addEventListener() sets up a function 
// that will be called whenever the specified event is delivered 
// to the target.
window.addEventListener('load', init)

import { kitchenBank } from './translations.js'
import { shuffle, reverseMapping } from './utility.js'


// Globals

// difficulty levels of time
const levels = {
    easy: 15,
    medium: 10,
    hard: 5
}


let currentLevel = levels.easy // current difficult level
let time = currentLevel // time in current game
let maxCorrectInRow = 5
const lowestTime = 5
let isPlaying
let prevQuestion = ''

// Variables
let score = 0   //score in game
let correctInRow = 0 // amount corrent in row

// Get elements and add event listeners
const currentWord = document.querySelector('#current-word')
const buttons = document.querySelector('#buttons').children
const timeDisplay = document.querySelector('#time')
const message = document.querySelector('#message')
const scoreDisplay = document.querySelector('#score')


// convert buttons to an array
var buttonsElement = Array.prototype.slice.call(buttons)

// reverse bank so that spanish words are keys, and english
// words are values
var kitchenBankReverse = reverseMapping(kitchenBank)


function init() {

    // Load word from array
    showWords(kitchenBankReverse)

    // listen to button click event
    document.getElementById("buttons").addEventListener("click", function (event) {
        startMatch(event)
    })


    // Call countdown on every second
    setInterval(countDown, 1000)


    // Check game status
    setInterval(checkStatus, 50)
}

function showWords(dict) {

    // put all key and values of bank in two separate list
    const keys = Object.keys(dict)

    const values = Object.keys(dict).map(key => {

        return dict[key]
    })

    // Generate random index
    var randIndex = Math.floor(Math.random() * keys.length)


    // Check if question was asked last time, bascially,
    // I want to make sure same question is not being
    // asked twice
    // === is strict comparison
    while (prevQuestion === keys[randIndex]) {
        randIndex = Math.floor(Math.random() * keys.length)
    }
    prevQuestion = keys[randIndex]
    var questionAsked = keys[randIndex]



    var answerIndex = randIndex // answer to our question

    // create list of choice and add answer
    var choices = []
    choices.push(values[answerIndex])

    // Add two more options
    while (choices.length != 3) {
        randIndex = Math.floor(Math.random() * keys.length)
        if (!choices.includes(values[randIndex])) {
            choices.push(values[randIndex])
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

// Start match
function startMatch() {

    if (matchWords()) {
        isPlaying = true
        showWords(kitchenBankReverse)
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


function matchWords() {


    var value = event.target.innerHTML
    if (value == null) {
        message.innerHTML = 'Please choose a translation'

    } else if (kitchenBank[value] === currentWord.innerHTML) {

        message.innerHTML = 'Correct😁'

        // Inefficient, but cant figure out way
        // to change red button back to green
        // Change buttons to show options
        buttonsElement.map((button, index) => {
            return button.className = 'button'
        })
        return true
    } else {

        message.innerHTML = 'Not Correct😑'
        console.log(event.target.className)
        event.target.className = "buttonWrongChoice"
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
















