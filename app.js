document.addEventListener('DOMContentLoaded', () => {
    const diceField = document.querySelector('.dice-field')
    const rollButton = document.getElementById('roll')
    rollButton.addEventListener('click', () => {
        updateDice(rollDice())
    })
	let diceAmount = 6
	const dotDefinition = {
			one:[0,1,2,3,5,6,7,8],
			two:[0,1,3,4,5,7,8],
            three:[0,1,3,5,7,8],
            four:[1,3,4,5,7],
            five:[1,3,5,7],
            six:[1,4,7],
    }


    function createDice(diceValues = ['one', 'two', 'three', 'four', 'five', 'six']) {
        for(let i = 0; i < diceAmount; i++) {
            const die = document.createElement('div')
            die.setAttribute('id', i)
			die.classList.add('die')
            diceField.appendChild(die)
			let dotsDieDefinition = dotDefinition[diceValues[i]]
						
			for(let j = 0; j < 9; j++) {
				const dot = document.createElement('div')
				dot.setAttribute('id', (i.toString() + j.toString()))
				dot.classList.add('dot')
				if(dotsDieDefinition.includes(j)) {
					dot.setAttribute('style', 'visibility:hidden')
				}
				die.appendChild(dot)
			}
        }
    }


	function updateDice(diceValues = ['one', 'two', 'three', 'four', 'five', 'six']) {
        for(let i = 0; i < diceAmount; i++) {
            const die = document.getElementById(i)
            let dotsDieDefinition = dotDefinition[diceValues[i]]
						
			for(let j = 0; j < 9; j++) {
				const dot = document.getElementById(i.toString() + j.toString())
				dotsDieDefinition.includes(j) ? dot.style = 'visibility:hidden' : dot.removeAttribute('style')
			}
        }
	}


    function rollDice() {
        let diceValues = []
        let avalValues = ['one', 'two', 'three', 'four', 'five', 'six']
        for(let i = 0; i < diceAmount; i++) {
            diceValues[i] = avalValues[Math.floor(Math.random() * avalValues.length)];
        }
        return diceValues
    }

    createDice()
})

//11:28