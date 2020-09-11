document.addEventListener('DOMContentLoaded', () => {
	const dotDef = [
			[0,1,2,3,5,6,7,8],
			[0,1,3,4,5,7,8],
            [0,1,3,5,7,8],
            [1,3,4,5,7],
            [1,3,5,7],
            [1,4,7],
    ]
	class DiceField {
		constructor(diceArray) {
			this.diceArray = diceArray
		}
		updateDice() {
			let i = 0
		    for(let element of this.diceArray) {
				const dice = document.getElementById(i)
				if(element.selected) continue
				element.value = Math.floor(Math.random() * 6) + 1
				for(let j = 0; j < 9; j++) {
					const dot = document.getElementById(i.toString() + j.toString())
					dotDef[element.value - 1].includes(j) ? dot.style = 'visibility:hidden' : dot.removeAttribute('style')
				}
				i++
			}
		}
		updateScore() {
			const scoreValues = [{},
					 {1: 100, 2: 200, 3: 1000, 4: 2000, 5: 4000, 6: 8000}, 
					 {3: 200, 4: 400, 5: 800, 6: 1600},
					 {3: 300, 4: 600, 5: 1200, 6: 2400},
					 {3: 400, 4: 800, 5: 1600, 6: 3200},
					 {1: 50, 2: 100, 3: 500, 4: 1000, 5: 2000, 6: 4000},
					 {3: 600, 4: 1200, 5: 2400, 6: 4800}
					]
			const score = document.getElementById('score')
			const total = document.getElementById('total')
			let valuesArray = []
            let count = {}
            let rollScore = 0
			for(let element of this.diceArray) {
				if(element.selected && !element.disabled) valuesArray.push(element.value)
            }
            valuesArray.forEach(function(i) {count[i] = (count[i]||0) + 1})
			const countArray = Object.entries(count)
			countArray.forEach(([key, value]) => {if(scoreValues[key][value]) {rollScore += scoreValues[key][value]}})
			if(countArray.length === 6) {rollScore = 1500}
			if(countArray.length === 3) {
				let valueTwo = true
				countArray.forEach(([key, value]) => {if(value !== 2) valueTwo = false})
				if(valueTwo) rollScore = 1000
			}
			
			//ukončit to tady a z tlačítek udělat objekty?
			
			score.innerText = 'roll score ' + rollScore
			let tempScore = totalScore + rollScore
			total.innerText = 'total score ' + tempScore
        
		//tempScore < 350 ? total.classList.add('lowscore') : total.classList.remove('lowscore')
        //roundButton.removeAttribute('disabled')
        //let countSelected = 0 
        //let countSelectedEnabled = 0
        //for(let i = 0 ; i < Object.keys(diceDef).length; i++) {
          //  if(diceDef[i][1] === 'selected') countSelected++
            //if((diceDef[i][1] === 'selected') && (diceDef[i][2] === true)) countSelectedEnabled++
        //}
        //if((countSelected === 6) && (rollScore > 0)) roundButton.setAttribute('disabled', true)
        //if((rollScore > 0) && (countSelectedEnabled === numOfDice)) {
          //  rollButton.removeAttribute('disabled')
        //} else {
          //  rollButton.setAttribute('disabled', true)
        //}       
    //}
			
			
			
		}
	}
    class Dice {
		constructor(value, selected, disabled) {
			this.value = value
			this.selected = selected
			this.disabled = disabled
        }
        createDice(i) {
            const diceField = document.getElementById('dice-field')
			const dice = document.createElement('div')
            dice.setAttribute('id', i)
            dice.classList.add('dice')
            diceField.appendChild(dice)
            dice.addEventListener('click', () => {
				if(this.selected && !this.disabled) {
					dice.classList.remove('selected')
					this.selected = false
                } else {
					dice.classList.add('selected')
					this.selected = true
                }
                diceFieldObj.updateScore()
            })
            for(let j = 0; j < 9; j++) {
                const dot = document.createElement('div')
                dot.setAttribute('id', (i.toString() + j.toString()))
                dot.classList.add('dot')
                if(dotDef[i].includes(j)) dot.setAttribute('style', 'visibility:hidden')
                dice.appendChild(dot)
            }
        }
	}

    //create six dice objects and insert them in dice array
	let diceArray = []
    for(let i = 0; i < 6; i++) {
        const diceObj = new Dice(i+1, false, false)
        diceObj.createDice(i)
        diceArray.push(diceObj)
    }
	//create object containing all dice and set random dice values
	const diceFieldObj = new DiceField(diceArray)
	diceFieldObj.updateDice()
	diceFieldObj.updateScore()
})