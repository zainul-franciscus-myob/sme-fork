import { Checkbox, CheckboxGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getApplicationPreference, getConfirmedApplication, getTermsOfUseLink } from '../BankFeedsCreateSelectors';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import styles from './BankFeedsCreateView.module.css';

const BankFeedsConfirmation = ({
  applicationPreference,
  confirmedApplication,
  onUpdateForm,
  termsOfUseLink,
}) => (
  applicationPreference ? (
    <>
      <hr />

      <CheckboxGroup
        className={styles.termsCheckbox}
        hideLabel
        label="Checkbox group label"
        renderCheckbox={() => (
          <Checkbox
            checked={confirmedApplication}
            label="I confirm that:"
            name="confirmedApplication"
            onChange={handleCheckboxChange(onUpdateForm)}
          />
        )}
      />

      <ul className={styles.termsList}>
        <li>
          I am authorised to submit this application on behalf
          of the business that operates the nominated bank account
          or credit card, either as a signatory or underwritten authority
          of the signatory(s); and
        </li>
        <li>
          I have read and accepted &quot;Section 4. Bank Feeds&quot; of
          the <b><a href={termsOfUseLink} target="_blank" rel="noopener noreferrer">Terms of Use</a></b>
        </li>
      </ul>
    </>
  ) : null
);

const mapStateToProps = state => ({
  applicationPreference: getApplicationPreference(state),
  confirmedApplication: getConfirmedApplication(state),
  termsOfUseLink: getTermsOfUseLink(state),
});

export default connect(mapStateToProps)(BankFeedsConfirmation);
