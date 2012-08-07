
function SliderCtlr (numberofrows, boardsize) {
    this.boardSize = boardsize;
    this.tileCount = numberofrows;
}


SliderCtlr.prototype = {
    init: function() {
	ctlr.img = new Image();
	ctlr.tileSize = ctlr.boardSize / ctlr.tileCount;
	ctlr.clickLoc = new Object;
	ctlr.clickLoc.x = 0;
	ctlr.clickLoc.y = 0;
	ctlr.emptyLoc = new Object;
	ctlr.emptyLoc.x = 0;
	ctlr.emptyLoc.y = 0;
	ctlr.solved = false;
	ctlr.boardParts = new Object;
	ctlr.canvas = null
	ctlr.context = null;
	ctlr.showhint = false;
	ctlr.setBoard();
	ctlr.getCanvasCtx();
    },

    getCanvasCtx:function() {
	ctlr.canvas = document.getElementById('puzzle');
	ctlr.context = ctlr.canvas.getContext('2d');
	ctlr.img.src = 'http://www.brucealderman.info/Images/dimetrodon.jpg';
	ctlr.img.addEventListener('load', ctlr.drawTiles, false);
	
//	ctlr.context.font(
    },

    setBoard:function() {
	ctlr.boardParts = new Array(ctlr.tileCount);
	for (var i = 0; i < ctlr.tileCount; ++i) {
	    ctlr.boardParts[i] = new Array(ctlr.tileCount);
	    for (var j = 0; j < ctlr.tileCount; ++j) {
		ctlr.boardParts[i][j] = new Object;
		ctlr.boardParts[i][j].x = (ctlr.tileCount - 1) - i;
		ctlr.boardParts[i][j].y = (ctlr.tileCount - 1) - j;
//		ctlr.boardParts[i][j].x = i;
//		ctlr.boardParts[i][j].y = j;
	    }
	}
	ctlr.emptyLoc.x = ctlr.boardParts[ctlr.tileCount - 1][ctlr.tileCount - 1].x;
	ctlr.emptyLoc.y = ctlr.boardParts[ctlr.tileCount - 1][ctlr.tileCount - 1].y;
//	ctlr.emptyLoc.x = -1;
//	ctlr.emptyLoc.y = -1;
	ctlr.solved = false;
    },

    drawTiles:function() {
	ctlr.context.clearRect ( 0 , 0 , ctlr.boardSize , ctlr.boardSize );
	for (var i = 0; i < ctlr.tileCount; ++i) {
	    for (var j = 0; j < ctlr.tileCount; ++j) {
		var x = ctlr.boardParts[i][j].x;
		var y = ctlr.boardParts[i][j].y;
		if(i != ctlr.emptyLoc.x || 
		   j != ctlr.emptyLoc.y || 
		   ctlr.solved == true) {		   
		    ctlr.context.drawImage(ctlr.img, 
					   x * ctlr.tileSize, 
					   y * ctlr.tileSize, 
					   ctlr.tileSize, 
					   ctlr.tileSize,
					   i * ctlr.tileSize, 
					   j * ctlr.tileSize, 
					   ctlr.tileSize, 
					   ctlr.tileSize);
		    ctlr.context.strokeStyle="white";
		    ctlr.context.strokeRect(i * ctlr.tileSize, 
					    j * ctlr.tileSize, 
					    ctlr.tileSize,
					    ctlr.tileSize);
		    if(ctlr.showhint) {
			ctlr.context.font="10pt Ubuntu";
			ctlr.context.strokeStyle="black";
			ctlr.context.fillStyle="yellow";
			ctlr.context.strokeText(" "+(ctlr.tileCount*x+y+1), 
					    i * ctlr.tileSize+10, 
					    j * ctlr.tileSize+20);
			ctlr.context.fillText(" "+(ctlr.tileCount*x+y+1), 
					  i * ctlr.tileSize+10, 
					  j * ctlr.tileSize+20);
		    }

		}
	    }
	}
    },

    
    distance:function(x1, y1, x2, y2) {
	return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    },

    slideTile:function(toLoc, fromLoc) {
	if (!ctlr.solved) {
	    ctlr.boardParts[toLoc.x][toLoc.y].x = 
		ctlr.boardParts[fromLoc.x][fromLoc.y].x;
	    ctlr.boardParts[toLoc.x][toLoc.y].y = 
		ctlr.boardParts[fromLoc.x][fromLoc.y].y;
	    ctlr.boardParts[fromLoc.x][fromLoc.y].x = 
		ctlr.tileCount - 1;
	    ctlr.boardParts[fromLoc.x][fromLoc.y].y = 
		ctlr.tileCount - 1;
	    toLoc.x = fromLoc.x;
	    toLoc.y = fromLoc.y;
	    //gs.incrMoves();
	    ctlr.checkSolved();
	}
    },
    
    checkSolved: function() {
	var flag = true;
	for (var i = 0; i < ctlr.tileCount; ++i) {
	    for (var j = 0; j < ctlr.tileCount; ++j) {
		if (ctlr.boardParts[i][j].x != i || 
		    ctlr.boardParts[i][j].y != j) {
		    flag = false;
		}
	    }
	}
	ctlr.solved = flag;
    },

    toggleHintDisplay: function () {
	ctlr.showhint = !ctlr.showhint;
	ctlr.drawTiles();
    },

    shuffleTiles: function() {
	
    },

    addListeners: function() {
	ctlr.canvas.onclick = function(e) {
	    ctlr.clickLoc.x = Math.floor((e.pageX - window.offsetLeft) / 
					 ctlr.tileSize);
	    ctlr.clickLoc.y = Math.floor((e.pageY - window.offsetTop) / 
					 ctlr.tileSize);   
	    if (ctlr.distance(ctlr.clickLoc.x, 
			      ctlr.clickLoc.y, 
			      ctlr.emptyLoc.x, 
			      ctlr.emptyLoc.y) == 1) {
		ctlr.slideTile(ctlr.emptyLoc, ctlr.clickLoc);
		ctlr.drawTiles();
	    }
	    if (ctlr.solved) {
		setTimeout(function() {alert("You solved it!");}, 500);
	    }
	};
    },

    removeListeners: function() {
	ctlr.canvas.removeAttribute('onclick');
	ctlr.canvas.onclick = null;
    },
    

};


/*

img.src = 'http://www.brucealderman.info/Images/dimetrodon.jpg';
img.addEventListener('load', drawTiles, false);

var solved = false;

var boardParts = new Object;
setBoard();

document.getElementById('scale').onchange = function() {

document.getElementById('puzzle').onmousemove = function(e) {
    clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
    clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
};

document.getElementById('puzzle').onclick = function() {
    if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
	slideTile(emptyLoc, clickLoc);
	drawTiles();
    }
    if (solved) {
	setTimeout(function() {alert("You solved it!");}, 500);
    }
};

*/
