// The EventTarget method addEventListener() sets up a function 
// that will be called whenever the specified event is delivered 
// to the target.
window.addEventListener('load', init)

import {kitchenBank} from './translations.js'
import {shuffle, reverseMapping} from './utility.js'

// Variable
var time = 5
var score = 0

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


function init(){

    // Load word from array
    showWords(kitchenBankReverse)

    

    // Match word when user clicks button
    // document.getElementById("buttons").addEventListener("click", function (event) {
    //     matchWords(event)
    // })
    document.getElementById("buttons").addEventListener("click", function (event) {
        startMatch(event)
    })

    

    // Call countdown on every second
    setInterval(countDown, 1000)


}

function showWords(dict) {

    // put all key and values of bank in two separate list
    const keys = Object.keys(dict)

    const values = Object.keys(dict).map(key => {

        return dict[key]
    })

    // Generate random index
    var randIndex = Math.floor(Math.random() * keys.length)
    var keyValue = keys[randIndex]

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
    currentWord.innerHTML = keyValue

    // Change buttons to show options
    buttonsElement.map((button, index) => {
        return button.innerHTML = choices[index]
    })
}

// Start match
function startMatch(){
       
    
    if(matchWords()){
        console.log("This was correct, keep playing")
        showWords(kitchenBankReverse)
        time = 5
        score++
    }
    scoreDisplay.innerHTML = score

}


function matchWords() {

    
    var value = event.target.innerHTML
    if(value == null){
        message.innerHTML = 'Please choose a translation'
        
    }else if (kitchenBank[value] === currentWord.innerHTML) {
        
        message.innerHTML = 'Correct!😁'
        return true
    } else {
        
        message.innerHTML = 'Not Correct!😑'
        return false
    }
    
}


// Countdown timer
function countDown() {

    // Make sure time is not run out
    if(time > 0){
        // Decrement 
        time--;
    }else if(time === 0){
        // Game is over
        time = 0
    }
    // Show time
    timeDisplay.innerHTML = time
}
















