/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
	MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));

	$('.btn').click(function() {
		MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
	});

});

var MatchGame = {};

/*
  Re-sets game.
 */
MatchGame.restartGame = function ($game) {
	$game.data('flippedCards', []);
	$game.data('score', 0);
	$game.empty();
	document.getElementById("score-text").innerHTML = '<p>Pairs found: </p>';
};

/*
  Generates and returns an array of matching card values.
 */
MatchGame.generateCardValues = function () {
	var array = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
	var cardValues = [];
	
	for (var x = 0; x < 16; x++) {
		var ranLoc = Math.floor((Math.random() * array.length) + 1) - 1;
		cardValues.push(array[ranLoc]);
		array.splice(ranLoc, 1);
	}
	
	return cardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/
MatchGame.renderCards = function(cardValues, $game) {
	var colorArray = ['hsl(25, 85%, 65%)', 'hsl(55, 85%, 65%', 'hsl(90, 85%, 65%', 'hsl(160, 85%, 65%', 'hsl(120, 85%, 65%', 'hsl(220, 85%, 65%', 'hsl(265, 85%, 65%', 'hsl(310, 85%, 65%', 'hsl(360, 85%, 65%'];

	MatchGame.restartGame($game);
	
	for (var x = 0; x < cardValues.length; x++) {
		var $card = $('<div class="card col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>');
		$card.data('value', cardValues[x]);
		$card.data('flipped', false);
		$card.data('color', colorArray[cardValues[x]-1]);
		$game.append($card);
	}
	
	$('.card').click(function() {
		MatchGame.flipCard($(this), $game);
	});
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */
MatchGame.flipCard = function($card, $game) {
	if ($card.data('flipped') == true) {
		return;
	}
	
	$card.css('background-color', $card.data('color'));
	$card.text($card.data('value'));
	$card.data('flipped', true);

	$game.data('flippedCards').push($card);
 	
	var score = $game.data('score');
	
	if($game.data('flippedCards').length == 2) {
		var $card1 = $game.data('flippedCards')[0];
		var $card2 = $game.data('flippedCards')[1];
		if ($card1.data('value') == $card2.data('value')) {
			$card1.css('background-color', 'rgb(153,153,153)');
			$card1.css('text', 'rgb(204,204,204)');
			$card2.css('background-color', 'rgb(153,153,153)');
			$card2.css('text', 'rgb(204,204,204)');
			
			score++;
			$game.data('score', score);
			
			var $score = '<p>Pairs found: ' + score + '</p>';

			document.getElementById("score-text").innerHTML = $score;
			
		} else {
			setTimeout(function() {
				$card1.text('');
				$card2.text('');
				$card1.css('background-color', 'rgb(32,64,86)');
				$card2.css('background-color', 'rgb(32,64,86)');
			}, 300);
			$card1.data('flipped', false);
			$card2.data('flipped', false);
		}

		$game.data('flippedCards', []);		
	}

};