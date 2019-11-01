import { AccordionTable, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getQuickAnswers } from '../HelpSelectors';
import RichText from './RichText';
import styles from './QuickAnswers.module.css';

const QuickAnswers = ({ answers }) => (
  <AccordionTable
    expansionToggle
    body={(
      <Table.Body className={styles.quickAnswersWrapper}>
        {answers.map(({ fields: { question, richTextAnswers }, sys: { id } }) => (
          <Table.CollapsibleRow
            key={id}
            header={(
              <Table.Row>
                <Table.RowItem textWrap="wrap">
                  <span className={styles.question}>
                    {question}
                  </span>
                </Table.RowItem>
                <Table.RowItem width="0">
                </Table.RowItem>
              </Table.Row>
            )}
          >
            {richTextAnswers && <RichText document={richTextAnswers} />}
          </Table.CollapsibleRow>))}
      </Table.Body>
    )}
  />
);

const mapStateToProps = state => ({
  answers: getQuickAnswers(state),
});

export default connect(mapStateToProps)(QuickAnswers);
