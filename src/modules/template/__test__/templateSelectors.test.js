import { HeaderBusinessDetailStyle } from '../templateOptions';
import { getSavePayload } from '../templateSelectors';

describe('templateSelectors', () => {
  it('getSavePayload', () => {
    const state = {
      template: {
        templateName: 'foo',
        featureColour: '#FFF',
        headerTextColour: '#000',
        useAddressEnvelopePosition: true,
        headerBusinessDetailsStyle: HeaderBusinessDetailStyle.logoAndBusinessDetails,
        logoSize: 30,
        isLogoOnTheLeft: 'Left',
        isDefault: false,
        tradingName: true,
        address: true,
      },
    };

    const actual = getSavePayload(state);
    const expected = {
      businessDetailsOptions: 'TradingName,StreetAddress',
      featureColour: '#FFF',
      headerBusinessDetailsStyle: 'LogoAndBusinessDetails',
      headerTextColour: '#000',
      logoPlacementLeft: 'true',
      logoSize: 30,
      setAsDefault: 'false',
      templateName: 'foo',
      useAddressEnvelopePosition: 'true',
    };

    expect(actual).toEqual(expected);
  });
});
