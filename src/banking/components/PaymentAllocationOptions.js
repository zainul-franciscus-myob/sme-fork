import {
  Checkbox,
  FilterBar,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getOptions } from '../bankingSelectors/paymentAllocationSelectors';
import SupplierCombobox from '../../components/combobox/SupplierCombobox';

const handleComboBoxChange = (key, handler) => (item) => {
  handler({ key, value: item.id });
};

const handleCheckboxChange = handler => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

const PaymentAllocationOptions = (props) => {
  const {
    contactId,
    contacts,
    contactLabel,
    showPaid,
    showPaidLabel,
    onUpdatePaymentAllocationOptions,
  } = props;

  return (
    <React.Fragment>
      <FilterBar>
        <SupplierCombobox
          label={contactLabel}
          name="contact"
          hideLabel={false}
          items={contacts}
          selectedId={contactId}
          onChange={handleComboBoxChange('contactId', onUpdatePaymentAllocationOptions)}
        />
        <FilterBar.Item>
          <Checkbox
            name="showPaid"
            label={showPaidLabel}
            checked={showPaid}
            onChange={handleCheckboxChange(onUpdatePaymentAllocationOptions)}
          />
        </FilterBar.Item>
      </FilterBar>
    </React.Fragment>
  );
};

PaymentAllocationOptions.propTypes = {
  contactId: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contactLabel: PropTypes.string.isRequired,
  showPaid: PropTypes.bool.isRequired,
  showPaidLabel: PropTypes.string.isRequired,
  onUpdatePaymentAllocationOptions: PropTypes.func.isRequired,
};

const mapStateToProps = state => getOptions(state);

export default connect(mapStateToProps)(PaymentAllocationOptions);
