function showNumberWithAnimation(i,j,randNumber) {
	var numberCell = $('#number-cell-' +i+'-'+j);
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));
	numberCell.text(randNumber);//更改这里可以显示不同的值，比如可以做文字版的2048，但是要在support2048上写个函数，以当值等于某个值时赋予某个文字
	// numberCell.text( getNumberText( randNumber ) );
	

	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},100);
}

function showMoveAnimation(fromx,fromy,tox,toy) {
	var numberCell = $('#number-cell-'+fromx+'-'+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},300);
}

function updateScore(score) {
	$('#score').text(score);
}