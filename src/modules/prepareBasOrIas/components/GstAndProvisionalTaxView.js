import {
  Button,
  Card,
  Icons,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getLodgeStatementLink,
} from '../prepareBasSelectors';
import SmallScreenTemplate from '../../../components/SmallScreenTemplate/SmallScreenTemplate';
import illustrationBAS from './images/illustrationBAS.svg';
import styles from './PrepareBasView.module.css';

const openNewTab = url => () => window.open(url);

const GstAndProvisionalTaxView = ({ lodgeStatementLink }) => (
  <SmallScreenTemplate>
    <PageHead title="GST and provisional tax" />
    <Card
      body={
        <Card.Body
          classes={[styles.container]}
          child={
            <>
              <img className={styles.illustration} src={illustrationBAS} alt="GST and provisional tax" />
              <div>
                <p className={styles.text}>
                  We&lsquo;ll save you time preparing your next GST return by
                  using the information in your business to fill in some of the details.
                </p>
                <p className={styles.text}>
                  Once you&lsquo;ve filled in the required fields you can file online
                  and get confirmation from Inland revenue within seconds.
                </p>
                <Button
                  className={styles.button}
                  icon={<Icons.OpenExternalLink />}
                  iconRight
                  onClick={openNewTab(lodgeStatementLink)}
                >
                  Get started
                </Button>
              </div>
            </>
          }
        />
      }
    >
    </Card>
  </SmallScreenTemplate>
);

const mapStateToProps = state => ({
  lodgeStatementLink: getLodgeStatementLink(state),
});

export default connect(mapStateToProps)(GstAndProvisionalTaxView);
