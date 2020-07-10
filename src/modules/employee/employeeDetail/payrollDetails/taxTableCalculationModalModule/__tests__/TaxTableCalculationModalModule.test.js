import { Modal } from '@myob/myob-widgets';
import { mount } from 'enzyme';

import { LOAD_TAX_TABLE_RESULT } from '../taxTableCalculationModalIntents';
import {
  findButtonWithTestId,
  findComponentWithTestId,
} from '../../../../../../common/tests/selectors';
import TaxTableCalculationModalModule from '../TaxTableCalculationModalModule';
import loadTaxTableResult from '../mappings/data/loadTaxTableResult';

describe('TaxTableCalculationModalModule', () => {
  const defaultIntegration = {
    read: ({ onSuccess }) => onSuccess(loadTaxTableResult),
  };
  const constructModule = (integration = {}) =>
    new TaxTableCalculationModalModule({
      integration: {
        ...defaultIntegration,
        ...integration,
      },
    });

  describe('open', () => {
    it('render returns null if not open', () => {
      const taxTableModalModule = constructModule();
      const view = mount(taxTableModalModule.render());

      expect(view.find(Modal)).toHaveLength(0);
    });

    it('render returns a modal if open', () => {
      const taxTableModalModule = constructModule();

      taxTableModalModule.open();

      const view = mount(taxTableModalModule.render());
      expect(view.find(Modal)).toHaveLength(1);
    });

    it('calls the onSave function on save button click', () => {
      const taxTableModalModule = constructModule({});
      const onSave = jest.fn();
      taxTableModalModule.open({}, onSave);
      const view = mount(taxTableModalModule.render());
      const saveButton = findButtonWithTestId(view, 'saveButton');

      saveButton.simulate('click');

      expect(onSave).toHaveBeenCalledWith({
        withholdingVariation: null,
        taxTableId: '2',
      });
    });
  });

  describe('fetching information', () => {
    it('queries for tax table result when fields are changed', () => {
      const integration = {
        read: jest.fn(({ onSuccess }) => onSuccess({})),
      };
      const taxTableModalModule = constructModule(integration);
      taxTableModalModule.open();
      const view = mount(taxTableModalModule.render());
      const taxFreeThresholdField = view.findWhere(
        (c) => c.prop('testid') === 'hasTaxFreeThreshold'
      );

      taxFreeThresholdField.prop('onChange')({
        target: { name: 'taxFreeThreshold', checked: true },
      });

      expect(integration.read).toHaveBeenCalledWith(
        expect.objectContaining({
          intent: LOAD_TAX_TABLE_RESULT,
        })
      );
    });

    it('renders the resulting tax table if single tax table found', () => {
      const integration = {
        read: ({ onSuccess }) =>
          onSuccess({
            singleTaxTableFound: true,
            id: 1,
            description: 'No Tax Free Threshold',
          }),
      };
      const taxTableModalModule = constructModule(integration);
      taxTableModalModule.open();
      const view = mount(taxTableModalModule.render());

      taxTableModalModule.fetchTaxTable();
      view.update();

      const resultingTaxTable = findComponentWithTestId(
        view,
        'taxTableResult',
        'Input'
      );
      expect(resultingTaxTable).toHaveLength(1);
      expect(resultingTaxTable.prop('value')).toEqual('No Tax Free Threshold');
    });

    it('renders the danger alert if it could not narrow to a single tax table', () => {
      const integration = {
        read: ({ onSuccess }) =>
          onSuccess({
            singleTaxTableFound: false,
          }),
      };
      const taxTableModalModule = constructModule(integration);
      taxTableModalModule.open();
      const view = mount(taxTableModalModule.render());

      taxTableModalModule.fetchTaxTable();
      view.update();

      const noTaxTableAlert = findComponentWithTestId(
        view,
        'noTaxTableAlert',
        'Alert'
      );
      expect(noTaxTableAlert).toHaveLength(1);
      expect(noTaxTableAlert.prop('type')).toEqual('danger');
      expect(noTaxTableAlert.text()).toContain(
        'From your answers, no relevant tax table could be selected'
      );
    });
  });
});
