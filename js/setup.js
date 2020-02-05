'use strict';

var WIZARD_DISPLAY_VALUE = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var KEYCODES = {
  esc: 'Escape',
  enter: 'Enter'
};

// setup window
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open-icon');
var setupClose = setup.querySelector('.setup-close');

// wizard colors
var userSetupWizard = document.querySelector('.setup-wizard');
var coatPlayerColor = userSetupWizard.querySelector('.wizard-coat');
var eyesPlayerColor = userSetupWizard.querySelector('.wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball');

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

setupOpen.setAttribute('tabindex', 0);

var showSetupWindow = function () {
  document.querySelector('.setup').classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');

  setupClose.setAttribute('tabindex', 0);
  setupClose.addEventListener('click', closeSetupWindow);

  coatPlayerColor.addEventListener('click', coatClickColor);
  eyesPlayerColor.addEventListener('click', eyesClickColor);
  setupFireball.addEventListener('click', fireballClickColor);
};

var closeSetupWindow = function () {
  setup.classList.add('hidden');

  setupClose.removeEventListener('click', closeSetupWindow);
  setupOpen.addEventListener('click', showSetupWindow);

  coatPlayerColor.removeEventListener('click', coatClickColor);
  eyesPlayerColor.removeEventListener('click', eyesClickColor);
  setupFireball.removeEventListener('click', fireballClickColor);
};

var keydownHandler = function (evt) {
  if (evt.key === KEYCODES.esc) {
    if (!evt.target.classList.contains('setup-user-name')) {
      closeSetupWindow();
    }
  } else if (evt.key === KEYCODES.enter) {
    if (evt.target.classList.contains('setup-open-icon')) {
      showSetupWindow();
    } else if (evt.target.classList.contains('setup-close')) {
      closeSetupWindow();
    }
  }
};

var addKeydownListener = function () {
  document.addEventListener('keydown', keydownHandler);
};

var coatClickColor = function () {
  coatPlayerColor.style.fill = COAT_COLORS[getRandomInt(0, COAT_COLORS.length - 1)];
  setup.querySelector('input[name="coat-color"]').value = coatPlayerColor.style.fill;
};

var eyesClickColor = function () {
  eyesPlayerColor.style.fill = EYE_COLORS[getRandomInt(0, EYE_COLORS.length - 1)];
  setup.querySelector('input[name="eye-color"]').value = eyesPlayerColor.style.fill;
};

var fireballClickColor = function () {
  setupFireball.style.background = FIREBALL_COLORS[getRandomInt(0, FIREBALL_COLORS.length - 1)];
  setup.querySelector('input[name="fireball-color"]').value = setupFireball.style.background;
};

renderWizards();
addKeydownListener();
showSetupWindow();
