'use strict';

var WIZARD_DISPLAY_VALUE = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var showSetupWindow = function () {
  document.querySelector('.setup').classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');
};

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content;

var getRandomInt = function (minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

var createWizards = function () {
  var wizards = [];

  for (var i = 0; i < WIZARD_DISPLAY_VALUE; i++) {
    wizards.push({
      name: WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomInt(0, WIZARD_SURNAMES.length - 1)],
      coatColor: COAT_COLORS[getRandomInt(0, COAT_COLORS.length - 1)],
      eyesColor: EYE_COLORS[getRandomInt(0, EYE_COLORS.length - 1)]
    });
  }

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};


var renderWizards = function () {
  var fragment = document.createDocumentFragment();
  var wizards = createWizards();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

showSetupWindow();

renderWizards();
