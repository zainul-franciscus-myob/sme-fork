import Periods from '../Periods';
import getDateRangeByPeriodAndRegion from '../getDateRangeByPeriodAndRegion';

describe('getDateRangeByPeriodAndRegion', () => {
  describe('au', () => {
    const getPeriodOptionByIdAu = date => period => getDateRangeByPeriodAndRegion('au', date, period);
    describe('This financial quarter period', () => {
      describe('dateFrom', () => {
        it('should be start of Jan if between Jan and Mar', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-03-04'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateFrom).toBe('2019-01-01');
        });
        it('should be start of Apr if between Apr and Jun', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-06-07'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateFrom).toBe('2019-04-01');
        });
        it('should be start of Jul if between Jul and Sep', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-07-01'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateFrom).toBe('2019-07-01');
        });
        it('should be start of Oct if between Oct and Dec', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-12-31'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateFrom).toBe('2019-10-01');
        });
      });
      describe('dateTo', () => {
        it('should be end of Mar if between Jan and Mar', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-03-04'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateTo).toBe('2019-03-31');
        });
        it('should be end of Jun if between Apr and Jun', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-06-07'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateTo).toBe('2019-06-30');
        });
        it('should be end of Sep if between Jul and Sep', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-07-01'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateTo).toBe('2019-09-30');
        });
        it('should be end of Dec if between Oct and Dec', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-12-31'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateTo).toBe('2019-12-31');
        });
      });
    });
    describe('This financial year period', () => {
      describe('dateFrom', () => {
        it('should be Jul 1 of current year if after Jun', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-07-04'));

          const thisFinancialYear = getPeriodOptionsById(Periods.thisFinancialYear);
          expect(thisFinancialYear.dateFrom).toBe('2019-07-01');
        });
        it('should be Jul 1 of last year if before July', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-03-04'));

          const thisFinancialYear = getPeriodOptionsById(Periods.thisFinancialYear);
          expect(thisFinancialYear.dateFrom).toBe('2018-07-01');
        });
      });
      describe('dateTo', () => {
        it('should be June 30 of this year if before July', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-03-04'));

          const thisFinancialYear = getPeriodOptionsById(Periods.thisFinancialYear);
          expect(thisFinancialYear.dateTo).toBe('2019-06-30');
        });
        it('should be June 30 of next year if after June', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-08-04'));

          const thisFinancialYear = getPeriodOptionsById(Periods.thisFinancialYear);
          expect(thisFinancialYear.dateTo).toBe('2020-06-30');
        });
      });
    });
    describe('Last financial quarter period', () => {
      describe('dateFrom', () => {
        it('should be start of Oct if between Jan and Mar', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-03-04'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateFrom).toBe('2019-10-01');
        });
        it('should be start of Jan if between Apr and Jun', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-06-07'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateFrom).toBe('2019-01-01');
        });
        it('should be start of Apr if between Jul and Sep', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-07-01'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateFrom).toBe('2019-04-01');
        });
        it('should be start of Jul if between Oct and Dec', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-12-31'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateFrom).toBe('2019-07-01');
        });
      });
      describe('dateTo', () => {
        it('should be end of Dec if between Jan and Mar', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-03-04'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateTo).toBe('2019-12-31');
        });
        it('should be end of Mar if between Apr and Jun', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-06-07'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateTo).toBe('2019-03-31');
        });
        it('should be end of Jun if between Jul and Sep', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-07-01'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateTo).toBe('2019-06-30');
        });
        it('should be end of Sep if between Oct and Dec', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-12-31'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateTo).toBe('2019-09-30');
        });
      });
    });
    describe('Last financial year period', () => {
      describe('dateFrom', () => {
        it('should be Jul 1 of previous year if before July', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-03-04'));

          const lastFinancialYear = getPeriodOptionsById(Periods.lastFinancialYear);
          expect(lastFinancialYear.dateFrom).toBe('2017-07-01');
        });
        it('should be Jul 1 of previous year if after Jun', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-07-02'));

          const lastFinancialYear = getPeriodOptionsById(Periods.lastFinancialYear);
          expect(lastFinancialYear.dateFrom).toBe('2018-07-01');
        });
      });
      describe('dateTo', () => {
        it('should be June 30 of previous year if before July', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-03-04'));

          const lastFinancialYear = getPeriodOptionsById(Periods.lastFinancialYear);
          expect(lastFinancialYear.dateTo).toBe('2018-06-30');
        });
        it('should be June 30 of this year if after Jun', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-07-02'));

          const lastFinancialYear = getPeriodOptionsById(Periods.lastFinancialYear);
          expect(lastFinancialYear.dateTo).toBe('2019-06-30');
        });
      });
    });
    describe('Last month', () => {
      describe('dateFrom', () => {
        it('should be Jan 1 if in Feb', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-02-28'));

          const lastMonth = getPeriodOptionsById(Periods.lastMonth);
          expect(lastMonth.dateFrom).toBe('2019-01-01');
        });
      });
      describe('dateTo', () => {
        it('should be Jan 31 if in Feb', () => {
          const getPeriodOptionsById = getPeriodOptionByIdAu(new Date('2019-02-28'));

          const lastMonth = getPeriodOptionsById(Periods.lastMonth);
          expect(lastMonth.dateTo).toBe('2019-01-31');
        });
      });
    });
  });
  describe('nz', () => {
    const getPeriodOptionByIdNz = date => period => getDateRangeByPeriodAndRegion('nz', date, period);
    describe('This financial quarter period', () => {
      describe('dateFrom', () => {
        it('should be start of Jan if between Jan and Mar', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-03-04'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateFrom).toBe('2019-01-01');
        });
        it('should be start of Apr if between Apr and Jun', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-06-07'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateFrom).toBe('2019-04-01');
        });
        it('should be start of Jul if between Jul and Sep', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-08-03'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateFrom).toBe('2019-07-01');
        });
        it('should be start of Oct if between Oct and Dec', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-12-31'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateFrom).toBe('2019-10-01');
        });
      });
      describe('dateTo', () => {
        it('should be end of Mar if between Jan and Mar', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-03-04'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateTo).toBe('2019-03-31');
        });
        it('should be end of Jun if between Apr and Jun', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-06-07'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateTo).toBe('2019-06-30');
        });
        it('should be end of Sep if between Jul and Sep', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-07-01'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateTo).toBe('2019-09-30');
        });
        it('should be end of Dec if between Oct and Dec', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-12-31'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialQuarter);
          expect(thisFinancialQuarter.dateTo).toBe('2019-12-31');
        });
      });
    });
    describe('This financial year period', () => {
      describe('dateFrom', () => {
        it('should be Apr 1 of current year if after Mar', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-05-04'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialYear);
          expect(thisFinancialQuarter.dateFrom).toBe('2019-04-01');
        });
        it('should be Apr 1 of last year if before Apr', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-02-04'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialYear);
          expect(thisFinancialQuarter.dateFrom).toBe('2018-04-01');
        });
      });
      describe('dateTo', () => {
        it('should be Mar 31 of next year if after Mar', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-08-04'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialYear);
          expect(thisFinancialQuarter.dateTo).toBe('2020-03-31');
        });
        it('should be Mar 31 of current year if after Mar', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-02-04'));

          const thisFinancialQuarter = getPeriodOptionsById(Periods.thisFinancialYear);
          expect(thisFinancialQuarter.dateTo).toBe('2019-03-31');
        });
      });
    });
    describe('Last financial quater period', () => {
      describe('dateFrom', () => {
        it('should be start of Oct if between Jan and Mar', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-03-04'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateFrom).toBe('2019-10-01');
        });
        it('should be start of Jan if between Apr and Jun', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-06-07'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateFrom).toBe('2019-01-01');
        });
        it('should be start of Apr if between Jul and Sep', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-07-01'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateFrom).toBe('2019-04-01');
        });
        it('should be start of Jul if between Oct and Dec', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-12-31'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateFrom).toBe('2019-07-01');
        });
      });
      describe('dateTo', () => {
        it('should be end of Dec if between Jan and Mar', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-03-04'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateTo).toBe('2019-12-31');
        });
        it('should be end of Mar if between Apr and Jun', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-06-07'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateTo).toBe('2019-03-31');
        });
        it('should be end of Jun if between Jul and Sep', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-07-01'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateTo).toBe('2019-06-30');
        });
        it('should be end of Sep if between Oct and Dec', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-12-31'));

          const lastFinancialQuarter = getPeriodOptionsById(Periods.lastFinancialQuarter);
          expect(lastFinancialQuarter.dateTo).toBe('2019-09-30');
        });
      });
    });
    describe('Last financial year period', () => {
      describe('dateFrom', () => {
        it('should be Apr 1 of previous year after March', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-04-04'));

          const lastFinancialYear = getPeriodOptionsById(Periods.lastFinancialYear);
          expect(lastFinancialYear.dateFrom).toBe('2018-04-01');
        });
        it('should be Apr 1 of previous year before April', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-01-04'));

          const lastFinancialYear = getPeriodOptionsById(Periods.lastFinancialYear);
          expect(lastFinancialYear.dateFrom).toBe('2017-04-01');
        });
      });
      describe('dateTo', () => {
        it('should be Mar 31 of this year after March', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-04-04'));

          const lastFinancialYear = getPeriodOptionsById(Periods.lastFinancialYear);
          expect(lastFinancialYear.dateTo).toBe('2019-03-31');
        });
        it('should be Mar 31 of this year before April', () => {
          const getPeriodOptionsById = getPeriodOptionByIdNz(new Date('2019-03-04'));

          const lastFinancialYear = getPeriodOptionsById(Periods.lastFinancialYear);
          expect(lastFinancialYear.dateTo).toBe('2018-03-31');
        });
      });
    });
  });
});
