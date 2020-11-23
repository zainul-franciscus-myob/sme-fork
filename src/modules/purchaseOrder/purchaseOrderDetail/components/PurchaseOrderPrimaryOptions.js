import { TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getAccountOptions,
  getIsBlocking,
  getIsReadOnly,
  getIsReportable,
  getIsSupplierDisabled,
  getRegion,
  getShippingAddress,
  getShouldShowAbn,
  getSupplierId,
} from '../selectors/purchaseOrderSelectors';
import PurchaseOrderAbnPopover from './PurchaseOrderAbnPopover';
import ReportableCheckbox from '../../../../components/ReportableCheckbox/ReportableCheckbox';
import handleAutoCompleteChange from '../../../../components/handlers/handleAutoCompleteChange';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './PurchaseOrderPrimaryOptions.module.css';

const PurchaseOrderPrimaryOptions = ({
  supplierId,
  shippingAddress,
  isReportable,
  region,
  isSupplierDisabled,
  isBlocking,
  isReadOnly,
  shouldShowAbn,
  renderContactCombobox,
  onUpdatePurchaseOrderOption,
  onInputAlert,
}) => (
  <React.Fragment>
    <div
      className={classnames(styles.formControlWrapper, styles.contactComboBox, {
        [styles.maximiseContactCombobox]: !shouldShowAbn,
      })}
    >
      {renderContactCombobox({
        selectedId: supplierId,
        name: 'supplierId',
        label: 'Supplier',
        hideLabel: false,
        requiredLabel: 'This is required',
        allowClear: true,
        disabled: isSupplierDisabled || isBlocking || isReadOnly,
        onChange: handleAutoCompleteChange(
          'supplierId',
          onUpdatePurchaseOrderOption
        ),
        onAlert: onInputAlert,
        width: 'xl',
      })}
      {shouldShowAbn && <PurchaseOrderAbnPopover />}
    </div>

    <ReportableCheckbox
      label="Report to ATO via TPAR"
      checked={isReportable}
      region={region}
      name="isReportable"
      onChange={handleCheckboxChange(onUpdatePurchaseOrderOption)}
      disabled={isSupplierDisabled || isBlocking || isReadOnly}
      width="xl"
    />

    <div className={classnames({ [styles.address]: true })}>
      <TextArea
        name="shippingAddress"
        label="Shipping Address"
        resize="both"
        value={shippingAddress}
        onChange={handleInputChange(onUpdatePurchaseOrderOption)}
        maxLength={2000}
        autoSize
      />
    </div>
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  supplierId: getSupplierId(state),
  shippingAddress: getShippingAddress(state),
  isReportable: getIsReportable(state),
  accountOptions: getAccountOptions(state),
  region: getRegion(state),
  isSupplierDisabled: getIsSupplierDisabled(state),
  isBlocking: getIsBlocking(state),
  isReadOnly: getIsReadOnly(state),
  shouldShowAbn: getShouldShowAbn(state),
});

export default connect(mapStateToProps)(PurchaseOrderPrimaryOptions);
