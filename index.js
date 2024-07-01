let isAns = false
let numbersArray = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
let calc = {
    history: document.getElementById("history"),
    numbers: document.querySelectorAll(".numbers"),
    delBtn : document.getElementById("delete"),
    allClr: document.getElementById("all-clear"),
    numOne: "",
    numTwo: "",
    ans : "",
    operator: "",
    buttonClass: null,
    buttonId: null,
    operators: document.querySelectorAll(".operators"),
    resultDisplay: document.getElementById("result"),
    updateNumber : function (){
        isAns = false
        if (calc.operator && !calc.ans) {
            if (!calc.numTwo) {
                calc.resultDisplay.textContent = ""
            }
            if (calc.buttonId) {
                calc.resultDisplay.textContent += numbersArray.indexOf(calc.buttonId)
            }
            calc.numTwo = calc.resultDisplay.textContent
        } else {
            if (calc.buttonId) {
                calc.resultDisplay.textContent += numbersArray.indexOf(calc.buttonId)
            }
            calc.numOne = calc.resultDisplay.textContent          
        }
    },
    updateOperator: function () {
        isAns = false
        if (calc.buttonId == "add") {
            calc.resultDisplay.textContent = "+"
        } else if (calc.buttonId == "subtract"){
            calc.resultDisplay.textContent = "-"
        } else if (calc.buttonId == "divide") {
            calc.resultDisplay.textContent = "÷"
        } else if (calc.buttonId == "multiply") {
            calc.resultDisplay.textContent = "×"
        } 
        
        if (calc.numTwo) {
            evaluate(Number(calc.numOne), Number(calc.numTwo))
            calc.resultDisplay.textContent = calc.ans
            calc.ans = ""
        }
        calc.operator = calc.buttonId
    }
}

calc.delBtn.addEventListener("click", ()=>{
    calc.resultDisplay.textContent = calc.resultDisplay.textContent.slice(0, calc.resultDisplay.textContent.length-1)
    calc.buttonId = null
    if (isAns) {
        calc.numOne = calc.numOne.slice(0, calc.numOne.length-1)
        console.log(calc.numOne);
    }
    if (calc.buttonClass == "numbers") {
        calc.updateNumber()
    }
})

calc.allClr.addEventListener("click", ()=>{
    calc.numOne = ""
    calc.numTwo = ""
    calc.history.textContent = ""
    calc.resultDisplay.textContent = ""
    calc.operator = ""
    isAns = false
})

/* function updateNumber() {
    
} */

function evaluate(num1, num2) {
    let operator = ""
    if (calc.operator == "add") {
        operator = "+"
        calc.ans = num1+num2
    } else if (calc.operator === "subtract") {
        operator = "-"
        calc.ans = num1-num2
    } else if (calc.operator === "multiply") {
        operator = "×"
        calc.ans = num1*num2
    } else if (calc.operator === "divide") {
        operator = "÷"
        if (num2 === 0) {
            calc.ans = "Forbidden Content"
            return
        }
        calc.ans = num1/num2
    }
    calc.numOne = `${calc.ans}`
    calc.numTwo = ""
    calc.resultDisplay.textContent = ""
    calc.history.textContent = `${num1} ${operator} ${num2}`
    calc.operator = ""
    isAns = true
}

calc.numbers.forEach(number => {
    number.addEventListener("click", (e)=>{
        calc.buttonId = e.target.id
        calc.buttonClass = e.target.className
        calc.updateNumber()
    })
})

calc.operators.forEach(operator => {
    operator.addEventListener("click", (e)=>{
        calc.buttonId = e.target.id
        calc.buttonClass = e.target.className
        calc.updateOperator()
    })
})

/* function updateOperator() {
    if (calc.buttonId == "add") {
            calc.resultDisplay.textContent = "+"
        }else if (calc.buttonId == "subtract"){
            calc.resultDisplay.textContent = "-"
        } else if (calc.buttonId == "divide") {
            calc.resultDisplay.textContent = "÷"
        } else if (calc.buttonId == "multiply") {
            calc.resultDisplay.textContent = "×"
        } 
        
        if (calc.numTwo) {
            evaluate(Number(calc.numOne), Number(calc.numTwo))
            calc.resultDisplay.textContent = calc.ans
            calc.ans = ""
        }
        calc.operator = calc.buttonId
} */
