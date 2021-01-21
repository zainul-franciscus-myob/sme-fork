import { getTabItems, tabIds } from '../TabItems';

describe('TabItems', () => {
  describe('getTabItems', () => {
    it('should get all tabs when feature toggles are on', () => {
      const featureToggles = {
        isJobKeeperTabEnabled: true,
        isJobKeeperCalculatorEnabled: true,
        isJobMakerTabEnabled: true,
      };
      const expectedTabs = [
        { id: tabIds.reports, label: 'STP reports' },
        { id: tabIds.terminations, label: 'Employee terminations' },
        { id: tabIds.finalisation, label: 'EOFY finalisation' },
        { id: tabIds.atoSettings, label: 'ATO settings' },
        { id: tabIds.jobKeeper, label: 'JobKeeper payments' },
        { id: tabIds.gstCalculator, label: 'JobKeeper eligibility' },
        { id: tabIds.jobMaker, label: 'JobMaker' },
      ];

      const result = getTabItems(featureToggles);

      expect(result).toEqual(expectedTabs);
    });
  });
});
