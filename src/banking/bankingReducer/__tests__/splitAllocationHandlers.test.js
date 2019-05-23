import { calculateLineAmount } from '../splitAllocationHandlers';

const state = {
  openEntry: {
    allocate: {
      totalAmount: 100.01,
      lines: [
        { amount: '50.01', amountPercent: '50' },
        { amount: '10.00', amountPercent: '10' },
      ],
    },
  },
};

describe('splitAllocationHandlers', () => {
  describe('calculateLineAmount', () => {
    [
      [
        '10.00',
        'line amount is edited',
        state,
        state.openEntry.allocate.lines[0],
        '10',
        false,
      ],
      [
        '-10.00',
        'line amount is changed to negative',
        state,
        state.openEntry.allocate.lines[0],
        '-10',
        false,
      ],
      [
        '50.00',
        'line amount updated to remainder amount',
        state,
        state.openEntry.allocate.lines[1],
        '50',
        false,
      ],
      [
        '40.00',
        'line is added to have remainder amount',
        state,
        { amountPercent: '40' },
        '40',
        true,
      ],
    ].forEach(([expected, description, ...args]) => {
      it(`should return ${expected} when ${description}`, () => {
        const isAllocated = calculateLineAmount(...args);

        expect(isAllocated).toEqual(expected);
      });
    });
  });
});
