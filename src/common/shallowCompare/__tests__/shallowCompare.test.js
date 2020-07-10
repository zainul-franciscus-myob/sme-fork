import shallowCompare from '../shallowCompare';

describe('shallowCompare', () => {
  it('should return true if both objects have the same key value pairs', () => {
    const obj1 = {
      key1: 'All',
      key2: false,
    };

    const obj2 = {
      key1: 'All',
      key2: false,
    };

    const actual = shallowCompare(obj1, obj2);

    expect(actual).toEqual(true);
  });

  it('should return true if both objects are empty', () => {
    const obj1 = {};

    const obj2 = {};

    const actual = shallowCompare(obj1, obj2);

    expect(actual).toEqual(true);
  });

  it("should return false if both objects don't have the same key value pairs", () => {
    const obj1 = {
      key1: 'All',
      key2: true,
    };

    const obj2 = {
      key1: 'All',
      key2: false,
    };

    const actual = shallowCompare(obj1, obj2);

    expect(actual).toEqual(false);
  });

  it('should return false if objects have nested array or object', () => {
    const obj1 = {
      key1: 'All',
      key2: ['something'],
    };

    const obj2 = {
      key1: 'All',
      key2: ['something'],
    };

    const actual = shallowCompare(obj1, obj2);

    expect(actual).toEqual(false);
  });

  it('should return true if objects have same reference to nested array or object', () => {
    const array = ['something'];

    const obj1 = {
      key1: 'All',
      key2: array,
    };

    const obj2 = {
      key1: 'All',
      key2: array,
    };

    const actual = shallowCompare(obj1, obj2);

    expect(actual).toEqual(true);
  });
});
