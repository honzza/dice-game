document.addEventListener('DOMContentLoaded', () => {
    const diceField = document.querySelector('.dice-field')
    const rollButton = document.getElementById('roll')
    rollButton.addEventListener('click', () => {
        updateDice(diceDef)
    })
	const dotDef = [
			[0,1,2,3,5,6,7,8],
			[0,1,3,4,5,7,8],
            [0,1,3,5,7,8],
            [1,3,4,5,7],
            [1,3,5,7],
            [1,4,7],
    ]
	let diceDef = [1, 2, 3, 4, 5, 6]

    function createDice(diceDef) {
		for(let i = 0; i < diceDef.length; i++) {
            const die = document.createElement('div')
            die.setAttribute('id', i)
			die.classList.add('die')
            diceField.appendChild(die)
			let dotsDie = dotDef[diceDef[i]-1]
			die.addEventListener('click', () => {
				die.classList.contains('selected') ? die.classList.remove('selected') : die.classList.add('selected')
			})	
			for(let j = 0; j < 9; j++) {
				const dot = document.createElement('div')
				dot.setAttribute('id', (i.toString() + j.toString()))
				dot.classList.add('dot')
				if(dotsDie.includes(j)) dot.setAttribute('style', 'visibility:hidden')
				die.appendChild(dot)
			}
        }
    }

	function updateDice(diceDef) {
        for(let i = 0; i < diceDef.length; i++) {
            const die = document.getElementById(i)
			if(die.classList.contains('selected')) continue
            diceDef[i] = Math.floor(Math.random() * 6) + 1
			let dotsDie = dotDef[diceDef[i]-1]
			for(let j = 0; j < 9; j++) {
				const dot = document.getElementById(i.toString() + j.toString())
				dotsDie.includes(j) ? dot.style = 'visibility:hidden' : dot.removeAttribute('style')
			}
        }
		console.log(diceDef)
		return diceDef
	}

    createDice(diceDef)
	updateDice(diceDef)
	
	let pokus = {
	0: [1, 'unselected'],
	1: [2, 'unselected']
	}

	console.log(pokus[0][1])
	console.log(Object.keys(pokus).length)
	
})

//11:28