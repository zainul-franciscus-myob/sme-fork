
import { getTaxCodeOptions, getTaxDetails } from '../TaxAndKiwiSaverSelectors';

describe('TaxAndKiwiSaverSelectors', () => {
  it('should get Tax And KiwiSaver details', () => {
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
});
