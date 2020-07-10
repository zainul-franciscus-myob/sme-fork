import getDisplayDaysForMonth from '../getDisplayDaysForMonth';

describe('getDisplayDaysForMonth', () => {
  it.each([
    ['1st', '1'],
    ['2nd', '2'],
    ['10th', '10'],
    ['21st', '21'],
  ])(
    'returns a display value for days of the current month when the term is On a day of the month',
    (displayDay, day) => {
      const displayDays = getDisplayDaysForMonth('OnADayOfTheMonth');
      const actualDay = displayDays.find((dayItem) => dayItem.value === day);
      expect(actualDay.name).toEqual(displayDay);
    }
  );

  it.each([
    ['1st', '1'],
    ['2nd', '2'],
    ['10th', '10'],
    ['21st', '21'],
  ])(
    'returns a display value for days of the next month when term is day of next month',
    (displayDay, day) => {
      const displayDays = getDisplayDaysForMonth('DayOfMonthAfterEOM');
      const actualDay = displayDays.find((dayItem) => dayItem.value === day);
      expect(actualDay.name).toEqual(displayDay);
    }
  );

  it('returns the last index with the name "Last day"', () => {
    const displayDays = getDisplayDaysForMonth('DayOfMonthAfterEOM');
    expect(displayDays[displayDays.length - 1].name).toEqual('Last day');
  });
});
