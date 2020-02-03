'use strict';

var WIZARD_DISPLAY_VALUE = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var KEYCODES = {
  esc: 27,
  enter: 13
};

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

// module4-task1
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var setupEscPressHandler = function (evt) {
  if (evt.key === KEYCODES.esc && !(evt.target.classList.contains('.setup-close'))) {
    closePopup();
  }
};

var setupEnterPressHandler = function (evt) {
  if (evt.key === KEYCODES.enter) {
    openPopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', setupEnterPressHandler);
  document.addEventListener('keydown', setupEscPressHandler);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', setupEscPressHandler);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === KEYCODES.enter) {
    closePopup();
  }
});

// валидация формы ввода имени

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

// Изменение цвета мантии по нажатию

var userSetupWizard = document.querySelector('.setup-wizard');
var coatPlayerColor = userSetupWizard.querySelector('.wizard-coat');

var coatClickColor = function () {
  coatPlayerColor.style.fill = COAT_COLORS[getRandomInt(0, COAT_COLORS.length - 1)];
};

coatPlayerColor.addEventListener('click', coatClickColor);

//  изменение цвета глаз по нажатию

var eyesPlayerColor = userSetupWizard.querySelector('.wizard-eyes');

var eyesClickColor = function () {
  eyesPlayerColor.style.fill = EYE_COLORS[getRandomInt(0, EYE_COLORS.length - 1)];
};

eyesPlayerColor.addEventListener('click', eyesClickColor);

// изменение цвета файербола

var setupPlayer = document.querySelector('.setup-player');
var setupFireball = setupPlayer.querySelector('.setup-fireball-wrap');

var fireballClickColor = function () {
  setupFireball.style.background = FIREBALL_COLORS[getRandomInt(0, FIREBALL_COLORS.length - 1)];
};

setupFireball.addEventListener('click', fireballClickColor);
