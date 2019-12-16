import flat from '../flat';

describe('flat', () => {
  it('should not flatten an array containing a depth of 0', () => {
    const array = [1, 2, 3, 4, 5];
    const depth = 2;

    const actual = flat(array, depth);

    const expected = [1, 2, 3, 4, 5];

    expect(actual).toEqual(expected);
  });

  it('should not flatten an array containing a depth of 0', () => {
    const array = [1, [2], [3, [4, [5]]]];
    const depth = 0;

    const actual = flat(array, depth);

    const expected = [1, [2], [3, [4, [5]]]];

    expect(actual).toEqual(expected);
  });

  it('should flatten an array containing a depth of 1', () => {
    const array = [1, [2], [3, [4, [5]]]];
    const depth = 1;

    const actual = flat(array, depth);

    const expected = [1, 2, 3, [4, [5]]];

    expect(actual).toEqual(expected);
  });

  it('should flatten an array containing a depth of 2', () => {
    const array = [1, [2], [3, [4, [5]]]];
    const depth = 2;

    const actual = flat(array, depth);

    const expected = [1, 2, 3, 4, [5]];

    expect(actual).toEqual(expected);
  });

  it('should flatten an array containing a depth of 3', () => {
    const array = [1, [2], [3, [4, [5]]]];
    const depth = 3;

    const actual = flat(array, depth);

    const expected = [1, 2, 3, 4, 5];

    expect(actual).toEqual(expected);
  });
});
