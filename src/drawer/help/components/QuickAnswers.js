import { Button, Card, Icons, ToggleContent } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import { getQuickAnswers } from '../HelpSelectors';
import RichText from './RichText';
import styles from './QuickAnswers.module.css';

const QuickAnswer = ({ question, richTextAnswers }) => (
  <ToggleContent
    renderContent={({ show, toggle }) => (
      <Button
        type="clear"
        onClick={toggle}
        className={classNames(styles.question, {
          [styles['question--open']]: show,
        })}
        iconRight
        icon={<Icons.DownChevron />}
      >
        {question}
      </Button>
    )}
  >
    <Card classes={[styles.answer]}>
      {richTextAnswers && <RichText document={richTextAnswers} />}
    </Card>
  </ToggleContent>
);

const QuickAnswers = ({ answers }) =>
  answers.map(({ fields: { question, richTextAnswers }, sys: { id } }) => (
    <QuickAnswer
      key={id}
      question={question}
      richTextAnswers={richTextAnswers}
    />
  ));

const mapStateToProps = (state) => ({
  answers: getQuickAnswers(state),
});

export default connect(mapStateToProps)(QuickAnswers);
