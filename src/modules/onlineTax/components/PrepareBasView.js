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
} from '../onlineTaxSelectors';
import SmallScreenTemplate from '../../../components/SmallScreenTemplate/SmallScreenTemplate';
import illustrationBAS from './images/illustrationBAS.svg';
import styles from './PrepareBasView.module.css';

const openNewTab = url => () => window.open(url);

const PrepareBasView = ({ lodgeStatementLink }) => (
  <SmallScreenTemplate>
    <PageHead title="Prepare BAS or IAS" />
    <Card
      body={
        <Card.Body
          classes={[styles.container]}
          child={
            <>
              <img className={styles.illustration} src={illustrationBAS} alt="Prepare BAS or IAS" />
              <div>
                <p className={styles.text}>
                  We&lsquo;ll save you time preparing your next activity statement
                  (BAS or IAS) by using the information
                  in your business to fill in some of the details.
                </p>
                <p className={styles.text}>
                  Once you&lsquo;ve filled in the required fields you can lodge
                  online and get confirmation from the ATO within seconds.
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

export default connect(mapStateToProps)(PrepareBasView);
