import {
  Label,
  RadioButton,
  RadioButtonGroup,
  ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getApplicationPreference,
  getHasOnlineApplication,
  getHasPaperApplication,
} from '../BankFeedsApplySelectors';
import styles from './BankFeedsCreateView.module.css';

const BankFeedsApplicationMethod = ({
  applicationPreference,
  hasOnlineApplication,
  hasPaperApplication,
  setApplicationPreference,
}) => {
  const ApplicationMethods = {
    FORM: 'Application form',
    ONLINE: 'Online via bank / internet banking',
  };

  const OnlineApplicationMethod = ({ ...props }) => (
    <>
      <RadioButton
        {...props}
        labelAccessory={<Label color="green" size="small" type="boxed">Recommended</Label>}
      />
      <span className={styles.subText}>Takes a few days</span>
    </>
  );

  const PaperApplicationMethod = ({ ...props }) => (
    <>
      <RadioButton {...props} />
      <span className={styles.subText}>Takes 1 to 2 weeks</span>
    </>
  );

  if (hasOnlineApplication && hasPaperApplication) {
    return (
      <RadioButtonGroup
        label="Application method"
        name="applicationMethod"
        value={applicationPreference}
        onChange={({ value }) => setApplicationPreference(value)}
        renderRadios={({ id, value, ...props }) => [
          <OnlineApplicationMethod
            {...props}
            checked={value === 'online'}
            label={ApplicationMethods.ONLINE}
            value="online"
          />,
          <PaperApplicationMethod
            {...props}
            checked={value === 'form'}
            label={ApplicationMethods.FORM}
            value="form"
          />,
        ]}
      />
    );
  }

  if (hasOnlineApplication && !hasPaperApplication) {
    return (
      <ReadOnly label="Application method" name="applicationMethod">
        <span>{ApplicationMethods.ONLINE}</span>
        <span className={styles.subText}>Takes a few days</span>
      </ReadOnly>
    );
  }

  if (hasPaperApplication && !hasOnlineApplication) {
    return (
      <ReadOnly label="Application method" name="applicationMethod">
        <span>{ApplicationMethods.FORM}</span>
        <span className={styles.subText}>Takes 1 to 2 weeks</span>
      </ReadOnly>
    );
  }

  return null;
};

const mapStateToProps = state => ({
  applicationPreference: getApplicationPreference(state),
  hasOnlineApplication: getHasOnlineApplication(state),
  hasPaperApplication: getHasPaperApplication(state),
});

export default connect(mapStateToProps)(BankFeedsApplicationMethod);
