class Calculator {
    constructor(topOutputText , botOutputText){
        this.topOutputText = topOutputText
        this.botOutputText = botOutputText
        this.allClear()
    }

    allClear(){
        this.botOutput = ''
        this.topOutput = ''
        this.operation = undefined
    }

    delete(){
        this.botOutput = this.botOutput.toString().slice(0,-1)
    }

    addNumber(number){
        if(number === '.' && this.botOutput.includes('.')) return
        this.botOutput = this.botOutput.toString() + number.toString()
    }

    addOperation(operation){
        if(this.botOutput === '') return
        if(this.topOutput != ''){
            this.calculate()
        }
        this.operation = operation
        this.topOutput = this.botOutput
        this.botOutput = ''
    }

    calculate(){
        let compute
        this.top = parseFloat(this.topOutput)
        this.bot = parseFloat(this.botOutput)
        if(isNaN(this.top) || isNaN(this.bot)) return
        switch(this.operation){
            case '+' : 
                compute = this.top + this.bot
            break;
            case '-' : 
                compute = this.top - this.bot
            break;
            case 'x' : 
                compute = this.top * this.bot
            break;
            case '÷' : 
                compute = this.top / this.bot
            break;
        default : return
        } 
        this.botOutput = compute
        this.operation = undefined
        this.topOutput = ''
    }

    comaOnScreen(number){
        const stringNumber = number.toString()
        const beforeDecimal = parseFloat(stringNumber.split('.')[0])
        const afterDecimal = stringNumber.split('.')[1]
        let displayNumber
        if(isNaN(beforeDecimal)){
            displayNumber = ''
        } else {
            displayNumber = beforeDecimal.toLocaleString('en', {maximumFractionDigits: 0})
        } 
        if(afterDecimal != null){
            return `${displayNumber}.${afterDecimal}`
        } else {
            return displayNumber
        }
    }

    updateScreen(){
        this.botOutputText.innerText = this.comaOnScreen(this.botOutput) 
        if(this.operation != null){
            this.topOutputText.innerText = `${this.comaOnScreen(this.topOutput)} ${this.operation}`
        }
        else this.topOutputText.innerText = ''
    }

}


const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear-btn]')
const deleteButton = document.querySelector('[data-delete-btn]')
const equalButton = document.querySelector('[data-equal-btn]')
const topOutputText = document.querySelector('[data-top-output]')
const botOutputText = document.querySelector('[data-bottom-output]')

const screen = new Calculator(topOutputText , botOutputText)

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        screen.addNumber(button.innerText)
        screen.updateScreen()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        screen.addOperation(button.innerText)
        screen.updateScreen()
    })
})

equalButton.addEventListener('click', () => {
    screen.calculate()
    screen.updateScreen()
})

allClearButton.addEventListener('click', () => {
    screen.allClear()
    screen.updateScreen()
})

deleteButton.addEventListener('click', () => {
    screen.delete()
    screen.updateScreen()
})
