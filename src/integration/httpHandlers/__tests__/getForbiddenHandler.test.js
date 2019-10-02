import getForbiddenHandler from '../getForbiddenHandler';

describe('getForbiddenHandler', () => {
  const handlerMap = {
    a: () => 'a',
    b: () => 'b',
  };
  const defaultHandler = () => 'c';

  it('gets a handler from the map', () => {
    const responseBody = {
      forbiddenResponseCode: 'a',
    };

    const actual = getForbiddenHandler({
      responseBody,
      handleMap: handlerMap,
      handleDefault: defaultHandler,
    });

    expect(actual).toEqual(handlerMap.a);
  });

  it('uses the default handler when no matching handlers in the map', () => {
    const responseBody = {
      forbiddenResponseCode: 'u',
    };

    const actual = getForbiddenHandler({
      responseBody,
      handleMap: handlerMap,
      handleDefault: defaultHandler,
    });

    expect(actual).toEqual(defaultHandler);
  });
});
