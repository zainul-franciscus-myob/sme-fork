import Periods from '../Periods';
import getDateRangeByPeriodAndLastMonthInFY from '../getDateRangeByPeriodAndLastMonthInFY';

describe('getDateRangeByPeriodAndLastMonthInFY', () => {
  const auTestData = {
    lastMonthInFinancialYear: 6,
    FYStartDate: '2019-07-01',
    FYEndDate: '2020-06-30',
    LastFYStartDate: '2018-07-01',
    LastFYEndDate: '2019-06-30',
    Q1StartDate: '2019-07-01',
    Q1EndDate: '2019-09-30',
    Q2StartDate: '2019-10-01',
    Q2EndDate: '2019-12-31',
    Q3StartDate: '2020-01-01',
    Q3EndDate: '2020-03-31',
    Q4StartDate: '2020-04-01',
    Q4EndDate: '2020-06-30',
    dateInQ1: '2019-07-01',
    dateInQ2: '2019-12-31',
    dateInQ3: '2020-03-04',
    dateInQ4: '2020-06-07',
    dateInQ1NextFY: '2020-07-01',
  };

  describe('not dependent on lastMonthInFinancialYear', () => {
    describe(Periods.lastMonth, () => {
      describe('dateFrom', () => {
        it('should be start of last month', () => {
          const lastMonth = getDateRangeByPeriodAndLastMonthInFY(
            undefined,
            new Date('2019-01-28'),
            Periods.lastMonth
          );
          expect(lastMonth.dateFrom).toBe('2018-12-01');
        });
      });

      describe('dateTo', () => {
        it('should be end of last month', () => {
          const lastMonth = getDateRangeByPeriodAndLastMonthInFY(
            undefined,
            new Date('2019-01-28'),
            Periods.lastMonth
          );
          expect(lastMonth.dateTo).toBe('2018-12-31');
        });
      });
    });

    describe(Periods.lastThreeMonths, () => {
      describe('dateFrom', () => {
        it('should be exactly three months before date', () => {
          const lastThreeMonths = getDateRangeByPeriodAndLastMonthInFY(
            undefined,
            new Date('2020-02-28'),
            Periods.lastThreeMonths
          );
          expect(lastThreeMonths.dateFrom).toBe('2019-11-28');
        });
      });

      describe('dateTo', () => {
        it('should be the current date', () => {
          const lastThreeMonths = getDateRangeByPeriodAndLastMonthInFY(
            undefined,
            new Date('2020-04-28'),
            Periods.lastThreeMonths
          );
          expect(lastThreeMonths.dateTo).toBe('2020-04-28');
        });
      });
    });
  });

  describe('defaults to AU financial year if lastMonthInFinancialYear undefined', () => {
    const {
      FYStartDate,
      Q1StartDate,
      Q4StartDate,
      dateInQ1,
      dateInQ1NextFY,
    } = auTestData;

    it.each([
      [Periods.thisFinancialYear, dateInQ1, FYStartDate],
      [Periods.lastFinancialYear, dateInQ1NextFY, FYStartDate],
      [Periods.thisFinancialQuarter, dateInQ1, Q1StartDate],
      [Periods.lastFinancialQuarter, dateInQ1NextFY, Q4StartDate],
    ])('%s', (period, date, periodStartDate) => {
      const dateRange = getDateRangeByPeriodAndLastMonthInFY(
        undefined,
        new Date(date),
        period
      );

      expect(dateRange.dateFrom).toBe(periodStartDate);
    });
  });

  describe('dependent on lastMonthInFinancialYear', () => {
    const {
      lastMonthInFinancialYear,
      FYStartDate,
      FYEndDate,
      LastFYStartDate,
      LastFYEndDate,
      Q1StartDate,
      Q1EndDate,
      Q2StartDate,
      Q2EndDate,
      Q3StartDate,
      Q3EndDate,
      Q4StartDate,
      Q4EndDate,
      dateInQ1,
      dateInQ2,
      dateInQ3,
      dateInQ4,
      dateInQ1NextFY,
    } = auTestData;

    describe(Periods.thisFinancialQuarter, () => {
      it.each([
        ['Q1', dateInQ1, Q1StartDate],
        ['Q2', dateInQ2, Q2StartDate],
        ['Q3', dateInQ3, Q3StartDate],
        ['Q4', dateInQ4, Q4StartDate],
      ])(
        'dateFrom should be start of quarter if date in %s',
        (_, date, quarterStartDate) => {
          const thisFinancialQuarter = getDateRangeByPeriodAndLastMonthInFY(
            lastMonthInFinancialYear,
            new Date(date),
            Periods.thisFinancialQuarter
          );

          expect(thisFinancialQuarter.dateFrom).toBe(quarterStartDate);
        }
      );

      it.each([
        ['Q1', dateInQ1, Q1EndDate],
        ['Q2', dateInQ2, Q2EndDate],
        ['Q3', dateInQ3, Q3EndDate],
        ['Q4', dateInQ4, Q4EndDate],
      ])(
        'dateTo should be end of quarter if date in %s',
        (_, date, quarterEndDate) => {
          const thisFinancialQuarter = getDateRangeByPeriodAndLastMonthInFY(
            lastMonthInFinancialYear,
            new Date(date),
            Periods.thisFinancialQuarter
          );

          expect(thisFinancialQuarter.dateTo).toBe(quarterEndDate);
        }
      );
    });

    describe(Periods.lastFinancialQuarter, () => {
      it.each([
        ['Q1', dateInQ1NextFY, Q4StartDate],
        ['Q2', dateInQ2, Q1StartDate],
        ['Q3', dateInQ3, Q2StartDate],
        ['Q4', dateInQ4, Q3StartDate],
      ])(
        'dateFrom should be start of last quarter if date in %s',
        (_, date, quarterStartDate) => {
          const lastFinancialQuarter = getDateRangeByPeriodAndLastMonthInFY(
            lastMonthInFinancialYear,
            new Date(date),
            Periods.lastFinancialQuarter
          );

          expect(lastFinancialQuarter.dateFrom).toBe(quarterStartDate);
        }
      );

      it.each([
        ['Q1', dateInQ1NextFY, Q4EndDate],
        ['Q2', dateInQ2, Q1EndDate],
        ['Q3', dateInQ3, Q2EndDate],
        ['Q4', dateInQ4, Q3EndDate],
      ])(
        'dateTo should be end of last quarter if date in %s',
        (_, date, quarterEndDate) => {
          const lastFinancialQuarter = getDateRangeByPeriodAndLastMonthInFY(
            lastMonthInFinancialYear,
            new Date(date),
            Periods.lastFinancialQuarter
          );

          expect(lastFinancialQuarter.dateTo).toBe(quarterEndDate);
        }
      );
    });

    describe(Periods.thisFinancialYear, () => {
      it.each([
        ['Q1', dateInQ1],
        ['Q2', dateInQ2],
        ['Q3', dateInQ3],
        ['Q4', dateInQ4],
      ])('dateFrom should be start of FY if date in %s', (_, date) => {
        const thisFinancialYear = getDateRangeByPeriodAndLastMonthInFY(
          lastMonthInFinancialYear,
          new Date(date),
          Periods.thisFinancialYear
        );

        expect(thisFinancialYear.dateFrom).toBe(FYStartDate);
      });

      it.each([
        ['Q1', dateInQ1],
        ['Q2', dateInQ2],
        ['Q3', dateInQ3],
        ['Q4', dateInQ4],
      ])('dateTo should be end of FY if date in %s', (_, date) => {
        const thisFinancialYear = getDateRangeByPeriodAndLastMonthInFY(
          lastMonthInFinancialYear,
          new Date(date),
          Periods.thisFinancialYear
        );

        expect(thisFinancialYear.dateTo).toBe(FYEndDate);
      });
    });

    describe(Periods.lastFinancialYear, () => {
      describe('if date before first month in FY', () => {
        it('dateFrom should be in previous calendar year if FY ends in month 12', () => {
          const customLastMonthInFY = 12;
          const customDateInQ4 = '2020-11-01';
          const customLastFYStartDate = '2019-01-01';

          const lastFinancialYear = getDateRangeByPeriodAndLastMonthInFY(
            customLastMonthInFY,
            new Date(customDateInQ4),
            Periods.lastFinancialYear
          );

          expect(lastFinancialYear.dateFrom).toBe(customLastFYStartDate);
        });

        it('dateFrom should be in previous to previous calendar year if FYStartDate is in different calendar year than FYEndDate', () => {
          const lastFinancialYear = getDateRangeByPeriodAndLastMonthInFY(
            lastMonthInFinancialYear,
            new Date(dateInQ4),
            Periods.lastFinancialYear
          );

          expect(lastFinancialYear.dateFrom).toBe(LastFYStartDate);
        });

        it('dateTo should be end of last FY', () => {
          const lastFinancialYear = getDateRangeByPeriodAndLastMonthInFY(
            lastMonthInFinancialYear,
            new Date(dateInQ4),
            Periods.lastFinancialYear
          );

          expect(lastFinancialYear.dateTo).toBe(LastFYEndDate);
        });
      });

      describe('if date after last month in FY', () => {
        it('dateFrom should be start of last FY ', () => {
          const lastFinancialYear = getDateRangeByPeriodAndLastMonthInFY(
            lastMonthInFinancialYear,
            new Date(dateInQ1NextFY),
            Periods.lastFinancialYear
          );

          expect(lastFinancialYear.dateFrom).toBe(FYStartDate);
        });

        it('dateTo should be end of last FY', () => {
          const lastFinancialYear = getDateRangeByPeriodAndLastMonthInFY(
            lastMonthInFinancialYear,
            new Date(dateInQ1NextFY),
            Periods.lastFinancialYear
          );

          expect(lastFinancialYear.dateTo).toBe(FYEndDate);
        });
      });
    });
  });
});
