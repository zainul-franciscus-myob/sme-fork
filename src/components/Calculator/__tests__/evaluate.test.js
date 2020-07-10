import evaluate from '../evaluate';

describe('evaluate', () => {
  it('should evaluate a simple example', () => {
    const test = '2 + 2';
    expect(evaluate(test)).toEqual(4);
  });

  describe('should not support the evaluation of the following expressions', () => {
    ['', ' ', '+', '-', '*', '/', '++/*', '*1-', '/1'].forEach((test) => {
      it(`${test}`, () => {
        expect(Boolean(evaluate(test))).toEqual(false);
      });
    });
  });
});
