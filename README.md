# 2048game
学习制作的2048小游戏，支持pc端和移动端

运行链接https://heternally.github.io/2048game/

移动端请扫二维码，效果更加好哦。
<img src="http://qr.api.cli.im/qr?data=https%253A%252F%252Fheternally.github.io%252F2048game%252F&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=1dda64ec79b03ec4ba911d8e9ed90213" width="350" height="350"/>

## 制作运用到的技术
HTML+CSS+javascript，部分功能使用jquery完成

### 实现步骤
1、我在网上搜索了下2048这个游戏，然后截取游戏的初始页面，运用html和css简单构造页面，页面中的小方格是用js实现定位的，界面如下：

![运行界面](https://github.com/HEternally/2048game/blob/master/2048.png?raw=true)


初始化的js代码：

```javascript
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
```

运用下列js代码实现当格中出现数字时显示在格子中间

```javascript
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
```

运用下列js代码实现在没有数字的随机一个格子中随机生成一个2或者4数字

```javascript
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
```

因为该游戏实现了在pc端和移动端都能玩，所有设置了两套运行方法，一套是在pc端玩是可以通过方向键控制数字移动的方向，另一套就是在移动端可以通过滑动控制数字的移动</br>

方向键控制数字移动：

```javascript
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
```

触摸滑动控制数字移动

```javascript

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
```

控制数字移动的函数（这里只显示左移的函数，其他三个方向也差不多，可以自己想一下）：

```javascript
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
```

在移动数字前会先判断能否移动，比如左移的时候判断方法如下：

```javascript
function canMoveLeft(board) {
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j] !=0) {
				if(board[i][j-1]==0 ||board[i][j-1]==board[i][j])
					return true;
			}
		}
	}	
	return false;
}
```

同时我还做了移动时候的动画效果：

```javascript
function showMoveAnimation(fromx,fromy,tox,toy) {
	var numberCell = $('#number-cell-'+fromx+'-'+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},300);
}
```


