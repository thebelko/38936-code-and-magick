'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var setupBlock = document.querySelector('.setup');
var similarListBlock = setupBlock.querySelector('.setup-similar-list');
var similarListWrapper = setupBlock.querySelector('.setup-similar');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

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

renderSimilarWizardsList(createWizardsArr(4), similarListBlock);

setupBlock.classList.remove('hidden');
similarListWrapper.classList.remove('hidden');
