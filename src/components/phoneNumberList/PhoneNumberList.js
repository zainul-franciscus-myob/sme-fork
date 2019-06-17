import {
  Button, Field, Icons,
} from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import styles from './PhoneNumberList.css';

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
        {phoneNumbers.map(
          (phoneNumber, i) => (
            <Field
              label="Phone"
              key={i}
              hideLabel={i !== 0}
              renderField={({ id }) => (
                <div className={styles.phoneNumber}>
                  <input
                    id={id}
                    className="form-control"
                    label="Phone number"
                    hidelabel="true"
                    value={phoneNumber}
                    onChange={this.onPhoneNumbersChange(i)}
                  />
                  {
                    i !== 0
                    && (<RemovePhoneNumberButton onClick={this.onRemovePhoneNumber(i)} />)
                  }
                </div>
              )}
            />
          ),
        )}
        {hasAddPhoneButton
        && (
        <Field
          label="Add button"
          hideLabel
          renderField={
            () => (
              <Button type="link" icon={<Icons.Add />} onClick={this.onAddPhoneNumber}>
                Add phone number
              </Button>
            )
          }
        />
        )}
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
