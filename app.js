document.addEventListener('DOMContentLoaded', () => {
    const diceField = document.querySelector('.dice-field')
    const rollButton = document.getElementById('roll')
    rollButton.addEventListener('click', () => {
        updateDice(diceDef)
    })
    const score = document.getElementById('score')
    const dotDef = [
			[0,1,2,3,5,6,7,8],
			[0,1,3,4,5,7,8],
            [0,1,3,5,7,8],
            [1,3,4,5,7],
            [1,3,5,7],
            [1,4,7],
    ]
	let diceDef = {
        0: [1, 'unselected'],
        1: [2, 'unselected'],
        2: [3, 'unselected'],
        3: [4, 'unselected'],
        4: [5, 'unselected'],
        5: [6, 'unselected'],
    }
    const options = {1: 100, 5: 50, 15: 150, 55: 100, 11: 200, 56: 50, 45: 50,
        12: 100, 13: 100, 14: 100, 16: 100, 25: 50, 35: 50
    }
    
    function createDice(diceDef) {
		for(let i = 0; i < Object.keys(diceDef).length; i++) {
            const dice = document.createElement('div')
            dice.setAttribute('id', i)
			dice.classList.add('dice')
            diceField.appendChild(dice)
			let dotsDice = dotDef[diceDef[i][0]-1]
			dice.addEventListener('click', () => {
				if(dice.classList.contains('selected')) {
                    dice.classList.remove('selected')
                    diceDef[i][1] = 'unselected'
                } else {
                    dice.classList.add('selected')
                    diceDef[i][1] = 'selected'
                }
                updateScore()
            })
			for(let j = 0; j < 9; j++) {
				const dot = document.createElement('div')
				dot.setAttribute('id', (i.toString() + j.toString()))
				dot.classList.add('dot')
				if(dotsDice.includes(j)) dot.setAttribute('style', 'visibility:hidden')
				dice.appendChild(dot)
			}
        }
    }

	function updateDice(diceDef) {
        for(let i = 0; i < Object.keys(diceDef).length; i++) {
            const dice = document.getElementById(i)
			if(dice.classList.contains('selected')) continue
            diceDef[i][0] = Math.floor(Math.random() * 6) + 1
			let dotsDice = dotDef[diceDef[i][0]-1]
			for(let j = 0; j < 9; j++) {
				const dot = document.getElementById(i.toString() + j.toString())
				dotsDice.includes(j) ? dot.style = 'visibility:hidden' : dot.removeAttribute('style')
			}
        }
		return diceDef
	}

    function updateScore() {
        let diceValues = [], rollScore = 0
        for(let i = 0 ; i < Object.keys(diceDef).length; i++) {
            if(diceDef[i][1] === 'selected') diceValues.push(diceDef[i][0])
        }
        diceValues = diceValues.sort().join('')
        if(options[diceValues]) rollScore = options[diceValues]
        score.innerText = 'roll score ' + rollScore
    }

    createDice(diceDef)
    updateDice(diceDef)
    updateScore()
})

//11:28