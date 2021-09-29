/**
 * @jest-environment jsdom
 */

let { loadingScreen, fillSectionsSorted, fillSections, biggestLoserWinner, fetchNews, getApi, loadingRemove, createTable, createLogos, createLogosBigAndLose, globalMarketCapVolume, commaPoint, createNews, createMainContent, createSection, buttonEvent } = require('../src/script.js');

describe('Testando o loading da página', () => {
  test('se a função de loadingScreen está funcionando corretamente', () => {
    loadingScreen = jest.fn();
    loadingScreen();
    expect(loadingScreen).toHaveBeenCalled();
    expect(loadingScreen).toHaveBeenCalledTimes(1);
  });

  test('se a função de loadingRemove está funcionando corretamente', () => {
    loadingRemove = jest.fn();
    loadingRemove();
    expect(loadingRemove).toHaveBeenCalled();
    expect(loadingRemove).toHaveBeenCalledTimes(1);
  });
});

describe('Testando a construção dinâmica da página com base na API', () => {
  test('se a função fillSections está funcionando corretamente', () => {
    fillSections = jest.fn();
    fillSections();
    expect(fillSections).toHaveBeenCalled();
    expect(fillSections).toHaveBeenCalledTimes(1);
  });

  test('se a função createMainContent está funcionando corretamente', () => {
    createMainContent = jest.fn();
    createMainContent();
    expect(createMainContent).toHaveBeenCalled();
    expect(createMainContent).toHaveBeenCalledTimes(1);
  });
});