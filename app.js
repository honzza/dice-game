document.addEventListener('DOMContentLoaded', () => {
    const diceField = document.querySelector('.dice-field')
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
        }
    }

    createDice()
})

//11:28