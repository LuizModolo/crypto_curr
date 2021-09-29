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

describe('Testando a construção dinâmica da tabela página com base na API', () => {
  test('se a função de getApi está funcionando corretamente', () => {
    getApi = jest.fn().mockResolvedValue(Promise.resolve);
    return expect(getApi()).resolves.toEqual(Promise.resolve);
  });

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

  test('se a função createSection está funcionando corretamente', () => {
    createSection = jest.fn().mockReturnValue('HTML Element');
    expect(createSection()).toBe('HTML Element');
    expect(createSection).toHaveBeenCalled();
    expect(createSection).toHaveBeenCalledTimes(1);
  });

  test('se a função fillSectionsSorted está funcionando corretamente', () => {
    fillSectionsSorted = jest.fn();
    fillSectionsSorted();
    expect(fillSectionsSorted).toHaveBeenCalled();
    expect(fillSectionsSorted).toHaveBeenCalledTimes(1);
  });

  test('se a função createTable está funcionando corretamente', () => {
    createTable = jest.fn();
    createTable();
    expect(createTable).toHaveBeenCalled();
    expect(createTable).toHaveBeenCalledTimes(1);
  });

  test('se a função commaPoint está funcionando corretamente', () => {
    expect(commaPoint(1650.705)).toBe('1,650.70');
  });

  test('se a função createLogos está funcionando corretamente', () => {
    createLogos = jest.fn()
    createLogos();
    expect(createLogos).toHaveBeenCalled();
    expect(createLogos).toHaveBeenCalledTimes(1);
  });
});