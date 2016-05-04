$(document).ready(function() {
//initializing variables, can set numDivs to different numbers
var numDivs = 4;

var matchColor1 = "#fff";
var matchColor2 = "#000";


var $cb = loadDivs(numDivs);

setMatchColor();

//when user clicks the color-blocks, runs matchColors, to see if it matches the set match color
$('#container').on('click', '.color-block', matchColors);
//resets the color to match if the user wants to try a different one
$('#reload').on('click', setMatchColor);


//takes a number and creates that many divs on the DOM, colored with different random hex colors, and returns all the new divs as an array
function loadDivs(num) {
    var color = "#000000";
    for (var i=0; i<num; i++) {
        color = getRandomColor();
        $('#container').append('<div class="color-block"></div>');
        $('#container').children().last().css('background-color', color).data('color', color);

    }
    return $('.color-block');
}

//finds a random color from the DOM data and writes that color back to the DOM to make it the color to pick
function setMatchColor() {
  var random = randomNumber(0, numDivs-1);
    matchColor1 = $cb.eq(random).data('color');
    $('#color-to-pick').text(matchColor1);
}

//finds the color to pick from the DOM and gets the color user clicked on when function is passed into event handler, writes a message to dom
function matchColors() {
  matchColor1 = $('#color-to-pick').text();
  matchColor2 = $(this).data('color');
  console.log('Color clicked: ', matchColor2);
  if (matchColor1==matchColor2) {
    $('#message').text('You got it right! That color is ' + matchColor2);
  } else {
    $('#message').text('Try again!');
  }
}

//UTILITY FUNCTIONS
function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}
//function copied from internet
function getRandomColor() {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '#';
  while(length--) hex += chars[(Math.random() * 16) | 0];
  return hex;
}

});
