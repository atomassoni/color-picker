$(document).ready(function() {
    //initializing variables, can set numDivs to different numbers
    var numDivs = 4;

    var matchColor1 = "#fff";
    var matchColor2 = "#000";

    var hint = undefined;

    var $cb = loadDivs(numDivs);

    setMatchColor();

    //changes the number of color boxes
    $('#settings').on('submit', loadSettings);
    //when the user clicks on the hex color, it's broken down into rgb colors for a better visual guess to the color
    $('#color-to-pick').on('click', setHint);
    //sees if the color clicked matches the correct color
    $('#container').on('click', '.color-block', matchColors);
    //resets the color to match if the user wants to try a different one
    $('#newcolor').on('click', setMatchColor);


    //takes a number and creates that many divs on the DOM, colored with different random hex colors, and returns all the new divs as an array
    function loadDivs(num) {
        var color = "#000000";
        for (var i = 0; i < num; i++) {
            color = getRandomColor();
            $('#container').append('<div class="color-block"></div>');
            $('#container').children().last().css('background-color', color).data('color', color);

        }
        return $('.color-block');
    }

    function loadSettings(event) {
        event.preventDefault();

        var values = {};
        $.each($('#settings').serializeArray(), function(i, field) {
            values[field.name] = field.value;
        });
        var num = values.blockcounter;


        if (num>0&&num<65) {
            numDivs = num;
            reloadGame(num);
        }


    }
    //finds a random color from the DOM data and writes that color back to the DOM to make it the color to pick
    function setMatchColor() {
        var random = randomNumber(0, numDivs - 1);
        matchColor1 = $cb.eq(random).data('color');
        $('#color-to-pick').data('matchcolor', matchColor1);
        var substring1 = matchColor1.substr(1,2);
        var substring2 = matchColor1.substr(3,2);
        var substring3 = matchColor1.substr(5,2);
        $('#red').text(substring1).css('background-color', '#fff');
        $('#green').text(substring2).css('background-color', '#fff');
        $('#blue').text(substring3).css('background-color', '#fff');

    }

    //finds the color to pick from the DOM and gets the color user clicked on when function is passed into event handler
    function matchColors() {
        matchColor1 = $('#color-to-pick').data('matchcolor');
        matchColor2 = $(this).data('color');
        console.log('Color clicked: ', matchColor2);
        if (matchColor1 == matchColor2) {
            $('#message').text('You got it right! That color is ' + matchColor2);
        } else {
            $('#message').text('Try again!');
        }
    }
//not used, to work on
    function reloadGame(num) {
        $('#container').empty();
        $cb = loadDivs(num);
        setMatchColor();
    }

    function setHint() {
            matchColor1 = $('#color-to-pick').data('matchcolor');
            var substring1 = matchColor1.substr(1,2);
            var substring2 = matchColor1.substr(3,2);
            var substring3 = matchColor1.substr(5,2);
            var red = Number('0x' + substring1);
            var green = Number('0x' + substring2);
            var blue = Number('0x' + substring3);
            $('#red').css('background-color', 'rgb('+red+',0,0)');
            $('#green').css('background-color', 'rgb(0,'+green+',0)');
            $('#blue').css('background-color', 'rgb(0,0,'+blue+')');
    }
    //UTILITY FUNCTIONS
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (1 + max - min) + min);
    }
    //function copied from internet
    function getRandomColor() {
        var length = 6;
        var chars = '0123456789ABCDEF';
        var hex = '#';
        while (length--) hex += chars[(Math.random() * 16) | 0];
        return hex;
    }

});
