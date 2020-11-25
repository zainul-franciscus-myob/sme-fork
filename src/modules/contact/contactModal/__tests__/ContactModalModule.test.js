import {
  COPY_CONTACT_MODAL_BILLING_ADDRESS,
  TOGGLE_SHIPPING_ADDRESS_EDITING,
} from '../../ContactIntents';
import ContactModalModule from '../ContactModalModule';
import TestIntegration from '../../../../integration/TestIntegration';
import TestStore from '../../../../store/TestStore';
import contactModalReducer from '../contactModalReducer';
import createContactModalDispatcher from '../createContactModalDispatcher';
import createContactModalIntegrator from '../createContactModalIntegrator';

function setUp() {
  const testIntegration = new TestIntegration();
  const testStore = new TestStore(contactModalReducer);
  const contactModalModule = new ContactModalModule({
    integration: testIntegration,
    featureToggles: {},
  });
  contactModalModule.store = testStore;
  contactModalModule.dispatcher = createContactModalDispatcher(testStore);
  contactModalModule.integrator = createContactModalIntegrator(
    testStore,
    testIntegration
  );

  return { contactModalModule, testStore };
}

describe('ContactModalModule', () => {
  describe('toggleShippingAddress', () => {
    it('should copy the billing address to shipping address', () => {
      const { contactModalModule, testStore } = setUp();

      contactModalModule.toggleShippingAddress({ value: true });

      expect(testStore.getActions()).toEqual([
        { intent: COPY_CONTACT_MODAL_BILLING_ADDRESS },
        expect.objectContaining({ intent: TOGGLE_SHIPPING_ADDRESS_EDITING }),
      ]);
    });

    it('should not copy the billing address to shipping address', () => {
      const { contactModalModule, testStore } = setUp();

      contactModalModule.toggleShippingAddress({ value: false });

      expect(testStore.getActions()).toEqual([
        expect.objectContaining({ intent: TOGGLE_SHIPPING_ADDRESS_EDITING }),
      ]);
    });
  });
});
