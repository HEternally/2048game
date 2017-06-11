var board = new Array();
var score = 0;
var hasConflicted = new Array();


var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;
$(document).ready(function() {
	prepareForMobile();
	newgame();
});
function prepareForMobile(){

	if(documentWidth >500){
		gridContainerWidth=500;
		cellSpace=20;
		cellSideLength=100;
	}
	$('#grid-container').css('width',gridContainerWidth-2*cellSpace);
	$('#grid-container').css('height',gridContainerWidth-2*cellSpace);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',0.02*gridContainerWidth);

	$('.grid-cell').css('width',cellSideLength);
	$('.grid-cell').css('height',cellSideLength);
	$('.grid-cell').css('border-radius',0.02*cellSideLength);
}

function newgame() {
	//初始化棋盘格
	init();
	//随机在两个格子里生成数字
	generateOneNumber();
	generateOneNumber();
}

function init() {
	for(var i = 0;i < 4;i++){
		for(var j = 0;j < 4;j++){
			var gridCell = $('#grid-cell-'+i+'-'+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}

	for(var i = 0;i<4;i++) {
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(var j = 0;j<4;j++) {
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}

	updateBoardView();
	score = 0;
	$('#score').text(score);
}

function updateBoardView() {
	$('.number-cell').remove();

	for(var i = 0;i < 4;i++){
		for(var j = 0;j < 4;j++){
			// $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j'"></div>');
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell = $('#number-cell-'+i+'-'+j);

			if(board[i][j] ==0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
				theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
			}else {
				theNumberCell.css('width',cellSideLength);
				theNumberCell.css('height',cellSideLength);
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}

			hasConflicted[i][j] = false;
		}
		$('.number-cell').css('line-height',cellSideLength+'px');
		$('.number-cell').css('font-size',0.6*cellSideLength+'px');
	}
}

function generateOneNumber() {
	if(nospace(board)) {
		return false;
	}
	//随机一个位置
	var randx = parseInt(Math.floor(Math.random()*4));//产生0~4
	var randy = parseInt(Math.floor(Math.random()*4));//产生0~4
	
	var times = 0;
	while(times<50) {
		if(board[randx][randy] ==0)
			break;
		randx = parseInt(Math.floor(Math.random()*4));
		randy = parseInt(Math.floor(Math.random()*4));

		times++;
	}
	if(times ==50){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]==0){
					randx =i;
					randy =j;
				}
			}
		}
	}
	//随机一个数字
	var randNumber = Math.random()<0.5?2:4;
	//在随机位置显示随机数字
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx,randy,randNumber);
	return true;
}

$(document).keydown(function(event) {
	event = event || window.event;
	switch(event.keyCode){
		case 37://left
			event.preventDefault();//当按键的时候阻止按键原来的功能，比如按上键，浏览器不会向上滑动
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 38://up
			event.preventDefault();//当按键的时候阻止按键原来的功能，比如按上键，浏览器不会向上滑动	
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
				}
			break;
		case 39://right
			event.preventDefault();//当按键的时候阻止按键原来的功能，比如按上键，浏览器不会向上滑动
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
				}
			break;
		case 40://down
			event.preventDefault();//当按键的时候阻止按键原来的功能，比如按上键，浏览器不会向上滑动
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				 setTimeout("isgameover()",300);
			}
			break;
		default:
			break;
	}
});

document.addEventListener('touchstart',function(event) {
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
});
document.addEventListener('touchmove',function(event){
	event.preventDefault();
});
document.addEventListener('touchend',function(event) {
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;

	var deltax = endx-startx;
	var deltay = endy-starty;

	if(Math.abs(deltax)<0.3*documentWidth && Math.abs(deltay)<0.3*documentWidth){
		return;
	}
	if(Math.abs(deltax) >=Math.abs(deltay)){
		if(deltax>0){
			//moveright
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
				}
		}else{
			//moveleft
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}
	}else {
		if(deltay>0){
			//move down
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				 setTimeout("isgameover()",300);
			}
		}else{
			//move up
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
				}
		}
	}
});



function isgameover(){
	if(nospace(board) && nomove(board)){
		gameover();
		newgame();
	}
}
function gameover(){
	alert('gameover!');
}
function moveLeft() {
	if(!canMoveLeft(board)){
		return false;
	}

	//moveLeft
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j] !=0){
				for(var k=0;k<j;k++){
					if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						board[i][k] *=2;
						board[i][j] = 0;
						//add score
						score +=board[i][k];
						updateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveUp() {
	if(!canMoveTop(board)){
		return false;
	}
	//movetop
	// console.log('可以上移');
	for(var i=1;i<4;i++)
		for(var j=0;j<4;j++){
			if(board[i][j] !=0){
				for(var k=0;k<i;k++){
					if(board[k][j] == 0 && noBlockVertical(j,k,i,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						board[k][j] *=2;
						board[i][j] = 0;
						score +=board[k][j];
						updateScore(score);
						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveRight() {
	if(!canMoveRight(board)){
		return false;
	}
	//movetop
	// console.log('可以右移');
	for(var i=0;i<4;i++)
		for(var j=2;j>=0;j--){
			if(board[i][j] !=0){
				for(var k=3;k>j;k--){
					if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						board[i][k] *=2;
						board[i][j] = 0;
						score +=board[i][k];
						updateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveDown() {
	if(!canMoveDown(board)){
		return false;
	}
	//movetop
	// console.log('可以下移');
	for(var i=2;i>=0;i--)
		for(var j=0;j<4;j++){
			if(board[i][j] !=0){
				for(var k=3;k>i;k--){
					if(board[k][j] == 0 && noBlockVertical(j,i,k,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						board[k][j] *=2;
						board[i][j] = 0;
						score +=board[k][j];
						updateScore(score);
						hasConflicted[k][j] =true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}