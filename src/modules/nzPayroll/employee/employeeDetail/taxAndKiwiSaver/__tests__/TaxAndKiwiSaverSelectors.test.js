
import { getTaxAndKiwiSaver, getTaxCodeOptions } from '../TaxAndKiwiSaverSelectors';

describe('TaxAndKiwiSaverSelectors', () => {
  it('should get Tax And KiwiSaver details', () => {
    const taxAndKiwiSaver = { some: 'value' };
    const state = { payrollDetails: { taxAndKiwiSaver } };

    const actual = getTaxAndKiwiSaver(state);

    expect(actual).toMatchObject(taxAndKiwiSaver);
  });

  it('should get TaxCode Options details', () => {
    const taxCodeOptions = { some: 'value' };
    const state = { taxCodeOptions };

    const actual = getTaxCodeOptions(state);

    expect(actual).toMatchObject(taxCodeOptions);
  });
});
