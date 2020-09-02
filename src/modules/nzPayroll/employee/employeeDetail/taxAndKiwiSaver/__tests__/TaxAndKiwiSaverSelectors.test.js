import {
  getEmployeeContributionOptions,
  getKiwiSaver,
  getKiwiSaverStatusOptions,
  getTaxCodeOptions,
  getTaxDetails,
} from '../TaxAndKiwiSaverSelectors';

describe('TaxAndKiwiSaverSelectors', () => {
  it('should get Tax details', () => {
    const tax = { some: 'value' };
    const state = { payrollDetails: { tax } };

    const actual = getTaxDetails(state);

    expect(actual).toMatchObject(tax);
  });

  it('should get TaxCode Options details', () => {
    const taxCodeOptions = { some: 'value' };
    const state = { taxCodeOptions };

    const actual = getTaxCodeOptions(state);

    expect(actual).toMatchObject(taxCodeOptions);
  });

  it('should get KiwiSaver details', () => {
    const kiwiSaver = { some: 'value' };
    const state = { payrollDetails: { kiwiSaver } };

    const actual = getKiwiSaver(state);

    expect(actual).toMatchObject(kiwiSaver);
  });

  it('should get KiwiSaver Status options', () => {
    const kiwiSaverStatusOptions = { key: 'active', value: 'Active Member' };
    const state = { kiwiSaverStatusOptions };

    const actual = getKiwiSaverStatusOptions(state);

    expect(actual).toMatchObject(kiwiSaverStatusOptions);
  });

  it('should get Employee Contribution Options', () => {
    const kiwiSaverEmployeeContributionOptions = {
      key: 'someKey',
      value: 'some-value',
    };
    const state = { kiwiSaverEmployeeContributionOptions };

    const actual = getEmployeeContributionOptions(state);

    expect(actual).toMatchObject(kiwiSaverEmployeeContributionOptions);
  });
});
