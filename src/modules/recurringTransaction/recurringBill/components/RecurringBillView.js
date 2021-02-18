import { PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsAlertShown,
  getIsFeatureAvailable,
  getIsModalShown,
  getIsReadOnly,
  getIsSubmitting,
  getLoadingState,
  getRecurringBillLayout,
  getTitle,
} from '../selectors/RecurringBillSelectors';
import PageView from '../../../../components/PageView/PageView';
import PurchaseLayout from '../types/PurchaseLayout';
import RecurringBillActions from './RecurringBillActions';
import RecurringBillAlert from './RecurringBillAlert';
import RecurringBillItemAndServiceTable from './RecurringBillItemAndServiceTable';
import RecurringBillModal from './RecurringBillModal';
import RecurringBillOptions from './RecurringBillOptions';
import RecurringBillScheduleOptions from './RecurringBillScheduleOptions';
import RecurringBillServiceTable from './RecurringBillServiceTable';
import RecurringLineItemLayout from '../../components/RecurringLineItemLayout';
import RecurringLineItemLayoutOptions from '../../components/RecurringLineItemLayoutOptions';
import RecurringTemplate from '../../components/RecurringTemplate';
import WrongPageState from '../../../../components/WrongPageState/WrongPageState';

const RecurringBillView = ({
  accountModal,
  title,
  layout,
  loadingState,
  isModalShown,
  isSubmitting,
  isReadOnly,
  isFeatureAvailable,
  onDismissAlert,
  onUpdateScheduleOptions,
  onUpdateLayout,
  actionListeners,
  confirmModalListeners,
  optionListeners,
  serviceLayoutListeners,
  itemAndServiceLayoutListeners,
  renderContactCombobox,
  renderJobCombobox,
  renderItemCombobox,
}) => {
  if (!isFeatureAvailable) {
    return <WrongPageState />;
  }

  const alerts = <RecurringBillAlert onDismissAlert={onDismissAlert} />;

  const pageHead = <PageHead title={title} />;

  const modals = (
    <>
      {accountModal}
      {isModalShown && <RecurringBillModal listeners={confirmModalListeners} />}
    </>
  );

  const schedule = (
    <RecurringBillScheduleOptions
      onUpdateScheduleOptions={onUpdateScheduleOptions}
    />
  );

  const options = (
    <RecurringBillOptions
      renderContactCombobox={renderContactCombobox}
      listeners={optionListeners}
    />
  );

  const tableLayoutOption = (
    <RecurringLineItemLayoutOptions
      layout={layout}
      layoutOptions={[
        { label: 'Services', value: PurchaseLayout.SERVICE },
        { label: 'Services and items', value: PurchaseLayout.ITEM_AND_SERVICE },
      ]}
      isReadOnly={isReadOnly}
      isDisabled={isSubmitting}
      onUpdateLayout={onUpdateLayout}
    />
  );

  const itemAndServiceTable = (
    <RecurringBillItemAndServiceTable
      renderItemCombobox={renderItemCombobox}
      renderJobCombobox={renderJobCombobox}
      listeners={itemAndServiceLayoutListeners}
    />
  );

  const serviceTable = (
    <RecurringBillServiceTable
      listeners={serviceLayoutListeners}
      renderJobCombobox={renderJobCombobox}
    />
  );

  const table = {
    [PurchaseLayout.ITEM_AND_SERVICE]: itemAndServiceTable,
    [PurchaseLayout.SERVICE]: serviceTable,
    [PurchaseLayout.PROFESSIONAL]: serviceTable,
    [PurchaseLayout.MISCELLANEOUS]: serviceTable,
  }[layout];

  const transaction = (
    <RecurringLineItemLayout
      options={options}
      tableLayoutOption={tableLayoutOption}
      table={table}
      isReadOnly={isReadOnly}
    />
  );

  const actions = <RecurringBillActions listeners={actionListeners} />;

  const view = (
    <RecurringTemplate
      alerts={alerts}
      pageHead={pageHead}
      modals={modals}
      schedule={schedule}
      transaction={transaction}
      actions={actions}
    />
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  title: getTitle(state),
  layout: getRecurringBillLayout(state),
  loadingState: getLoadingState(state),
  isModalShown: getIsModalShown(state),
  isAlertShown: getIsAlertShown(state),
  isSubmitting: getIsSubmitting(state),
  isReadOnly: getIsReadOnly(state),
  isFeatureAvailable: getIsFeatureAvailable(state),
});

export default connect(mapStateToProps)(RecurringBillView);
