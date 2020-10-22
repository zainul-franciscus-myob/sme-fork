import {
  Button,
  Checkbox,
  CheckboxGroup,
  Field,
  Icons,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getPayDirectOptions } from '../selectors/payDirectSelectors';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import styles from './InvoiceDetailOnlinePaymentMethod.module.css';

const InvoiceDetailSurcharging = ({
  disabled,
  redirectToSetUpOnlinePayments,
  canApplySurcharge,
  hasSetupSurcharging,
  onUpdateCanApplySurcharge,
}) => {
  const applySurcharging = (
    <CheckboxGroup
      disabled={disabled}
      renderCheckbox={() => (
        <div className={styles.onlinePaymentCheckboxGroup}>
          <Checkbox
            name="canApplySurcharge"
            label="Apply Surcharge"
            disabled={disabled}
            checked={canApplySurcharge}
            onChange={handleCheckboxChange(onUpdateCanApplySurcharge)}
          />
        </div>
      )}
    />
  );

  const setUpSurcharging = (
    <Field
      renderField={() => (
        <span>
          <Button
            disabled={disabled}
            type="link"
            icon={<Icons.OpenExternalLink />}
            iconLeft
            onClick={redirectToSetUpOnlinePayments}
          >
            Enable Surcharging
          </Button>
        </span>
      )}
    />
  );

  return hasSetupSurcharging ? applySurcharging : setUpSurcharging;
};

const mapStateToProps = (state) => getPayDirectOptions(state);

export default connect(mapStateToProps)(InvoiceDetailSurcharging);
