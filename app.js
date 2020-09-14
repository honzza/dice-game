document.addEventListener('DOMContentLoaded', () => {
	
	const diceField = document.getElementById('dice-field')
	const score = document.getElementById('score')
	const total = document.getElementById('total')
	const rollButton = document.getElementById('roll')
	rollButton.addEventListener('click', () => {
        closeRoll()
        updateAllDice(0)
    })
	const roundButton = document.getElementById('round')
	roundButton.addEventListener('click', () => {
        closeRound()
    })
	
	const dotDef = [
		[0,1,2,3,5,6,7,8],
		[0,1,3,4,5,7,8],
		[0,1,3,5,7,8],
		[1,3,4,5,7],
		[1,3,5,7],
		[1,4,7],
	]
	let rollScore
	let totalScore = 0
	let countSelected = 0
	
	class Dice {
		constructor(value, selected, disabled) {
			this.value = value
			this.selected = selected
			this.disabled = disabled
        }
        createDice(i) {
			const dice = document.createElement('div')
			dice.setAttribute('id', i)
            dice.classList.add('dice')
            diceField.appendChild(dice)
            dice.addEventListener('click', () => {
				if(this.selected && !this.disabled) {
					dice.classList.remove('selected')
					this.selected = false
					countSelected--
                } else {
					dice.classList.add('selected')
					this.selected = true
					countSelected++
                }
                updateScore()
            })
			//create dots on dice
			for(let j = 0; j < 9; j++) {
                const dot = document.createElement('div')
                dot.setAttribute('id', (i.toString() + j.toString()))
                dot.classList.add('dot')
                if(dotDef[i].includes(j)) dot.setAttribute('style', 'visibility:hidden')
                dice.appendChild(dot)
            }
        }
	}
	
	function updateAllDice(i) {
		for(let element of diceArray) {
			const dice = document.getElementById(i)
			if(element.selected) {
				i++
				continue
			}
			element.value = Math.floor(Math.random() * 6) + 1
			//update dots on dice
			for(let j = 0; j < 9; j++) {
				const dot = document.getElementById(i.toString() + j.toString())
				dotDef[element.value - 1].includes(j) ? dot.style = 'visibility:hidden' : dot.removeAttribute('style')
			}
			i++
		}
	}
	
	function updateScore() {
		const scoreValues = [{},
				 {1: 100, 2: 200, 3: 1000, 4: 2000, 5: 4000, 6: 8000}, 
				 {3: 200, 4: 400, 5: 800, 6: 1600},
				 {3: 300, 4: 600, 5: 1200, 6: 2400},
				 {3: 400, 4: 800, 5: 1600, 6: 3200},
				 {1: 50, 2: 100, 3: 500, 4: 1000, 5: 2000, 6: 4000},
				 {3: 600, 4: 1200, 5: 2400, 6: 4800}
				]
		let valuesArray = []
        let count = {}
		let countScoringDice = 0
		let countSelectedEnabled = 0
		rollScore = 0
				
		//calculate score
		for(let element of diceArray) {
			if(element.selected && !element.disabled) valuesArray.push(element.value)
        }
        valuesArray.forEach(function(i) {count[i] = (count[i]||0) + 1})
		const countArray = Object.entries(count)
		countArray.forEach(([key, value]) => {if(scoreValues[key][value]) {
			rollScore += scoreValues[key][value]
			countScoringDice += value
		}})
		if(countArray.length === 6) {
			rollScore = 1500
			countScoringDice = 6
		}
		if(countArray.length === 3) {
			let valueTwo = true
			countArray.forEach(([key, value]) => {if(value !== 2) valueTwo = false})
			if(valueTwo) {
				rollScore = 1000
				countScoringDice = 3
			}
		}
		
		//show score
		score.innerText = 'roll score ' + rollScore
		let tempScore = totalScore + rollScore
		total.innerText = 'total score ' + tempScore
		tempScore < 350 ? total.classList.add('lowscore') : total.classList.remove('lowscore')

		//set buttons behaviour
		roundButton.removeAttribute('disabled')
		for(let element of diceArray) {
			if(element.selected && !element.disabled) countSelectedEnabled++
		}
		
		if((countSelected === 6) && (rollScore > 0)) roundButton.setAttribute('disabled', true)
		if((rollScore > 0) && (countSelectedEnabled === countScoringDice)) {
            rollButton.removeAttribute('disabled')
        } else {
           rollButton.setAttribute('disabled', true)
        }
 	}
 
	 //closes current roll, gets new dice values
 	function closeRoll() {
		//disable selected dice and roll the rest
		let i = 0
		for(let element of diceArray) {
			if(element.selected) {
				element.disabled = true
				const dice = document.getElementById(i)
				dice.classList.add('disabled')
			}
			i++
		}
		totalScore += rollScore
		updateScore()
		//clear all disabled dice if all six of them are disabled
		if(countSelected === 6) {
			let i = 0
			for(let element of diceArray) {
				const dice = document.getElementById(i)
				dice.classList.remove('selected')
				dice.classList.remove('disabled')
				element.selected = false
				element.disabled = false
				i++
			}
		}
	}

	//closes game round and alerts score
    function closeRound() {
        totalScore += rollScore
        if((totalScore < 350) || (rollScore === 0)) {
            alert('ROUND OVER! YOUR SCORE IS 0!')
        } else {
            alert('ROUND OVER! YOUR SCORE IS ' + totalScore)
        }
        location.reload()
    }

    //create six dice objects and insert them in dice array, update random values, set score
	let diceArray = []
    for(let i = 0; i < 6; i++) {
        const diceObj = new Dice(i+1, false, false)
        diceObj.createDice(i)
        diceArray.push(diceObj)
    }
	updateAllDice(0)
	updateScore()
})