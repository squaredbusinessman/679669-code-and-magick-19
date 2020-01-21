'use strict';

var CLOUD_COORDINATE = {
  x: 100,
  y: 10
};
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_BG_CLR = '#fff';
var CLOUD_SHADOW_CLR = 'rgba(0, 0, 0, 0.7';
var CLOUD_TEXT_CLR = '#000';
var CLOUD_TEXT_FONT = '16px, PT Mono';
var GAP = 10;
var FONT_GAP = 15;
var WIN_GAP = 150;
var RESULT_RECT_WIDTH = 40;
var RESULT_RECT_HEIGHT = CLOUD_HEIGHT - GAP - FONT_GAP - WIN_GAP - GAP;
var RESULT_RECT_INDENT = 50;
var RESULT_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

var drawRect = function (rectProps) {
  rectProps.ctx.fillStyle = rectProps.color;
  rectProps.ctx.fillRect(rectProps.x, rectProps.y, rectProps.width, rectProps.height);
};

var drawText = function (textProps) {
  textProps.ctx.font = textProps.font || CLOUD_TEXT_FONT;
  textProps.ctx.fillStyle = textProps.color || CLOUD_TEXT_CLR;
  textProps.ctx.fillText(textProps.text, textProps.x, textProps.y);
};

var maxValue = function (arr) {
  var maxValueElement = arr[0];
  for (var i = 1; i <= arr.length; i++) {
    if (arr[i] > maxValueElement) {
      maxValueElement = arr[i];
    }
  }
  return maxValueElement;
};

window.renderStatistics = function (ctx, names, times) {
  var textXCoordinate = CLOUD_COORDINATE.x + GAP * 2;
  drawRect({
    ctx: ctx,
    color: CLOUD_SHADOW_CLR,
    x: CLOUD_COORDINATE.x + GAP,
    y: CLOUD_COORDINATE.y + GAP,
    width: CLOUD_WIDTH,
    height: CLOUD_HEIGHT
  });

  drawRect({
    ctx: ctx,
    color: CLOUD_BG_CLR,
    x: CLOUD_COORDINATE.x,
    y: CLOUD_COORDINATE.y,
    width: CLOUD_WIDTH,
    height: CLOUD_HEIGHT
  });

  drawText({
    ctx: ctx,
    text: 'Ура Вы победили!',
    x: textXCoordinate,
    y: CLOUD_COORDINATE.y * 4
  });

  drawText({
    ctx: ctx,
    text: 'Список результатов:',
    x: textXCoordinate,
    y: CLOUD_COORDINATE.y * 6
  });

  for (var j = 0; j < names.length; j++) {
    var highValue = maxValue(times);
    var statisticsXCoordinate = CLOUD_COORDINATE.x + GAP + RESULT_RECT_INDENT + (GAP * 4 + RESULT_RECT_WIDTH) * j;
    drawRect({
      ctx: ctx,
      color: (names[j] === 'Вы') ? RESULT_PLAYER_COLOR : 'hsl(240, ' + Math.random() * '100' + '%' + ', 50%)',
      x: statisticsXCoordinate,
      y: CLOUD_HEIGHT - GAP * 2 - FONT_GAP,
      width: RESULT_RECT_WIDTH,
      height: Number(-(RESULT_RECT_HEIGHT * times[j] / highValue))
    });
    drawText({
      ctx: ctx,
      text: names[j],
      x: statisticsXCoordinate,
      y: CLOUD_HEIGHT - GAP
    });
    drawText({
      ctx: ctx,
      text: Math.round(times[j]),
      x: statisticsXCoordinate,
      y: CLOUD_COORDINATE.y + GAP * 10
    });
  }
};
