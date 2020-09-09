document.addEventListener('DOMContentLoaded', () => {
	const diceField = document.getElementById('dice-field')
	const dotDef = [
			[0,1,2,3,5,6,7,8],
			[0,1,3,4,5,7,8],
            [0,1,3,5,7,8],
            [1,3,4,5,7],
            [1,3,5,7],
            [1,4,7],
    ]
	    
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
                
                //dice.addEventListener('click', () => {
                    //if(dice.classList.contains('selected') && !dice.classList.contains('disabled')) {
                      //  dice.classList.remove('selected')
                        //diceDef[i][1] = 'unselected'
                    //} else {
                      //  dice.classList.add('selected')
                        //diceDef[i][1] = 'selected'
                    //}
                    //updateScore()
                //})
            for(let j = 0; j < 9; j++) {
                const dot = document.createElement('div')
                dot.setAttribute('id', (i.toString() + j.toString()))
                dot.classList.add('dot')
                if(dotDef[i].includes(j)) dot.setAttribute('style', 'visibility:hidden')
                dice.appendChild(dot)
            }
        }
	}

    diceArray = []

    //create six dice objects
    for(let i = 0; i < 6; i++) {
        const diceObj = new Dice(i+1, false, false)
        diceObj.createDice(i)
        diceArray.push(diceObj)
    }      	
    
    console.log(diceArray)
})