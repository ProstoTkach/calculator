let expression = '';
let history = document.getElementById('history');
let out = document.getElementById('result');
let calcScreen = document.querySelector('.calc-screen');
let historyScreen = document.querySelector('.history-screen');
let memory = '';

function clearAll() {
	expression = '';
	calcScreen.classList.remove('active');
	historyScreen.classList.remove('active');
	out.classList.add('fade-out');
	history.classList.add('fade-out');
	setTimeout(() => {
		out.classList.remove('fade-out');
		history.classList.remove('fade-out');
		out.textContent = '';
		history.textContent = '';
	}, 500);
}

function updateDisplay() {
	out.textContent = expression;
	if (!calcScreen.classList.contains('active')) {
		calcScreen.classList.add('active');
	}
}

function calculate() {
	try {
		let result = eval(expression);
		if (isNaN(result) || !isFinite(result)) {
			out.textContent = 'Error';
			expression = '';
		} else {
			history.textContent = expression+'=';
			out.textContent = result;
			expression = result+'';
			if (!historyScreen.classList.contains('active')) {
				historyScreen.classList.add('active');
			}
		}
	} catch (error) {
		out.textContent = 'Error';
		expression = '';
	}
}



document.querySelector('.C').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
	if (!event.target.classList.contains('btn')) return;

	let key = event.target.textContent;

	if (key === '=') {
		calculate();
		return;
	}
	else if (key === 'C') {
		clearAll();
		return;
	}
	else if (key === '1/x') {
		expression = "1/"+expression;
	}
	else if (key === '√x') {
		history.textContent = '√'+expression;
		if (!historyScreen.classList.contains('active')) {
			historyScreen.classList.add('active');
		}
		expression=Math.sqrt(expression);
	}
	else if (key === 'x!') {
		history.textContent = expression+'!';
		if (!historyScreen.classList.contains('active')) {
			historyScreen.classList.add('active');
		}
		expression = expression * expression;
	}
	else if (key === '%') {
		history.textContent = expression+'*0.01';
		if (!historyScreen.classList.contains('active')) {
			historyScreen.classList.add('active');
		}
		expression = expression * 0.01;
	}
	else if (key === 'MR') {
		memory = expression;
	}
	else if (key === 'MC') {
		memory = '';
	}
	else if (key === 'M+') {
		expression = expression+ '+' + memory;
	}
	else if (key === 'M-') {
		expression = expression + '-' + memory;
	}
	else if (key === '+/-') {
		if(expression.charAt(0) !== '-'){
			expression = "-"+expression;
		}
		else{
			expression = expression.substring(1);
		}
	}
	else if (key === 'BIN') {
		history.textContent = expression + ' in BIN';
		if (!historyScreen.classList.contains('active')) {
			historyScreen.classList.add('active');
		}
		expression = parseFloat(expression).toString(2);
	}
	else if (key === 'HEC') {
		history.textContent = expression + ' in HEC';
		if (!historyScreen.classList.contains('active')) {
			historyScreen.classList.add('active');
		}
		expression = parseFloat(expression).toString(16).toUpperCase();
	}
	else if (key === 'e') {
		key = 2.71;
		expression += key;
	}
	else if (key === 'Pi') {
		key = 3.14;
		expression += key;
	}
	else if (key === 'RAND') {
		key = Math.floor(Math.random() * 10);
		expression += key;
	}
	else if (key === 'exit') {
		window.close();
	}
	else{
		expression += key;
	}
	updateDisplay();
};

let measures = document.getElementById("measures");
let fSelect = document.getElementById("f-measure-select");
let sSelect = document.getElementById("s-measure-select");

let secondFOption = document.getElementById("secondfoption");
let thirdFOption = document.getElementById("thirdfoption");
let fourthFOption = document.getElementById("fourthfoption");

let secondSOption = document.getElementById("secondsoption");
let thirdSOption = document.getElementById("thirdsoption");
let fourthSOption = document.getElementById("fourthsoption");

let firstInput = document.getElementById("f-measure-input");
let secondInput = document.getElementById("s-measure-input");

let firstSystemSelect = document.getElementById("f-system-select");
let secondSystemSelect = document.getElementById("s-system-select");

let firstSystemInput = document.getElementById("f-system-input");
let secondSystemInput = document.getElementById("s-system-input");

let convertSystemButt = document.getElementById("convertSystem");

thirdCoefficient = 100;
fourthCoefficient = 100000;

let convertButt = document.getElementById("convert");
convertButt.addEventListener("click", () => {
    let input = Number(firstInput.value);
    if (isNaN(input)) return;
    let convNum = input;
    if (fSelect.value === "Meters" || fSelect.value === "Kilograms" || fSelect.value === "Square kilometers"){
        convNum *= thirdCoefficient;
    } 
    if (fSelect.value === "Kilometers" || fSelect.value === "Tones" || fSelect.value === "Hectares"){
        convNum *= fourthCoefficient;
    } 
    if (sSelect.value === "Meters" || sSelect.value === "Kilograms" || sSelect.value === "Square kilometers"){
        convNum /= thirdCoefficient;
    } 
    if (sSelect.value === "Kilometers" || sSelect.value === "Tones" || sSelect.value === "Hectares"){
        convNum /= fourthCoefficient;
    } 
    secondInput.value = convNum;
});

measures.addEventListener("change", (e) => {
    if (e.target.value === "Length"){
        secondFOption.innerText = "Centimeters";
        secondSOption.innerText = "Centimeters";
        thirdFOption.innerText = "Meters";
        thirdSOption.innerText = "Meters";
        fourthFOption.innerText = "Kilometers";
        fourthSOption.innerText = "Kilometers";
        thirdCoefficient = 100;
        fourthCoefficient = 100000;
    }
    if (e.target.value === "Weight"){
        secondFOption.innerText = "Grams";
        secondSOption.innerText = "Grams";
        thirdFOption.innerText = "Kilograms";
        thirdSOption.innerText = "Kilograms";
        fourthFOption.innerText = "Tones";
        fourthSOption.innerText = "Tones";
        thirdCoefficient = 1000;
        fourthCoefficient = 1000000;
    }
    if (e.target.value === "Area"){
        secondFOption.innerText = "Square meters";
        secondSOption.innerText = "Square meters";
        thirdFOption.innerText = "Square kilometers";
        thirdSOption.innerText = "Square kilometers";
        fourthFOption.innerText = "Hectares";
        fourthSOption.innerText = "Hectares";
        thirdCoefficient = 1000000;
        fourthCoefficient = 10000;
    }
});

convertSystemButt.addEventListener("click", () => {
    if (firstSystemSelect.value === "Decimal"){
        let input = Number(firstSystemInput.value);
        if (secondSystemSelect.value === "Hexadecimal"){
            secondSystemInput.value = input.toString(16);
        }
        else if (secondSystemSelect.value === "Binary"){
            secondSystemInput.value = input.toString(2);
        }
        else{
            secondSystemInput.value = input;
        }
    }
    if (firstSystemSelect.value === "Hexadecimal"){
        if (secondSystemSelect.value === "Binary"){
            let inp = parseInt(firstSystemInput.value, 16);
            secondSystemInput.value = inp.toString(2);
        }
        if (secondSystemSelect.value === "Decimal"){
            secondSystemInput.value = parseInt(firstSystemInput.value, 16);
        }
        if (secondSystemInput.value === "Hexadecimal"){
            secondSystemInput.value = firstSystemInput.value;
        }
    }
    if (firstSystemSelect.value === "Binary"){
        if (secondSystemSelect.value === "Binary"){
            secondSystemInput.value = firstSystemInput.value;
        }
        if (secondSystemSelect.value === "Decimal"){
            secondSystemInput.value = parseInt(firstSystemInput.value, 2);
        }
        if (secondSystemInput.value === "Hexadecimal"){
            let inp = parseInt(firstSystemInput.value, 2);
            secondSystemInput.value = inp.toString(16);
        }
    }
});
