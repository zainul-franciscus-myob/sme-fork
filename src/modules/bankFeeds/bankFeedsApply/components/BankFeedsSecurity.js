import { Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getApplicationPreference,
  getPCIDSSLink,
} from '../BankFeedsApplySelectors';
import styles from './BankFeedsCreateView.module.css';

const BankFeedsSecurity = ({ applicationPreference, PCIDSSLink }) =>
  applicationPreference ? (
    <>
      <hr />

      <div className={styles.securitySection}>
        <Icons.Lock set="lg" />

        <span>
          MYOB takes your security and privacy seriously. We protect all our
          data with{' '}
          <b>
            <a href={PCIDSSLink} target="_blank" rel="noopener noreferrer">
              PCI DSS
            </a>
          </b>{' '}
          global security and are compliant with ASIC and banking rules.
        </span>
      </div>
    </>
  ) : null;

const mapStateToProps = (state) => ({
  applicationPreference: getApplicationPreference(state),
  PCIDSSLink: getPCIDSSLink(state),
});

export default connect(mapStateToProps)(BankFeedsSecurity);
