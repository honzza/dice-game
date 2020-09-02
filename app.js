document.addEventListener('DOMContentLoaded', () => {
    const diceField = document.getElementById('dice-field')
    const rollButton = document.getElementById('roll')
    rollButton.addEventListener('click', () => {
        updateDice(diceDef)
    })
    const score = document.getElementById('score')
    const total = document.getElementById('total')
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
    const oneValues = {1: 100, 11: 200, 111: 1000, 1111: 2000, 11111: 4000, 111111: 8000}
    const twoValues = {222: 200, 2222: 400, 22222: 800, 222222: 1600}
    const threeValues = {333: 300, 3333: 600, 33333: 1200, 333333: 2400}
    const fourValues = {444: 400, 4444: 800, 44444: 1600, 444444: 3200}
    const fiveValues = {5: 50, 55: 100, 555: 500, 5555: 1000, 55555: 2000, 555555: 4000}
    const sixValues = {666: 600, 6666: 1200, 66666: 2400, 666666: 4800}

    let totalScore = 0
    
    //initialize dice field
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

    //update dice after roll
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

    //get dice values, process and update score based on dice selection
    function updateScore() {
        let rollScore = 0
        let ones = '', twos = '', threes = '', fours = '', fives = '', sixs = ''
        for(let i = 0 ; i < Object.keys(diceDef).length; i++) {
            if(diceDef[i][1] === 'selected') {
                switch (diceDef[i][0]) {
                    case 1:
                        ones += '1'
                        break
                    case 2:
                        twos += '2'
                        break
                    case 3:
                        threes += '3'
                        break
                    case 4:
                        fours += '4'
                        break
                    case 5:
                        fives += '5'
                        break
                    case 6:
                        sixs += '6'
                        break
                }
            }
        }
        console.log(ones, twos, threes, fours, fives, sixs)
        
        if(oneValues[ones]) rollScore += oneValues[ones]
        if(twoValues[twos]) rollScore += twoValues[twos]
        if(threeValues[threes]) rollScore += threeValues[threes]
        if(fourValues[fours]) rollScore += fourValues[fours]
        if(fiveValues[fives]) rollScore += fiveValues[fives]
        if(sixValues[sixs]) rollScore += sixValues[sixs]
        
        if((ones + twos + threes + fours + fives + sixs) === '123456') rollScore = 1500
        
        if((((ones.length === 2) || (ones.length === 0)) &
            ((twos.length === 2) || (twos.length === 0)) &
            ((threes.length === 2) || (threes.length === 0)) &
            ((fours.length === 2) || (fours.length === 0)) &
            ((fives.length === 2) || (fives.length === 0)) &
            ((sixs.length === 2) || (sixs.length === 0))) &
            ((ones.length + twos.length + threes.length +
            fours.length + fives.length + sixs.length) === 6)) rollScore = 1000

        score.innerText = 'roll score ' + rollScore
        let tempScore = totalScore + rollScore
        total.innerText = 'total score ' + tempScore
        tempScore < 350 ? total.classList.add('lowscore') : total.classList.remove('lowscore') 
    }

    createDice(diceDef)
    updateDice(diceDef)
    updateScore()
})

//11:28