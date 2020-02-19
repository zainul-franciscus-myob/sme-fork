import { Provider } from 'react-redux';
import React from 'react';

import { getOnSaveContent } from './taxTableCalculationModalSelectors';
import Store from '../../../../../store/Store';
import TaxTableCalculationModal from './components/TaxTableCalculationModal';
import createTaxTableCalculationModalDispatcher from './createTaxTableCalculationModalDispatcher';
import createTaxTableCalculationModalIntegrator from './createTaxTableCalculationModalIntegrator';
import taxTableCalculationModalReducer from './taxTableCalculationModalReducer';

export default class TaxTableCalculationModalModule {
  constructor({ integration }) {
    this.store = new Store(taxTableCalculationModalReducer);
    this.dispatcher = createTaxTableCalculationModalDispatcher(this.store);
    this.integrator = createTaxTableCalculationModalIntegrator(this.store, integration);
    this.onSave = () => {};
  }

  onFieldChange = ({ key, value }) => {
    this.dispatcher.updateFormField({ key, value });
    this.fetchTaxTable();
  }

  onWithholdingVariationBlur = ({ value }) => {
    this.dispatcher.formatWithholdingVariationField(value);
  }

  fetchTaxTable = () => {
    this.dispatcher.setIsLoading(true);

    const onSuccess = (taxTableResult) => {
      this.dispatcher.setIsLoading(false);
      this.dispatcher.setTaxTableResult(taxTableResult);
    };

    const onFailure = () => {
      this.dispatcher.setIsLoading(false);
    };

    this.integrator.fetchTaxTableResult({
      onSuccess,
      onFailure,
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <TaxTableCalculationModal
          onCancel={this.close}
          onSave={this.save}
          onFieldChange={this.onFieldChange}
          onWithholdingVariationBlur={this.onWithholdingVariationBlur}
        />
      </Provider>
    );
  }

  open = (context, onSave) => {
    this.dispatcher.loadContext(context);
    this.fetchTaxTable();
    this.dispatcher.setIsOpen(true);
    this.onSave = onSave;
  }

  close = () => {
    this.dispatcher.setIsOpen(false);
    this.onSave = null;
  }

  save = () => {
    const state = this.store.getState();
    this.onSave(getOnSaveContent(state));
    this.close();
  }
}
