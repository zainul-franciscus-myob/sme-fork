import validate from '../validate';

describe('validate', () => {
  describe('it should support the following operations', () => {
    const buildTests = operator => ([
      `${operator}`, // +
      `5${operator}5`, // 5+5
      `${operator}5${operator}`, // +5+
      `${operator}5${operator}${operator}`, // +5++
      `2${operator}5${operator}${operator}1`, // 2+5++1
      `2${operator}5${operator} ${operator}1`, // 2+5+ +1
    ]);

    describe('addition', () => {
      const tests = buildTests('+');

      tests.forEach((test) => {
        it(`${test}`, () => {
          expect(validate(test)).toEqual(true);
        });
      });
    });

    describe('subtraction', () => {
      const tests = buildTests('-');

      tests.forEach((test) => {
        it(`${test}`, () => {
          expect(validate(test)).toEqual(true);
        });
      });
    });

    describe('multiplication', () => {
      const tests = buildTests('*');

      tests.forEach((test) => {
        it(`${test}`, () => {
          expect(validate(test)).toEqual(true);
        });
      });
    });

    describe('division', () => {
      const tests = buildTests('/');

      tests.forEach((test) => {
        it(`${test}`, () => {
          expect(validate(test)).toEqual(true);
        });
      });
    });

    describe('multiple operations', () => {
      const tests = [
        '1+2-5/(5+1)',
        '12121+-41/5*651--1',
        '12-)(341+41',
        '(12 * 2) -- 1+1',
        '5 +- 2*()',
        '1000.00 + 2.777*(1--2)',
      ];

      tests.forEach((test) => {
        it(`${test}`, () => {
          expect(validate(test)).toEqual(true);
        });
      });
    });
  });

  describe('it should not support the following operations', () => {
    const simpleTests = [
      '!', '@', '#', '$', '%', '^', '&', '_', '=', '|', '\'', '"', '<', '>', '?', '{', '}', '`', '~',
    ];

    const mixedTests = [
      '1+2-5/(5+1)@',
      '1+2-5/(5!)2',
      '-5_/(5!)2',
      '"_/(5!)2',
    ];

    simpleTests.forEach((test) => {
      it(`${test}`, () => {
        expect(validate(test)).toEqual(false);
      });
    });

    mixedTests.forEach((test) => {
      it(`${test}`, () => {
        expect(validate(test)).toEqual(false);
      });
    });
  });
});
