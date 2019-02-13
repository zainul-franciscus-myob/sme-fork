import {
  Button, Icons, Input, InputLabel,
} from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import styles from './Address.css';

/* eslint-disable react/no-array-index-key */

const RemovePhoneNumberButton = ({ onClick }) => (
  <Button type="secondary" size="xs" onClick={onClick}>
    <Icons.Remove />
  </Button>
);

RemovePhoneNumberButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

class PhoneNumberList extends React.Component {
  onPhoneNumbersChange = i => (e) => {
    const {
      phoneNumbers,
      onPhoneNumbersChange,
    } = this.props;

    const { value } = e.target;

    const updatedPhoneNumbers = phoneNumbers.map(
      (phoneNumber, index) => (index === i ? value : phoneNumber),
    );

    onPhoneNumbersChange(updatedPhoneNumbers);
  }

  onAddPhoneNumber = () => {
    const {
      phoneNumbers,
      onPhoneNumbersChange,
    } = this.props;

    onPhoneNumbersChange([...phoneNumbers, '']);
  }

  onRemovePhoneNumber = i => () => {
    const {
      phoneNumbers,
      onPhoneNumbersChange,
    } = this.props;

    const updatedPhoneNumbers = phoneNumbers.filter((num, index) => index !== i);
    onPhoneNumbersChange(updatedPhoneNumbers);
  }

  render() {
    const {
      phoneNumbers,
      hasAddPhoneButton,
    } = this.props;

    return (
      <Fragment>
        <InputLabel label="Phone Number" id="phoneNumber0" />
        {phoneNumbers.map(
          (phoneNumber, i) => (
            <div key={i} className={styles.phoneNumber}>
              <Input
                id={`phoneNumber${i}`}
                name="phoneNumber"
                label="Phone number"
                hideLabel
                value={phoneNumber}
                onChange={this.onPhoneNumbersChange(i)}
              />
              {
                i !== 0
                && (<RemovePhoneNumberButton onClick={this.onRemovePhoneNumber(i)} />)
              }
            </div>
          ),
        )}
        {hasAddPhoneButton && <Button type="link" onClick={this.onAddPhoneNumber}>Add phone number</Button>}
      </Fragment>
    );
  }
}

PhoneNumberList.propTypes = {
  phoneNumbers: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasAddPhoneButton: PropTypes.bool.isRequired,
  onPhoneNumbersChange: PropTypes.func.isRequired,
};

export default PhoneNumberList;
