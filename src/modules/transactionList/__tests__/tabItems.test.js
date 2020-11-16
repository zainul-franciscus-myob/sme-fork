const { tabItemIds, mapTab } = require('../tabItems');

describe('mapTab', () => {
  const setup = (tabItemId) =>
    mapTab(
      tabItemId,
      () => 1,
      () => 2,
      () => 3
    );

  it(`calls journal callback when ${tabItemIds.journal}`, () => {
    const actual = setup(tabItemIds.journal);
    expect(actual).toEqual(1);
  });

  it(`calls journal callback when ${tabItemIds.debitsAndCredits}`, () => {
    const actual = setup(tabItemIds.debitsAndCredits);
    expect(actual).toEqual(2);
  });

  it(`calls journal callback when ${tabItemIds.findAndRecode}`, () => {
    const actual = setup(tabItemIds.findAndRecode);
    expect(actual).toEqual(3);
  });
});
