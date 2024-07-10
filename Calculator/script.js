const keys = document.querySelector('.calc_keys');
const display = document.querySelector('.display');
const operatorButtons = document.querySelectorAll('.operator')
const operationText = document.getElementById('operation-text')
var equationString = ''

operatorButtons.forEach(i => i.addEventListener('click', function(event){
	if( display.value != 'Infinity' && display.value != 'Not Allowed'){
		operationColor(event)
		handleOperatorClick(event.target.id)
	}
}));

keys.addEventListener('click', function(event){
	var i = event.target.id;

	if(event.target.className === 'number'){
		if(display.value === '0' || display.value === 'Infinity' || display.value === 'Not Allowed'){
			display.value = i;
		}
		else{
			display.value += i;
		}		
	}
	
	else if(event.target.className === 'decimal'){
 		if(display.value.slice(-1) != '.'){
			display.value += i;
		}
	}
	
	if(i === 'clear' && display.value != '0'){
		display.value = display.value.slice(0, -1);

		if(display.value === ''){
			display.value = '0';
		}
	}

	if(i === 'debug'){
		console.log(typeof(display.value));
	}

	if(i === 'allclear'){
		allClear();
	}

	if(i === '='){
		handleEqualsClick();
	}
	if(event.target.tagName === 'BUTTON'){
		handleClickAnimation(event)
	}
});

function handleOperatorClick(optor){
	if(equationString === ''){
		equationString = display.value + optor
		switch(optor){
			case '+':
				operationText.innerHTML = display.value + ' +';
				break;
			case '*':
				operationText.innerHTML = display.value + ' &times';
				break;
			case '-':
				operationText.innerHTML = display.value + ' -';
				break;
			case '/':
				operationText.innerHTML = display.value + ' &divide';
				break;
		}
		display.value = '0';
	}
	else{
		operatorSwitch(optor);
	}
}

function operatorSwitch(optor){
	equationString = equationString.slice(0,-1);
	switch(optor){
		case '+':
			operationText.innerHTML = equationString + ' +';
			equationString += '+';
			break;
		case '*':
			operationText.innerHTML = equationString + ' &times';
			equationString += '*';
			break;
		case '-':
			operationText.innerHTML = equationString + ' -';
			equationString += '-';
			break;
		case '/':
			operationText.innerHTML = equationString + ' &divide';
			equationString += '/';
			break;
	}
	display.value = '0';

}

function allClear(){
	display.value = '0';
	equationString = '';
	operationText.innerHTML = '';
	operatorButtons.forEach(i => i.classList.remove("changeColorEval"));
}

function operationColor(event){
	operatorButtons.forEach(i => i.classList.remove("changeColorEval"));
	event.target.classList.add("changeColorEval");
}

function handleEqualsClick(){
	equationString += display.value;
	try{
		display.value = eval(equationString);
	} 
	catch(err){
		display.value = 'Not Allowed'
	}
	equationString = '';
	operationText.innerHTML = '';
	operatorButtons.forEach(i => i.classList.remove("changeColorEval"));
	validateInput(this);

}

function handleClickAnimation(event){
	
		event.target.classList.add("button-clicked");
		setTimeout(() => {
			event.target.classList.remove("button-clicked");
		}, 100);
	
}

document.addEventListener('keydown', function(event){
	var j = event.key
	switch(j){
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '0':
			event.preventDefault();
			if(display.value === '0' || display.value === 'Infinity' || display.value === 'Not Allowed'){
				display.value = j;
			}
			else{
				display.value += j;
			}
			break;
		case 'Enter':
			event.preventDefault();
			handleEqualsClick();
			break;
		case 'Backspace':
			if(display.value != 0){
				display.value = display.value.slice(0, -1);

				if(display.value === ''){
					display.value = '0';
				}
			}
			break;
		case 'Escape':
			allClear();
			break;
		case '+':
		case '-':
		case '*':
		case '/':
			if(display.value != 'Infinity' && display.value != 'Not Allowed'){
				handleOperatorClick(j)
				operatorSwitch(j)
			}
			break;
		case '.':
			if(display.value.slice(-1) != '.'){
				display.value += '.';
			}
			break;
	}
});