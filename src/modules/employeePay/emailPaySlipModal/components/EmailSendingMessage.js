import { Alert, Spinner } from '@myob/myob-widgets';
import React from 'react';

import EmailErrors from './EmailErrors';
import styles from './EmailSendingMessage.module.css';

const EmailSendingMessage = ({
  isLoading,
  name,
  email,
  count,
  total,
  errors,
}) => {
  const done =
    errors.length > 0 ? (
      <EmailErrors employees={errors} />
    ) : (
      <Alert type="success">Your emails have been successfully sent.</Alert>
    );

  const nameText = `${name} ${count}/${total}`;
  const emailText = `(${email})`;

  const loading = (
    <div className={styles.centered}>
      <div>
        <span className={styles.name}>{nameText}</span>
        <span className={styles.email}>{emailText}</span>
      </div>
      <Spinner size="small" />
    </div>
  );

  return isLoading ? loading : done;
};

export default EmailSendingMessage;
