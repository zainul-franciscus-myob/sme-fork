import { Aside } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getHelpTitle, getIsHelpFailedOrEmpty, getIsLoading, getRichTextContent,
} from '../HelpSelectors';
import HelpFailureView from './HelpFailureView';
import PageView from '../../../components/PageView/PageView';
import QuickAnswers from './QuickAnswers';
import RichText from './RichText';
import styles from './HelpView.module.css';

const HelpView = ({
  helpTitle,
  document,
  closeHelp,
  isLoading,
  isHelpFailedOrEmpty,
}) => {
  const failureOrEmptyView = (<HelpFailureView />);

  const helpView = (
    <>
      {helpTitle && <h3>{helpTitle}</h3>}
      {document && <RichText document={document} />}
      <QuickAnswers />
    </>
  );

  const drawerContentView = isHelpFailedOrEmpty ? failureOrEmptyView : helpView;

  return (
    <Aside header={<Aside.Header title="MYOB Help" onClose={closeHelp} className={styles.asideHeader} />}>
      <PageView isLoading={isLoading} view={drawerContentView} />
    </Aside>
  );
};

const mapStateToProps = state => ({
  helpTitle: getHelpTitle(state),
  document: getRichTextContent(state),
  isLoading: getIsLoading(state),
  isHelpFailedOrEmpty: getIsHelpFailedOrEmpty(state),
});

export default connect(mapStateToProps)(HelpView);
