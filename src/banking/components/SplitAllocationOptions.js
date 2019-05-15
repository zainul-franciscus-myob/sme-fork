import { Checkbox, Columns } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getOptions } from '../bankingSelectors/splitAllocationSelectors';
import ContactCombobox from '../../components/combobox/ContactCombobox';
import styles from './BankingView.css';

const handleCheckboxChange = handler => (e) => {
  const { checked, name } = e.target;
  handler({ key: name, value: checked });
};

const handleComboBoxChange = (key, handler) => (item) => {
  handler({ key, value: item.id });
};

const SplitAllocationOptions = (props) => {
  const {
    contacts,
    contactId,
    contactLabel,
    isReportable,
    showIsReportable,
    onUpdateSplitAllocationHeader,
  } = props;

  return (
    <Columns type="three">
      <ContactCombobox
        items={contacts}
        selectedId={contactId}
        onChange={handleComboBoxChange('contactId', onUpdateSplitAllocationHeader)}
        label={contactLabel}
        name="contact"
        hideLabel={false}
        hintText="Select contact"
      />
      {showIsReportable && (
        <div className="form-group">
          <div className={styles.checkbox}>
            <Checkbox
              name="isReportable"
              label="Reportable"
              checked={isReportable}
              onChange={handleCheckboxChange(onUpdateSplitAllocationHeader)}
            />
          </div>
        </div>
      )}
    </Columns>
  );
};
SplitAllocationOptions.defaultProps = {
  isReportable: undefined,
};

SplitAllocationOptions.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contactId: PropTypes.string.isRequired,
  contactLabel: PropTypes.string.isRequired,
  isReportable: PropTypes.bool,
  showIsReportable: PropTypes.bool.isRequired,
  onUpdateSplitAllocationHeader: PropTypes.func.isRequired,
};

const mapStateToProps = state => getOptions(state);

export default connect(mapStateToProps)(SplitAllocationOptions);
