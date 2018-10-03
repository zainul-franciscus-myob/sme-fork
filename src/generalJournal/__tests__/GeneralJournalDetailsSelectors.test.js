import { getHeaderOptions } from '../GeneralJournalDetailSelectors';
import generalJournalDetail from './fixtures/generalJournalDetail';

describe('GeneralJournalDetailSelectors', () => {
  describe('getHeaderOptions', () => {
    it('returns header options object', () => {
      expect(getHeaderOptions(generalJournalDetail)).toEqual({
        referenceId: 'JE0000002',
        date: '1533045600000',
        gstReportingMethod: 'purchase',
        isEndOfYearAdjustment: false,
        isTaxInclusive: true,
        description: 'Cry havoc',
      });
    });
  });
});
