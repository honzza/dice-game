document.addEventListener('DOMContentLoaded', () => {
    const diceField = document.querySelector('.dice-field')
    let diceAmount = 6
    let diceArray = []

    function createDice() {
        for(let i = 0; i < diceAmount; i++) {
            const dice = document.createElement('div')
            dice.setAttribute('id', i)
            diceField.appendChild(dice)
            diceArray.push(dice)
        }
    }

    createDice()
})

//11:28