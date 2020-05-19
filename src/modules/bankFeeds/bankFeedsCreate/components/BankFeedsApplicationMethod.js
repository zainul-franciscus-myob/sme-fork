import {
  Label, RadioButton, RadioButtonGroup, ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getApplicationPreference,
  getHasOnlineApplication,
  getHasPaperApplication,
} from '../BankFeedsCreateSelectors';
import styles from './BankFeedsCreateView.module.css';

const BankFeedsApplicationMethod = ({
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
        onChange={({ value }) => (
          value === ApplicationMethods.ONLINE
            ? setApplicationPreference('online')
            : setApplicationPreference('form')
        )}
        renderRadios={({ id, value, ...props }) => [
          <OnlineApplicationMethod
            {...props}
            checked={value === ApplicationMethods.ONLINE}
            key={ApplicationMethods.ONLINE}
            label={ApplicationMethods.ONLINE}
            value={ApplicationMethods.ONLINE}
          />,
          <PaperApplicationMethod
            {...props}
            checked={value === ApplicationMethods.FORM}
            key={ApplicationMethods.FORM}
            label={ApplicationMethods.FORM}
            value={ApplicationMethods.FORM}
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
        { setApplicationPreference('online') }
      </ReadOnly>
    );
  }

  if (hasPaperApplication && !hasOnlineApplication) {
    return (
      <ReadOnly label="Application method" name="applicationMethod">
        <span>{ApplicationMethods.FORM}</span>
        <span className={styles.subText}>Takes 1 to 2 weeks</span>
        { setApplicationPreference('form') }
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
