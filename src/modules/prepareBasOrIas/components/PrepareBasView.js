import {
  Button,
  Card,
  Icons,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getLodgeStatementLink, getPageHead,
} from '../prepareBasSelectors';
import SmallScreenTemplate from '../../../components/SmallScreenTemplate/SmallScreenTemplate';
import illustrationBAS from './images/illustrationBAS.svg';
import styles from './PrepareBasView.module.css';

const openNewTab = url => () => window.open(url);

const PrepareBasView = ({ lodgeStatementLink, pageHead }) => (
  <SmallScreenTemplate>
    <PageHead title={pageHead} />
    <Card
      body={
        <Card.Body
          classes={[styles.container]}
          child={
            <>
              <img className={styles.illustration} src={illustrationBAS} alt="Prepare BAS" />
              <div>
                <h2 className={styles.text}>Set up activity statement</h2>
                <p className={styles.text}>
                  We&lsquo;ll save you time preparing your next activity statement
                  (BAS or IAS) by using the information
                  in your business to fill in some of the details.
                </p>
                <p className={styles.text}>
                  Once you&lsquo;ve filled in the required fields you can lodge
                  online and get confirmation from ATO within seconds.
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
  pageHead: getPageHead(state),
});

export default connect(mapStateToProps)(PrepareBasView);
