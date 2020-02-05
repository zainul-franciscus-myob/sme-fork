import { Aside } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getHelpOnThisPageLinks, getHelpTitle, getIsHelpFailedOrEmpty, getIsLoading, getRichTextContent,
} from '../HelpSelectors';
import HelpFailureView from './HelpFailureView';
import HelpLeanEngage from './HelpLeanEngage';
import HelpOnThisPage from './HelpOnThisPage';
import HelpSearch from './HelpSearch';
import PageView from '../../../components/PageView/PageView';
import QuickAnswers from './QuickAnswers';
import RichText from './RichText';
import StaticLinksSection from './StaticLinksSection';
import asideHeaderStyles from '../../AsideHeader.module.css';
import styles from './HelpView.module.css';

const HelpView = ({
  helpTitle,
  richTextHelpContent,
  helpOnThisPageLinks,
  closeHelp,
  isLoading,
  isActive,
  isHelpFailedOrEmpty,
  onSearchChange,
  onSearchClick,
}) => {
  if (!isActive) return <></>;

  const failureOrEmptyView = (<HelpFailureView />);

  const helpView = (
    <div className={styles.container}>
      <HelpSearch
        onSearchChange={onSearchChange}
        onSearchClick={onSearchClick}
      />
      <div className={styles.topHrBreak}><hr /></div>

      {helpTitle && <h3>{helpTitle}</h3>}
      {richTextHelpContent && <RichText document={richTextHelpContent} />}
      <QuickAnswers />
      <HelpLeanEngage />
      <div className={styles.bottomHrBreak}><hr /></div>

      {helpOnThisPageLinks && <HelpOnThisPage document={helpOnThisPageLinks} />}

      <StaticLinksSection />
    </div>
  );

  const drawerContentView = isHelpFailedOrEmpty ? failureOrEmptyView : helpView;

  return (
    <Aside header={<Aside.Header title="MYOB Help" onClose={closeHelp} className={asideHeaderStyles.asideHeader} />}>
      <PageView isLoading={isLoading} view={drawerContentView} />
    </Aside>
  );
};

const mapStateToProps = state => ({
  helpTitle: getHelpTitle(state),
  richTextHelpContent: getRichTextContent(state),
  helpOnThisPageLinks: getHelpOnThisPageLinks(state),
  isLoading: getIsLoading(state),
  isHelpFailedOrEmpty: getIsHelpFailedOrEmpty(state),
  isActive: state.isActive,
});

export default connect(mapStateToProps)(HelpView);
