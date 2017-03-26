'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, .7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = '#fff';
  ctx.fillRect(100, 10, 420, 270);

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура, вы победили!', 120, 30);
  ctx.fillText('Список результатов:', 120, 50);

  var maxTime = 0;
  var historgamHeightBiggest = 150;
  var coordinateY = 250;
  var coordinateX = 140;
  var columnWidth = 40;
  var spaceBetweenColumns = 50;
  var spaceBetweenColumnAndText = 10;
  var playerName = 'Вы';

  var findBiggestNumber = function (arr) {
    var biggestNumber = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > biggestNumber) {
        biggestNumber = arr[i];
      }
    }
    return biggestNumber;
  };


  var getRandomNumber = function (min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
  };

  var renderHistogramColumn = function (i, time, name) {

    if (name === playerName) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + getRandomNumber(0.1, 1) + ')';
    }

    var step = historgamHeightBiggest / maxTime;
    var coordinateXNext = coordinateX + spaceBetweenColumns * i + columnWidth * i;
    var histogramHeight = (time * step);

    ctx.fillRect(coordinateXNext, coordinateY, columnWidth, -histogramHeight);
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'hanging';
    ctx.fillText(name, coordinateXNext, coordinateY + spaceBetweenColumnAndText);
    ctx.textBaseline = 'bottom';
    ctx.fillText(time.toFixed(), coordinateXNext, coordinateY - histogramHeight - spaceBetweenColumnAndText);

  };

  var renderAllHistogram = function (arrTime, arrNames) {
    for (var i = 0; i < arrTime.length; i++) {
      renderHistogramColumn(i, arrTime[i], arrNames[i]);
    }
  };

  maxTime = findBiggestNumber(times);

  renderAllHistogram(times, names);

};
