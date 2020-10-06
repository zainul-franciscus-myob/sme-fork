const { shouldRenderJobKeeperAlert } = require('../EmployeePayTable');

describe('shouldRenderJobKeeperAlert', () => {
  const featureToggles = {
    isJobKeeperTierVisualCueEnabled: true,
  };
  describe('when feature switch is off', () => {
    featureToggles.isJobKeeperTierVisualCueEnabled = false;
    it.only('should return false', () => {
      expect(shouldRenderJobKeeperAlert(featureToggles)).toBe(false);
    });
  });
  describe('when feature switch is on', () => {
    let jobKeeperPayItem = {};
    beforeEach(() => {
      featureToggles.isJobKeeperTierVisualCueEnabled = true;
      jobKeeperPayItem = {
        payItemName: 'JOBKEEPER-TOPUP',
        type: 'SalaryWage',
        stpCategory: 'AllowanceOther',
      };
    });

    it.only('should return false when line is empty', () => {
      expect(shouldRenderJobKeeperAlert(featureToggles)).toBe(false);
    });
    it.only('should return false when tier is na', () => {
      const line = {
        tier: 'na',
      };
      expect(shouldRenderJobKeeperAlert(featureToggles, line)).toBe(false);
    });
    it.only('should return false when tier is null and there is no pay correct job Keeper pay items', () => {
      const fakeKobKeeperPayItem = {
        ...jobKeeperPayItem,
        type: 'FakeSalaryWage',
      };
      const line = {
        tier: null,
        payItems: [fakeKobKeeperPayItem],
      };
      expect(shouldRenderJobKeeperAlert(featureToggles, line)).toBe(false);
    });
    it.only('should return true when tier is 01 or 02', () => {
      const line = {
        tier: '01',
      };
      expect(shouldRenderJobKeeperAlert(featureToggles, line)).toBe(true);
      line.tier = '02';
      expect(shouldRenderJobKeeperAlert(featureToggles, line)).toBe(true);
    });
    it.only('should return true when tier is null and there is correct job keeper pay item', () => {
      const line = {
        tier: null,
        payItems: [jobKeeperPayItem],
      };
      expect(shouldRenderJobKeeperAlert(featureToggles, line)).toBe(true);
    });
  });
});
