function	getRandomRange(nb1, nb2) {
	return Math.floor((Math.random() * (nb2 - nb1 + 1)) + nb1);
}

Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};
function	createCircle(_x, _y, _r, _timer) {
	this.x = _x;
	this.y = _y;
	this.r = _r;
	this._x = _x;
	this._y = _y;
	this._r = _r;
	this.score = 1;
	this.timer = _timer;
	this.clicked = false;
	this.color = '#044';
}
var winX = 0;
var winY = 0;
var winSmaller = 0;

function	createRandomCircle(speedMin, speedMax) {
	var r = getRandomRange(winSmaller * 0.10, winSmaller * 0.25);
	return (new createCircle(getRandomRange(r, winX * 0.8- (r)), getRandomRange(r, winY * 0.8 - (r)), r, getRandomRange(speedMin, speedMax)));
}

function	createRandomBonusCircle(speedMin, speedMax) {
	var r = getRandomRange(winSmaller * 0.05, winSmaller * 0.15);
	var n = new createCircle(getRandomRange(r, winX * 0.8- (r)), getRandomRange(r, winY * 0.8 - (r)), r, getRandomRange(speedMin, speedMax));
	n.score = 10;
	this.color = '#00F';
	return (n);
}
function	createRandomMalusCircle(speedMin, speedMax) {
	var r = getRandomRange(winSmaller * 0.05, winSmaller * 0.15);
	var n = new createCircle(getRandomRange(r, winX * 0.8- (r)), getRandomRange(r, winY * 0.8 - (r)), r, getRandomRange(speedMin, speedMax));
	n.score = -5;
	this.color = '#F00';
	return (n);
}

app.controller('clickTheDotControler', function( $scope, $window, $routeParams, $timeout ) {
	$scope.speed =  ($routeParams.speed != undefined) ? parseFloat($routeParams.speed) : 5.0;
	winX = $window.innerWidth;
	winY = $window.innerHeight;
	winSmaller = winX < winY ? (winX * 0.8) : ((winY) * 0.8);
	$scope.Score = 0;
	$scope.TouchFail = 0;
	$scope.Timer = 0;
	$scope.points = [];
	$scope.Texts = "Tap to Start !";
	$scope.hasStart = false;
	$scope.circleClick = function(index, p) {
		if (p.clicked == false) {
			p.clicked = true;
			$scope.TouchFail -= 1;
			$scope.Score += p.score;
			console.log($scope.showScore)
			$scope.points.remove(index);
			$scope.points.push(createRandomCircle($scope.speed, $scope.speed + 3));
		}
	}
	$scope.svgClic = function() {
		if ($scope.hasStart != false) {
			$scope.TouchFail += 1;
		}
		else {
			$scope.points.push(createRandomCircle($scope.speed, $scope.speed + 3));
			$scope.Texts = "";
			$scope.hasStart = true;
			$scope.mytimeout = $timeout($scope.onTimerTimeout,1000);
		}
	}
	$scope.endGame = function(){
		$scope.Texts = "Time is UP! -- Score : " + $scope.Score + " -- Tap to ReStart !";
		$scope.rects = [];
		$scope.points = [];
		$scope.Score = 0;
		$scope.hasStart = false;
		$scope.TouchFail = 0; 
		x = 0;
	}

	$scope.rects = [];
	var spacing = 5;
	var width = 100;
	var height = 10;
	var x = 0;
	var y = 0;

	$scope.newRect = function() {
		$scope.rects.push({
			x: x,
			y: y,
			width: width,
			height: height
		});
		y += spacing + height;
	};
		$scope.onTimerTimeout = function(){
			if ($scope.rects.length > 100) {
			$timeout.cancel($scope.mytimeout);
			$scope.endGame();
			return;
			}
			$scope.newRect();
				$scope.mytimeout = $timeout($scope.onTimerTimeout,1000);
		}
});

app.directive('resize', function ($window) {
	return function (scope, element) {
		var w = angular.element($window);
		scope.getWindowDimensions = function () {
			return {
				'h': $window.innerHeight,
				'w': $window.innerWidth
			};
		};
		scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
			scope.HeaderStyle = function () {
				return {
					'width': newValue.w + 'px',
					'height': newValue.h * 0.1+'px',
					'text-align': 'center'
				};
			};
			scope.ContentStyle = function () {
				return {
					'width': (newValue.w * 0.85) + 'px',
					'height': (newValue.h * 0.8) +'px',
					'text-align': 'center',
					'margin': 'auto'
				};
			};

			scope.circleStyle = function (p) {
				var newWinSmaller = newValue.w < newValue.h ? (newValue.w * 0.8) : ((newValue.h) * 0.8);
				p.x = p._x / (winX / newValue.w);
				p.y = p._y / (winY / newValue.h);
				p.r = p._r / (winSmaller / newWinSmaller);
				return {
					'fill': p.color
				};
			};
			scope.timerStyle = function () {
				return {
					'width': (newValue.w * 0.075) + 'px',
					'height': (newValue.h) +'px'
				};
			};
			var rectWidth = newValue.w * 0.075;
			var rectSpace = newValue.h / 100 / 5;
			var rectHeight = rectSpace * 4;
			scope.rectStyle = function (index, r) {
				r.width = rectWidth;
				r.height = rectHeight;
				r.y =  (rectHeight + rectSpace) * index;
				return {
					'fill': 'black'
				};
			};

		}, true);

		w.bind('resize', function () {
			scope.$apply();
		});
	}
})