# 2048game
学习制作的2048小游戏，支持pc端和移动端

运行链接https://heternally.github.io/2048game/

## 制作运用到的技术
HTML+CSS+javascript，部分功能使用jquery完成

### 实现步骤
1、我在网上搜索了下2048这个游戏，然后截取游戏的初始页面，运用html和css简单构造页面，页面中的小方格是用js实现定位的，界面如下：

![运行界面](https://github.com/HEternally/2048game/blob/master/2048.png?raw=true)

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

