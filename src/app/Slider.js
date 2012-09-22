
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
		ctlr.offsetLeft = 0;
		ctlr.offsetTop = 0;
		ctlr.hammer = null;
		ctlr.showhint = false;
		ctlr.setBoard();
		ctlr.getCanvasCtx();
    },

    getCanvasCtx:function() {
		ctlr.canvas = document.getElementById('puzzle');
		ctlr.offsetLeft = ctlr.canvas.offsetLeft;
		ctlr.offsetTop = ctlr.canvas.offsetTop;		
		ctlr.context = ctlr.canvas.getContext('2d');
		hammer = new Hammer(ctlr.canvas, { prevent_default: true, scale_treshold: 0.3, rotation_threshold:15}); 
		ctlr.img.src = 'resources/img/picsaw-splash.png';
		ctlr.img.addEventListener('load', this.drawTiles, false);
	},

    setBoard:function() {
		ctlr.boardParts = new Array(ctlr.tileCount);
		for (var i = 0; i < ctlr.tileCount; ++i) {
		    ctlr.boardParts[i] = new Array(ctlr.tileCount);
		    for (var j = 0; j < ctlr.tileCount; ++j) {
				ctlr.boardParts[i][j] = new Object;
				ctlr.boardParts[i][j].x = i;
				ctlr.boardParts[i][j].y = j;
		    }
		}
		ctlr.emptyLoc.x = ctlr.tileCount-1;
		ctlr.emptyLoc.y = ctlr.tileCount-1;
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
						ctlr.context.font="12pt Ubuntu";
						ctlr.context.strokeStyle="black";
						ctlr.context.fillStyle="yellow";
						ctlr.context.strokeText(" "+(ctlr.tileCount*y+x+1), 
								    i * ctlr.tileSize+10, 
								    j * ctlr.tileSize+20);
						ctlr.context.fillText(" "+(ctlr.tileCount*y+x+1), 
								  i * ctlr.tileSize+10, 
								  j * ctlr.tileSize+20);
				    }
				}
		    }
		}
    },

    swipeddistance:function(direction, x1, y1, x2, y2) {
    	//console.log("SW "+direction+" : clickLoc: ("+x1+","+y1+") : emptyLoc: ("+x2+","+y2+")");
    	switch(direction) {
    		case "left":
    			return ((y1 - y2) + (x1 - x2));    			
    			break;
    		case "right":
    			return ((y1 - y2) + (x2 - x1));
	    		break;
    		case "up": 
    			return ((x1 - x2) + (y1 - y2));
    			break;
    		case "down":
	    		return ((x1 - x2) + (y2- y1));
	    		break;
	    	default:
	    		return Math.abs(x1 - x2) + Math.abs(y1 - y2);
	    		break;
    	}
    },
	    
    slideTile:function(toLoc, fromLoc) {
		if (!ctlr.solved) {
		    ctlr.boardParts[toLoc.x][toLoc.y].x = ctlr.boardParts[fromLoc.x][fromLoc.y].x;
		    ctlr.boardParts[toLoc.x][toLoc.y].y = ctlr.boardParts[fromLoc.x][fromLoc.y].y;
		    ctlr.boardParts[fromLoc.x][fromLoc.y].x = ctlr.tileCount - 1;
		    ctlr.boardParts[fromLoc.x][fromLoc.y].y = ctlr.tileCount - 1;
		    toLoc.x = fromLoc.x;
		    toLoc.y = fromLoc.y;		    
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
    	ctlr.setBoard();
    	ctlr.solved = false;
		ctlr.emptyLoc.x = ctlr.tileCount-1;
		ctlr.emptyLoc.y = ctlr.tileCount-1;
    	var swapWith = new Object;
    	swapWith.x = ctlr.emptyLoc.x;
    	swapWith.y = ctlr.emptyLoc.y;
		
		var i = 0; 
		function singleShuffleStep() {			
			var rnd = Math.floor(Math.random() * 4);
			switch(rnd) {
				// move up if possible
				case 0: if(ctlr.emptyLoc.y > 0)  {
							//c'est possible
							swapWith.y--;
						}
						break;
				// move down if possible
				case 1: if(ctlr.emptyLoc.y < ctlr.tileCount - 1)  {
							//c'est possible
							swapWith.y++;
						}
						break;
				// move left if possible
				case 2: if(ctlr.emptyLoc.x > 0)  {
							//c'est possible
							swapWith.x--;
						}
						break;
				// move right if possible
				case 3: if(ctlr.emptyLoc.x < ctlr.tileCount - 1)  {
							//c'est possible
							swapWith.x++;
						}
						break;
			}
			if(ctlr.swipeddistance("simulate", ctlr.emptyLoc.x, ctlr.emptyLoc.y, swapWith.x, swapWith.y) != 0) {
				i++;
				ctlr.slideTile(ctlr.emptyLoc, swapWith);
				if(i%ctlr.tileCount ==0) ctlr.drawTiles();
			}
			if(i == 100) clearInterval(shuffleAnimatorId);			
		}

		var shuffleAnimatorId = setInterval(singleShuffleStep, 10-ctlr.tileCount);
    },

    addListeners: function() {
    	hammer.onswipe = function(ev) {
    		var xx = ev.position.x - ev.distanceX;
			var yy = ev.position.y - ev.distanceY;
			
    		//console.log(ev.type+ " : "+ev.direction+" X:X "+ev.position.x+" : "+xx+" Y:Y "+ev.position.y+" : "+yy);
    		ctlr.clickLoc.x = Math.floor( xx / ctlr.tileSize);
		    ctlr.clickLoc.y = Math.floor( yy / ctlr.tileSize);   
		    if (ctlr.swipeddistance(ev.direction, ctlr.clickLoc.x, 
				      ctlr.clickLoc.y, 
				      ctlr.emptyLoc.x, 
				      ctlr.emptyLoc.y) == 1) {
				ctlr.slideTile(ctlr.emptyLoc, ctlr.clickLoc);
				gs.incrMoves();
		    	ctlr.checkSolved();
				ctlr.drawTiles();
		    }
		    if (ctlr.solved) {
				setTimeout(function() {alert("You solved it!");}, 500);
		    }
    	}; 

		hammer.ontap = function(ev) {
			var xx = ev.position[0].x - ctlr.offsetLeft;
			var yy = ev.position[0].y - ctlr.offsetTop;
			
    		//console.log(ev.type+ " X:X "+ev.position[0].x+" : "+xx+" Y:Y "+ev.position[0].y+" : "+yy);
			ctlr.clickLoc.x = Math.floor( xx / ctlr.tileSize);
		    ctlr.clickLoc.y = Math.floor( yy / ctlr.tileSize);   
		    if (ctlr.swipeddistance("tap",ctlr.clickLoc.x, 
				      ctlr.clickLoc.y, 
				      ctlr.emptyLoc.x, 
				      ctlr.emptyLoc.y) == 1) {
				ctlr.slideTile(ctlr.emptyLoc, ctlr.clickLoc);
				gs.incrMoves();
			    ctlr.checkSolved();		
				ctlr.drawTiles();
		    }
		    if (ctlr.solved) {
				setTimeout(function() {alert("You solved it!");}, 500);
		    }
    	};


    	hammer.ontransformstart = function(ev) {
    		console.log("transformstart");
    		ev.originalEvent.preventDefault();
    		ctlr.shuffleTiles();
    	};

    	hammer.ondoubletap = function(ev) {
    		console.log("double tap");
    		//ctlr.shuffleTiles();
    	};

    },

    removeListeners: function() {
//	ctlr.canvas.removeAttribute('onclick');
		ctlr.canvas.onclick = null;
		hammer.ontap = null;
		hammer.onswipe = null;
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
