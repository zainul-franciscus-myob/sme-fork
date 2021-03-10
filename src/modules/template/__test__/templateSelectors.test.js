import { HeaderBusinessDetailStyle } from '../templateOptions';
import {
  getBusinessDetailsOptions,
  getBusinessDetailsOptionsForDisplay,
  getSavePayload,
  getShouldShowTaxCodeAndAmount,
} from '../templateSelectors';

describe('templateSelectors', () => {
  it('getSavePayload', () => {
    const state = {
      businessDetails: {
        tradingName: 'tradingName',
        businessName: 'businessName',
        address: 'address',
        phoneNumber: 'phoneNumber',
        email: 'email',
        website: 'website',
        abn: 'abn',
        gstNumber: 'gstNumber',
      },
      template: {
        templateName: 'foo',
        featureColour: '#FFF',
        headerTextColour: '#000',
        useAddressEnvelopePosition: true,
        headerBusinessDetailsStyle:
          HeaderBusinessDetailStyle.logoAndBusinessDetails,
        logoSize: 30,
        isLogoOnTheLeft: 'Left',
        isDefault: false,
        tradingName: true,
        address: true,
        businessName: false,
        phoneNumber: false,
        email: false,
        website: false,
        abn: false,
        gstNumber: false,
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
  describe('getBusinessDetailsOptions', () => {
    it('should build hash map for AU', () => {
      const state = {
        region: 'au',
        businessDetails: {
          tradingName: 'tradingName',
          businessName: 'businessName',
          address: 'address',
          phoneNumber: 'phoneNumber',
          email: 'email',
          website: 'website',
          abn: 'abn',
          gstNumber: 'gstNumber',
        },
        template: {
          tradingName: true,
          address: true,
          businessName: false,
          phoneNumber: false,
          email: false,
          website: false,
          abn: false,
          gstNumber: false,
        },
      };

      const actual = getBusinessDetailsOptions(state);
      const expected = {
        abn: {
          checked: false,
          label: 'ABN',
          value: 'abn',
        },
        address: {
          checked: true,
          label: 'Street address',
          value: 'address',
        },
        businessName: {
          checked: false,
          label: 'Business name',
          value: 'businessName',
        },
        email: {
          checked: false,
          label: 'Email',
          value: 'email',
        },
        phoneNumber: {
          checked: false,
          label: 'Phone number',
          value: 'phoneNumber',
        },
        tradingName: {
          checked: true,
          label: 'Trading name',
          value: 'tradingName',
        },
        website: {
          checked: false,
          label: 'Website',
          value: 'website',
        },
      };

      expect(actual).toEqual(expected);
    });

    it('should build hash map for Nz', () => {
      const state = {
        region: 'nz',
        businessDetails: {
          tradingName: 'tradingName',
          businessName: 'businessName',
          address: 'address',
          phoneNumber: 'phoneNumber',
          email: 'email',
          website: 'website',
          abn: 'abn',
          gstNumber: 'gstNumber',
        },
        template: {
          tradingName: true,
          address: true,
          businessName: false,
          phoneNumber: false,
          email: false,
          website: false,
          abn: false,
          gstNumber: false,
        },
      };

      const actual = getBusinessDetailsOptions(state);
      const expected = {
        address: {
          checked: true,
          label: 'Street address',
          value: 'address',
        },
        businessName: {
          checked: false,
          label: 'Business name',
          value: 'businessName',
        },
        email: {
          checked: false,
          label: 'Email',
          value: 'email',
        },
        phoneNumber: {
          checked: false,
          label: 'Phone number',
          value: 'phoneNumber',
        },
        tradingName: {
          checked: true,
          label: 'Trading name',
          value: 'tradingName',
        },
        website: {
          checked: false,
          label: 'Website',
          value: 'website',
        },
        gstNumber: {
          checked: false,
          label: 'GST number',
          value: 'gstNumber',
        },
      };

      expect(actual).toEqual(expected);
    });
  });
  describe('getBusinessDetailsOptionsForDisplay', () => {
    it('should return business details when checked for Au', () => {
      const state = {
        region: 'au',
        businessDetails: {
          tradingName: 'tradingName',
          businessName: 'businessName',
          address: 'address',
          phoneNumber: 'phoneNumber',
          email: 'email',
          website: 'website',
          abn: 'abn',
          gstNumber: 'gstNumber',
        },
        template: {
          tradingName: false,
          address: false,
          businessName: false,
          phoneNumber: false,
          email: false,
          website: false,
          abn: true,
          gstNumber: true,
        },
      };

      const actual = getBusinessDetailsOptionsForDisplay(state);
      const expected = {
        abn: 'abn',
        streetAddress: false,
        businessName: false,
        email: false,
        phoneNumber: false,
        tradingName: false,
        website: false,
      };

      expect(actual).toEqual(expected);
    });

    it('should return business details when checked for Nz', () => {
      const state = {
        region: 'nz',
        businessDetails: {
          tradingName: 'tradingName',
          businessName: 'businessName',
          address: 'address',
          phoneNumber: 'phoneNumber',
          email: 'email',
          website: 'website',
          abn: 'abn',
          gstNumber: 'gstNumber',
        },
        template: {
          tradingName: false,
          address: false,
          businessName: false,
          phoneNumber: false,
          email: false,
          website: false,
          abn: true,
          gstNumber: true,
        },
      };

      const actual = getBusinessDetailsOptionsForDisplay(state);
      const expected = {
        streetAddress: false,
        businessName: false,
        email: false,
        phoneNumber: false,
        tradingName: false,
        website: false,
        gstNumber: 'gstNumber',
      };

      expect(actual).toEqual(expected);
    });
  });
  describe('getShouldShowTaxCodeAndAmount', () => {
    it('should be true when toggle is off', () => {
      const state = {
        gstSettings: {
          reportingFrequency: 'NotRegistered',
        },
        isCustomizedForNonGstEnabled: false,
      };

      const actual = getShouldShowTaxCodeAndAmount(state);
      expect(actual).toEqual(true);
    });

    it('should be false when toggle is on and NotRegistered', () => {
      const state = {
        gstSettings: {
          reportingFrequency: 'NotRegistered',
        },
        isCustomizedForNonGstEnabled: true,
      };

      const actual = getShouldShowTaxCodeAndAmount(state);
      expect(actual).toEqual(false);
    });

    it('should be true when toggle is on and Registered', () => {
      const state = {
        gstSettings: {
          reportingFrequency: 'Monthly',
        },
        isCustomizedForNonGstEnabled: true,
      };

      const actual = getShouldShowTaxCodeAndAmount(state);
      expect(actual).toEqual(true);
    });
  });
});
