document.addEventListener('DOMContentLoaded', () => {
    const diceField = document.querySelector('.dice-field')
    const rollButton = document.getElementById('roll')
    rollButton.addEventListener('click', () => {
        console.log(rollDice())
    })
	let diceAmount = 6
//    let diceArray = []


    function createDice() {
        for(let i = 0; i < diceAmount; i++) {
            const die = document.createElement('div')
            die.setAttribute('id', i)
			die.classList.add('die')
            diceField.appendChild(die)
  //          diceArray.push(die)
			
			for(let i = 0; i < 9; i++) {
				const dot = document.createElement('div')
				dot.setAttribute('id', i)
				dot.classList.add('dot')
				die.appendChild(dot)
			}
            //<span id="2" style="visibility:hidden"></span>
            // const dotDefinition = {
            //     one:[0,1,2,3,5,6,7,8],
            //     two:[0,1,3,4,5,7,8],
            //     three:[0,1,3,5,7,8],
            //     four:[1,3,4,5,7],
            //     five:[1,3,5,7],
            //     six:[1,4,7],
            //     }
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