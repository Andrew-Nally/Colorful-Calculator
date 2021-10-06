//creates an object to keep track of values
const Calculator = {
    // this is display 0 on the screen
    Display_Value:'0',
    //holds the first operand 
    First_Operand:null,
    //checks for second operand
    Wait_Second_Operand: false,
    operator: null, 
};

//modifies valiue each time a button is clicked
function Input_Digit(digit) {
    const { Display_Value, Wait_Second_Operand } = Calculator;
    //checks to see  if second operand is true and 
    //sets Display_Value to the key clicked
    if (Wait_Second_Operand === true) {
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    } else{
        //this overwrite Display_Value if current value is 0 
        //otherwise add ontp it
        Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit;
    }

}
//handles decimal points
function Input_Decimal(dot){
    //ensures accidental clciking of desimal point
    //wont cause bugs in opertaion
    if (Calculator.Wait_Second_Operand === true) return;
    if (!Calculator.Display_Value.includes(dot)) {
        //adds decimal point to Display_Value if doent 
        //already have one
        Calculator.Display_Value += dot;
    }
}

//operator js
function Handle_Operator(Next_Operator) {
    const { First_Operand, Display_Value, operator } = Calculator
    //when operator ket is pressed, covnvert current number 
    //displayted to a number  and storee result in
    //Calculator.First_Operand if it doesnt already exist
    const Value_of_Input = parseFloat(Display_Value);
    //checks if an operator already exists and if Wait_Second_Operand is true,
    //updates operator and exits function
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator = Next_Operator;
        return;
        
    }
    if (First_Operand == null) {
        Calculator.First_Operand = Value_of_Input;
    } else if (operator) { //check if an operator already exisits
        const Value_Now = First_Operand || 0;
        //if operator exists, property lookup is performed for the operator
        //in the Perform.Calculation.opject and the mathcing operator to the function executed.
        let result = Perform_Calculation[operator] (Value_Now, Value_of_Input);
        //here we add a fixed amount of numbers after the decimal
        result = (result * 1).toString()
        Calculator.Display_Value =  parseFloat(result);
        Calculator.First_Operand = parseFloat(result);
    }
    Calculator.Wait_Second_Operand = true;
    Calculator.operator =  Next_Operator;
}

const Perform_Calculation = {
    '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,
    '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,
    '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,
    '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,
    '=': (First_Operand, Second_Operand) => Second_Operand
};

function Calculator_Reset() {
    Calculator.Display_Value = '0';
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand =  false;
    Calculator.operator = null;
}
//this functiin updates screen with the contents of Display_Value;
function Update_Display() {
    const display =  document.querySelector('.calculator-screen');
    display.value = Calculator.Display_Value;
}

Update_Display();
// monitors button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    //the target variable is an object that represents the
    //clicked element.
const { target } = event;
//if element clicked is not a button, exit the function
if (!target.matches('button')) {
    return;
}

if (target.classList.contains('operator')) {
    Handle_Operator(target.value);
    Update_Display();
    return;
}
if (target.classList.contains('decimal')) {
    Input_Decimal(target.value);
    Update_Display();
        return;    

}
//ensures AC clears the calculator
if (target.classList.contains('all-clear')) {
    Calculator_Reset();
    Update_Display();
    return;
}

Input_Digit(target.value);
Update_Display();
}) 
