import removeEmptyParams from '../removeEmptyParams';

describe('removeEmtpyPrams', () => {
  it('should remove values of empty string from the parameter object', () => {
    const params = {
      param1: 'hello',
      param2: null,
      param3: '',
      param4: 'test',
    };

    const expected = {
      param1: 'hello',
      param2: null,
      param4: 'test',
    };

    const result = removeEmptyParams(params);

    expect(result).toEqual(expected);
  });
});
