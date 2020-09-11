	const rollButton = document.getElementById('roll')
    const roundButton = document.getElementById('round')
    rollButton.addEventListener('click', () => {
        closeRoll()
        updateDice(diceDef)
    })
    roundButton.addEventListener('click', () => {
        closeRound()
    })
    let totalScore = 0
	let rollScore    
    
    //closes current roll, gets new dice values
	function closeRoll() {
        let countSelected = 0
		for(let i = 0 ; i < Object.keys(diceDef).length; i++) {
			if(diceDef[i][1] === 'selected') {
                countSelected ++
				diceDef[i][2] = false
				const dice = document.getElementById(i)
				dice.classList.add('disabled')
			}
		}
		totalScore += rollScore
		updateScore()
		
		if(countSelected === 6) {
            for(let i = 0 ; i < Object.keys(diceDef).length; i++) {
				const dice = document.getElementById(i)
				dice.classList.remove('selected')
				dice.classList.remove('disabled')
				diceDef[i][1] = 'unselected'
				diceDef[i][2] = true
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