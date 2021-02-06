function initiatePyramid(elem)
{
	var question = confirm("Do you wanna build odd number pyramid??");
	var startRow;
	var endRow;

	if(question)
	{
		startRow = parseInt(prompt("Okay, now put a row where you want your pyramid to start, like 1 or 5 or whatever, just do smth already!"));
		endRow = parseInt(prompt("Now enter where you want your pyramid to finish"));

		if(startRow > endRow)
		{
			alert("These are invalid set of numbers, dipshit!");
		}
		else
		{
			var rows = buildOddNumPyramid(startRow, endRow);
		}
	}
}


function buildOddNumPyramid(startRow, endRow, pyramidCallback)
{
	var numbers = {};
	numbers.sum = 0; 
	for(var i = startRow; i <= endRow; i++)
	{
		var lastNumPreviousRow = i * i - (i - 1) - 2;

		var rowNumbers = [];
		for(var j = 1; j <= i; j++)
		{	
			var oddNum = lastNumPreviousRow += 2;
			rowNumbers.push(oddNum);
			numbers['sum'] += oddNum;

		}
		numbers[i] = rowNumbers.join(",");
	}
	renderPyramid(numbers);
	return numbers;
}


function renderPyramid(numbersObject)
{	
	if($('div.row').length > 0)
	{
		$('div.row').each(function(){
			$(this).remove();
		});
	}

	var rows = Object.keys(numbersObject);
	for(var i = 0; i < rows.length; i++)
	{
		if(rows[i] !== 'sum')
		{
			$('div#functionBody').append('<div class="row" id="row-'+rows[i]+'"></div>');
			var numArray = numbersObject[rows[i]].split(',');
			for(var j = 0; j < numArray.length; j++)
			{
				$('div#row-'+rows[i]).append('<span style="color:#c9c9c9;" class="oddNum'+numArray[j]+'" data-number="'+numArray[j]+'">0</span>');
				numCountUp($('.oddNum'+numArray[j]));
			}
		}
	}
}


function numCountUp(elem){
	var obj = $(elem);
	var number = parseInt(obj.attr('data-number')) + 1;
	var counter = 0;

	var runUp = setInterval(function() {
		obj.html(counter);
		counter++;

		if(counter === number){
			clearInterval(runUp);
			obj.css("color", "#000");
		}
	},5);
	return;
}