//hangman!

// id win (#)
// id currentWord (the answer -- random from array)
// id guessesLeft
// id userGuess (already guessed)
// id next
// id reset

var win = 0;
var options = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var answers = ["hippogriff", "mandrake", "niffler", "acromantula", "basilisk", "dragon", "pixie", "billiwig", "puffskein", "unicorn", "centaur", 
  "erumpent", "thestral", "bowtruckle", "leprechaun", "kappa", "hinkypunk", "merpeople", "ashwinder", "augurey", "bundimun", "chimaera", 
  "chizpurfle", "clabbert", "crup", "demiguise", "diricawl", "doxy", "dugbog", "erkling", "fairy", "flobberworm", "fwooper", 
  "glumbumble", "gnome", "graphorn", "griffin", "grindylow", "hippocampus", "horklump", "imp", "jarvey", "jobberknoll", "kelpie", 
  "knarl", "kneazle", "lethifold", "lobalug", "manticore", "moke", "mooncalf", "murtlap", "nogtail", "nundu", "occamy", 
  "phoenix", "plimpy", "pogrebin", "porlock", "quintaped", "ramora", "runespoor", "salamander", "shrake", "snidget", "sphinx", 
  "streeler", "tebo", "troll", "werewolf", "yeti"
];

var guessesLeft = 10;
console.log(guessesLeft);

var userGuess;
var userPick = [];
var werd = [];

// Randomly chooses a choice from the options array. This is the Computer's guess.
var currentWord = answers[Math.floor(Math.random() * answers.length)];
console.log(currentWord);

//call these functions before user keypresses
hideWord(currentWord);
render();

// bigass keypress function
document.onkeyup = function(event) {
  // determines which key was pressed
  var userGuess = event.key;
  // key presses get pushed to array onscreen (letters already guessed)
  guessArray(userGuess);
  console.log(userGuess);

  if (guessesLeft > 0) {
  // This logic decrements guesses if they are A–Z characters 
    if (options.includes(userGuess) === true) {

      if (currentWord.includes(userGuess)) {
        compare(userGuess);
        } else {
        guessesLeft--;
        }
      } // end if userGuess is in options array
    } // end if guessesLeft > 0

  // alert if user presses non A–Z key
  if (options.includes(userGuess) === false) {
    alert("Psst — letters only!");
    }

  // loss function -- reset word, clear past guesses
  if (guessesLeft === 0) {
    guessesLeft = 10;
    userPick.splice(0,11);
    werd.splice(0, werd.length);
    currentWord = answers[Math.floor(Math.random() * answers.length)];
    hideWord ();
    console.log(currentWord);
    }

  //winner winner
  if (werd.includes("_") === false) {
    win++;
    displayWinner();
    setTimeout(goAwayFireworks, 1500);
    }

    render();
}; //end bigass function

//click reset button
document.getElementById("reset").onclick = function(event) {
  console.log("i get here");
  win = 0;
  guessesLeft = 10;
  userPick.splice(0,11);
  werd.splice(0,11);
  currentWord = answers[Math.floor(Math.random() * answers.length)];
  console.log(currentWord);
  hideWord();
  compare();
  render();
}

//click next button
document.getElementById("next").onclick = function(event) {
  guessesLeft = 10;
  userPick.splice(0,11);
  werd.splice(0,11);
  currentWord = answers[Math.floor(Math.random() * answers.length)];
  console.log(currentWord);
  hideWord();
  compare();
  render();
}

// print guesses guessed, number of guesses left, number wins, and blanks for answer to screen
function render () {
  document.getElementById("win").innerHTML = win;
  document.getElementById("currentWord").innerHTML = werd.join(" ");
  document.getElementById("guessesLeft").innerHTML = guessesLeft;
  document.getElementById("userGuess").innerHTML = userPick.join(" ");
}

//(1) alert if duplicate guessed, and (2) push guesses to letters already guessed array / (3) pop guesses from letters
// guessed array if they are in currentWord
function guessArray (val1) {
  if (userPick.includes(val1)) {
        alert("You've already guessed that one!");
        guessesLeft++;
    }
  if (werd.includes(val1)) {
        alert("You've already guessed that one!");
    }
  if (options.includes(val1) === true && userPick.includes(val1) === false) {
    userPick.push(val1);
    } 
  if (currentWord.includes(val1)) {
    userPick.pop(val1);
    }
}

//to get currentWord to turn into _ _ _ _
function hideWord () {
  for (i = 0; i < currentWord.length; i++) {
    werd.push("_");
    }
}

//replace _ with letter at correct spot
function compare (val1) {
  for (i = 0; i < currentWord.length; i++) {
    if (currentWord.charAt(i) === val1) {
      werd.splice(i, 1, val1);
      }
    }
}

function displayWinner () {
	document.getElementById("winner").setAttribute ("class", "display");
}

function goAwayFireworks () {
  document.getElementById("winner").setAttribute ("class", "hidden");
}


//begin sparkley pen by simon goellner
$(function() {

  
  // default is varying levels of transparent white sparkles
  $(".sparkley:first").sparkleh();
  
  // rainbow as a color generates random rainbow colros
  // count determines number of sparkles
  // overlap allows sparkles to migrate... watch out for other dom elements though.
  $(".sparkley:last").sparkleh({
    color: "rainbow",
    count: 100,
    overlap: 10
  });
  
  // here we create fuscia sparkles
  $("h1").sparkleh({
    count: 80,
    color: ["#660000","#660000","#660000"]
  });
  
  
  
  // $("p").sparkleh({
  //   count: 20,
  //   color: "#00ff00",
  //   speed: 0.05
  // });
  
  
  // an array can be passed, too for colours
  // for an image, the image needs to be fully loaded to set
  // the canvas to it's height/width.
  // speed allows us to control... the ... velocity 
  $("#image").imagesLoaded( function() {
    $(".img").sparkleh({
      count: 25,
      color: ["#f3edc4","#253943","#659e3f"],
    speed: 0.4
    });
  });


});


$.fn.sparkleh = function( options ) {
    
  return this.each( function(k,v) {
    
    var $this = $(v).css("position","relative");
    
    var settings = $.extend({
      width: $this.outerWidth(),
      height: $this.outerHeight(),
      color: "#000000",
      count: 30,
      overlap: 0,
      speed: 1
    }, options );
    
    var sparkle = new Sparkle( $this, settings );
    
    $this.on({
      "mouseover focus" : function(e) {
        sparkle.over();
      },
      "mouseout blur" : function(e) {
        sparkle.out();
      }
    });
    
  });
  
}


function Sparkle( $parent, options ) {
  this.options = options;
  this.init( $parent );
}

Sparkle.prototype = {
  
  "init" : function( $parent ) {
    
    var _this = this;
    
    this.$canvas = 
      $("<canvas>")
        .addClass("sparkle-canvas")
        .css({
          position: "absolute",
          top: "-"+_this.options.overlap+"px",
          left: "-"+_this.options.overlap+"px",
          "pointer-events": "none"
        })
        .appendTo($parent);
    
    this.canvas = this.$canvas[0];
    this.context = this.canvas.getContext("2d");
    
    this.sprite = new Image();
    this.sprites = [0,6,13,20];
    this.sprite.src = this.datauri;
    
    this.canvas.width = this.options.width + ( this.options.overlap * 2);
    this.canvas.height = this.options.height + ( this.options.overlap * 2);
    
    
    this.particles = this.createSparkles( this.canvas.width , this.canvas.height );
    
    this.anim = null;
    this.fade = false;
    
  },
  
  "createSparkles" : function( w , h ) {
    
    var holder = [];
    
    for( var i = 0; i < this.options.count; i++ ) {
      
      var color = this.options.color;
      
      if( this.options.color == "rainbow" ) {
        color = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
      } else if( $.type(this.options.color) === "array" ) {
        color = this.options.color[ Math.floor(Math.random()*this.options.color.length) ];
      }

      holder[i] = {
        position: {
          x: Math.floor(Math.random()*w),
          y: Math.floor(Math.random()*h)
        },
        style: this.sprites[ Math.floor(Math.random()*4) ],
        delta: {
          x: Math.floor(Math.random() * 1000) - 500,
          y: Math.floor(Math.random() * 1000) - 500
        },
        size: parseFloat((Math.random()*2).toFixed(2)),
        color: color
      };
            
    }
    
    return holder;
    
  },
  
  "draw" : function( time, fade ) {
        
    var ctx = this.context;
    
    ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
          
    for( var i = 0; i < this.options.count; i++ ) {

      var derpicle = this.particles[i];
      var modulus = Math.floor(Math.random()*7);
      
      if( Math.floor(time) % modulus === 0 ) {
        derpicle.style = this.sprites[ Math.floor(Math.random()*4) ];
      }
      
      ctx.save();
      ctx.globalAlpha = derpicle.opacity;
      ctx.drawImage(this.sprite, derpicle.style, 0, 7, 7, derpicle.position.x, derpicle.position.y, 7, 7);
      
      if( this.options.color ) {  
        
        ctx.globalCompositeOperation = "source-atop";
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = derpicle.color;
        ctx.fillRect(derpicle.position.x, derpicle.position.y, 7, 7);
        
      }
      
      ctx.restore();

    }
    
        
  },
  
  "update" : function() {
    
     var _this = this;
    
     this.anim = window.requestAnimationFrame( function(time) {

       for( var i = 0; i < _this.options.count; i++ ) {

         var u = _this.particles[i];
         
         var randX = ( Math.random() > Math.random()*2 );
         var randY = ( Math.random() > Math.random()*3 );
         
         if( randX ) {
           u.position.x += ((u.delta.x * _this.options.speed) / 1500); 
         }        
         
         if( !randY ) {
           u.position.y -= ((u.delta.y * _this.options.speed) / 800);
         }

         if( u.position.x > _this.canvas.width ) {
           u.position.x = -7;
         } else if ( u.position.x < -7 ) {
           u.position.x = _this.canvas.width; 
         }

         if( u.position.y > _this.canvas.height ) {
           u.position.y = -7;
           u.position.x = Math.floor(Math.random()*_this.canvas.width);
         } else if ( u.position.y < -7 ) {
           u.position.y = _this.canvas.height; 
           u.position.x = Math.floor(Math.random()*_this.canvas.width);
         }
         
         if( _this.fade ) {
           u.opacity -= 0.02;
         } else {
           u.opacity -= 0.005;
         }
         
         if( u.opacity <= 0 ) {
           u.opacity = ( _this.fade ) ? 0 : 1;
         }
         
       }
       
       _this.draw( time );
       
       if( _this.fade ) {
         _this.fadeCount -= 1;
         if( _this.fadeCount < 0 ) {
           window.cancelAnimationFrame( _this.anim );
         } else {
           _this.update(); 
         }
       } else {
         _this.update();
       }
       
     });

  },
  
  "cancel" : function() {
    
    this.fadeCount = 100;

  },
  
  "over" : function() {
    
    window.cancelAnimationFrame( this.anim );
    
    for( var i = 0; i < this.options.count; i++ ) {
      this.particles[i].opacity = Math.random();
    }
    
    this.fade = false;
    this.update();

  },
  
  "out" : function() {
    
    this.fade = true;
    this.cancel();
    
  },
  
  
  
  "datauri" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAHCAYAAAD5wDa1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNDNFMzM5REEyMkUxMUUzOEE3NEI3Q0U1QUIzMTc4NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNDNFMzM5RUEyMkUxMUUzOEE3NEI3Q0U1QUIzMTc4NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM0M0UzMzlCQTIyRTExRTM4QTc0QjdDRTVBQjMxNzg2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM0M0UzMzlDQTIyRTExRTM4QTc0QjdDRTVBQjMxNzg2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jzOsUQAAANhJREFUeNqsks0KhCAUhW/Sz6pFSc1AD9HL+OBFbdsVOKWLajH9EE7GFBEjOMxcUNHD8dxPBCEE/DKyLGMqraoqcd4j0ChpUmlBEGCFRBzH2dbj5JycJAn90CEpy1J2SK4apVSM4yiKonhePYwxMU2TaJrm8BpykpWmKQ3D8FbX9SOO4/tOhDEG0zRhGAZo2xaiKDLyPGeSyPM8sCxr868+WC/mvu9j13XBtm1ACME8z7AsC/R9r0fGOf+arOu6jUwS7l6tT/B+xo+aDFRo5BykHfav3/gSYAAtIdQ1IT0puAAAAABJRU5ErkJggg=="

}; 


// $('img.photo',this).imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images
 
// mit license. paul irish. 2010.
// webkit fix from Oren Solomianik. thx!
 
// callback function is passed the last image to load
//   as an argument, and the collection as `this`
 
 
$.fn.imagesLoaded = function(callback){
  var elems = this.filter('img'),
      len   = elems.length,
      blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      
  elems.bind('load.imgloaded',function(){
      if (--len <= 0 && this.src !== blank){ 
        elems.unbind('load.imgloaded');
        callback.call(elems,this); 
      }
  }).each(function(){
     // cached images don't fire load sometimes, so we reset src.
     if (this.complete || this.complete === undefined){
        var src = this.src;
        // webkit hack from https://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
        // data uri bypasses webkit log warning (thx doug jones)
        this.src = blank;
        this.src = src;
     }  
  }); 
 
  return this;
};



