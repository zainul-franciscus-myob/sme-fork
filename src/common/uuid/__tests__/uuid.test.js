import uuid from '../uuid';

describe('uuid', () => {
  it('generates a valid uuid', () => {
    const actual = uuid();
    expect(actual).toEqual(
      expect.stringMatching(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/),
    );
  });

  it('generates unique uuid', () => {
    const one = uuid();
    const two = uuid();

    expect(one).not.toEqual(two);
  });
});
