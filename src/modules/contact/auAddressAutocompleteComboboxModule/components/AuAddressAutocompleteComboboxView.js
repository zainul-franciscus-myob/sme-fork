import { Combobox as FeelixCombobox } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getAutocompleteAddresses,
  getSelectedAutocompleteAddress,
} from '../auAddressAutocompleteComboboxSelectors';
import styles from './AuAddressAutocompleteComboboxView.module.css';

const AuAddressAutocompleteComboboxView = (props) => {
  const metaData = [{ columnName: 'address', showData: true }];

  return (
    <FeelixCombobox
      className={classnames(styles.hideArrow, styles.hideErrorMessage)}
      metaData={metaData}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  items: getAutocompleteAddresses(state),
  selected: getSelectedAutocompleteAddress(state),
});

export default connect(mapStateToProps)(AuAddressAutocompleteComboboxView);
