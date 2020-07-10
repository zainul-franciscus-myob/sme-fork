import createValidator from '../validate';

describe('validate', () => {
  describe('given default validation rules', () => {
    const validate = createValidator();

    describe('it should support the following operations', () => {
      const buildTests = (operator) => [
        `${operator}`, // +
        `5${operator}5`, // 5+5
        `${operator}5${operator}`, // +5+
        `${operator}5${operator}${operator}`, // +5++
        `2${operator}5${operator}${operator}1`, // 2+5++1
        `2${operator}5${operator} ${operator}1`, // 2+5+ +1
      ];

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
        '!',
        '@',
        '#',
        '$',
        '%',
        '^',
        '&',
        '_',
        '=',
        '|',
        "'",
        '"',
        '<',
        '>',
        '?',
        '{',
        '}',
        '`',
        '~',
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

  describe('given numeralIntegerScale is used', () => {
    const validate = createValidator({ numeralIntegerScale: 2 });

    describe('it should restrict', () => {
      describe('numbers', () => {
        ['123', '123.1', '1234', 123, 999, '1,000', '000'].forEach((test) => {
          it(`${test}`, () => {
            expect(validate(test)).toEqual(false);
          });
        });
      });

      describe('expressions', () => {
        ['99 + 1', '100 + 0', '100 * 1', '99 * 1 + 0.9 + 0.1'].forEach(
          (test) => {
            it(`${test}`, () => {
              expect(validate(test)).toEqual(false);
            });
          }
        );
      });
    });

    describe('it should not restrict', () => {
      describe('numbers', () => {
        ['', ' ', 0, '12', '12.1', 13, 99, '00'].forEach((test) => {
          it(`${test}`, () => {
            expect(validate(test)).toEqual(true);
          });
        });
      });

      describe('expressions', () => {
        [
          '4 + ',
          '100 - 1',
          '10 * 9.9',
          '99 + 0',
          '100 * 0',
          '100 / 100',
          '99.99 + 0.0001',
        ].forEach((test) => {
          it(`${test}`, () => {
            expect(validate(test)).toEqual(true);
          });
        });
      });
    });
  });
});
