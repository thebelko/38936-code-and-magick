'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC = 27;
var ENTER = 13;

var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
var setupBlock = document.querySelector('.setup');
var userName = setupBlock.querySelector('.setup-user-name');
var setupClose = setupBlock.querySelector('.setup-close');
var similarList = setupBlock.querySelector('.setup-similar-list');
var similarListBlock = setupBlock.querySelector('.setup-similar');
var wizardCoatColor = setupBlock.querySelector('.wizard-coat');
var wizardEyesColor = setupBlock.querySelector('.wizard-eyes');
var wizardFireballColor = setupBlock.querySelector('.setup-fireball-wrap');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var coatClickCounter = 1;
var eyesClickCounter = 1;
var fireballClickCounter = 1;

var getRandomArrItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createWizardsArr = function (wizardQuantity) {
  var wizardsArmy = [];

  for (var i = 0; i < wizardQuantity; i++) {
    wizardsArmy.push({
      name: getRandomArrItem(NAMES) + ' ' + getRandomArrItem(SURNAMES),
      coatColor: getRandomArrItem(COAT_COLORS),
      eyesColor: getRandomArrItem(EYES_COLORS)
    });
  }

  return wizardsArmy;
};

var renderSimilarWizard = function (wizard) {
  var oneWizard = similarWizardTemplate.cloneNode(true);

  oneWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  oneWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  oneWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return oneWizard;

};

var renderSimilarWizardsList = function (wizardsArr, renderingBlock) {
  var fragment = document.createDocumentFragment();

  wizardsArr.forEach(function (item) {
    fragment.appendChild(renderSimilarWizard(item));
  });

  renderingBlock.appendChild(fragment);

};

var isEscPressed = function (evt) {
  return evt.keyCode === ESC;
};

var isEnterPressed = function (evt) {
  return evt.keyCode === ENTER;
};

var setupEscPressHandler = function (evt) {
  if (isEscPressed(evt)) {
    closeSetup();
  }
};

var openSetup = function () {
  setupBlock.classList.remove('hidden');

  document.addEventListener('keydown', setupEscPressHandler);

  userName.addEventListener('keydown', function (evt) {
    if (isEscPressed(evt)) {
      evt.stopPropagation();
    }
  });
};

var closeSetup = function () {
  setupBlock.classList.add('hidden');

  document.removeEventListener('keydown', setupEscPressHandler);
};


setupOpen.addEventListener('click', function () {
  openSetup();
});

setupOpenIcon.addEventListener('keydown', function (evt) {
  if (isEnterPressed(evt)) {
    openSetup();
  }
});

setupClose.addEventListener('click', function () {
  closeSetup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (isEnterPressed(evt)) {
    closeSetup();
  }
});

wizardCoatColor.addEventListener('click', function () {
  wizardCoatColor.style.fill = COAT_COLORS[coatClickCounter];
  coatClickCounter++;

  if (coatClickCounter === COAT_COLORS.length) {
    coatClickCounter = 1;
  }
});

wizardEyesColor.addEventListener('click', function () {
  wizardEyesColor.style.fill = EYES_COLORS[eyesClickCounter];
  eyesClickCounter++;

  if (eyesClickCounter === EYES_COLORS.length) {
    eyesClickCounter = 1;
  }
});

wizardFireballColor.addEventListener('click', function () {
  wizardFireballColor.style.background = FIREBALL_COLORS[fireballClickCounter];
  fireballClickCounter++;

  if (fireballClickCounter === FIREBALL_COLORS.length) {
    fireballClickCounter = 1;
  }
});

renderSimilarWizardsList(createWizardsArr(4), similarList);
similarListBlock.classList.remove('hidden');
