import { getShowEtpAlert } from '../WagePayItemModalSelectors';

describe('getShowEtpAlert', () => {
  it('should not show etp alert if new pay item', () => {
    const state = {
      wagePayItemModal: {
        wage: {
          payItemId: 'new',
          atoReportingCategory: '',
        },
        originalWageValues: {
          atoReportingCategory: '',
        },
      },
    };

    const result = getShowEtpAlert(state);

    expect(result).toEqual(false);
  });

  it('should not show etp alert if category not changed', () => {
    const state = {
      wagePayItemModal: {
        wage: {
          payItemId: '1',
          atoReportingCategory: 'ETPTaxableComponent',
        },
        originalWageValues: {
          atoReportingCategory: 'ETPTaxableComponent',
        },
      },
    };

    const result = getShowEtpAlert(state);

    expect(result).toEqual(false);
  });

  it('should show etp alert if update original/assigned pay item to ETP category', () => {
    const state = {
      wagePayItemModal: {
        wage: {
          payItemId: '1',
          atoReportingCategory: 'ETPTaxableComponent',
        },
        originalWageValues: {
          atoReportingCategory: 'NotReportable',
        },
      },
    };

    const result = getShowEtpAlert(state);

    expect(result).toEqual(true);
  });

  it('should show etp alert if update original/assigned pay item to another ETP category', () => {
    const state = {
      wagePayItemModal: {
        wage: {
          payItemId: '1',
          atoReportingCategory: 'ETPTaxableComponent',
        },
        originalWageValues: {
          atoReportingCategory: 'ETPTaxFreeComponent',
        },
      },
    };

    const result = getShowEtpAlert(state);

    expect(result).toEqual(true);
  });

  it('should not show etp alert if update original/assigned pay item to non-ETP category', () => {
    const state = {
      wagePayItemModal: {
        wage: {
          payItemId: '1',
          atoReportingCategory: 'NotReportable',
        },
        originalWageValues: {
          atoReportingCategory: 'ETPTaxFreeComponent',
        },
      },
    };

    const result = getShowEtpAlert(state);

    expect(result).toEqual(false);
  });

  it('should not show etp alert if update un-assigned pay item to ETP category', () => {
    const state = {
      wagePayItemModal: {
        wage: {
          payItemId: '1',
          atoReportingCategory: 'ETPTaxFreeComponent',
        },
        originalWageValues: {
          atoReportingCategory: 'NotSet',
        },
      },
    };

    const result = getShowEtpAlert(state);

    expect(result).toEqual(false);
  });
});
