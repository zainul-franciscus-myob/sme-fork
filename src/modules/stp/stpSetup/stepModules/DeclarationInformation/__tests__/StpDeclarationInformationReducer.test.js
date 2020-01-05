import { LOAD_BUSINESS_CONTACT_INFORMATION } from '../StpDeclarationInformationIntents';
import loadBusinessContactInformation from '../mappings/data/loadBusinessContactInformation';
import stpDeclarationInformationReducer from '../stpDeclarationInformationReducer';

describe('StpDeclarationInformationReduce', () => {
  describe('LOAD_BUSINESS_CONTACT_INFORMATION', () => {
    it('loads ABN and contact information into state', () => {
      const state = {};
      const action = {
        intent: LOAD_BUSINESS_CONTACT_INFORMATION,
        businessContactInformation: loadBusinessContactInformation,
      };

      const resultingState = stpDeclarationInformationReducer(state, action);

      expect(resultingState).toEqual({
        businessContactInformationWasFound: true,
        payerAbn: '12345678900',
        firstName: 'Geralt',
        lastName: 'Rivia',
        phone: '1800 WITCHER',
        email: 'geralt.of.rivia@example.com',
      });
    });
  });
});
