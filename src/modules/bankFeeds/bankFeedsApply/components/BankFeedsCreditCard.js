import { Field, Input } from '@myob/myob-widgets';
import React from 'react';

import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './BankFeedsCreateView.module.css';

const BankFeedsCreditCard = ({
  lastFourDigits,
  lastFourDigitsRequired,
  onUpdateForm,
}) => {
  const DisabledFourDigits = () => (
    <Input
      disabled
      hideLabel
      label=""
      name=""
      placeholder="XXXX"
      textAlign="center"
      width="xs"
    />
  );

  return (
    lastFourDigitsRequired && (
      <div className={styles.creditCard}>
        <Field
          label="Credit card number"
          requiredLabel="This field is required"
          renderField={() => {}}
        />

        <DisabledFourDigits />
        <DisabledFourDigits />
        <DisabledFourDigits />

        <Input
          hideLabel
          label=""
          maxLength={4}
          name="lastFourDigits"
          onChange={handleInputChange(onUpdateForm)}
          requiredLabel="This field is required"
          textAlign="center"
          value={lastFourDigits}
          width="xs"
        />
      </div>
    )
  );
};

export default BankFeedsCreditCard;
