import {
  BulkAdd,
  Button,
  Field,
  FieldGroup,
  Icons,
  Input,
  Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getConditions } from '../bankingRuleSelectors';
import FieldTypes from '../FieldTypes';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import handleSelectChange from '../../../../components/handlers/handleSelectChange';
import styles from './ConditionsSection.module.css';

const fields = [
  { name: 'Description', value: FieldTypes.description },
  { name: 'Amount ($)', value: FieldTypes.amount },
];

const matchers = {
  [FieldTypes.description]: [{ name: 'Contains', value: 'Contains' }],
  [FieldTypes.amount]: [{ name: 'Equals', value: 'Equal' }],
};

const onRowChange = (conditionIndex, handler) => (predicateIndex, data) => {
  handler(conditionIndex, predicateIndex, data);
};

const onAddRow = (conditionIndex, handler) => (newData) => {
  handler(conditionIndex, newData);
};

const onRemoveRow = (conditionIndex, handler) => (predicateIndex) => {
  handler(conditionIndex, predicateIndex);
};

const onFieldChange = (conditionIndex, handler) => (data) => {
  handler(conditionIndex, data);
};

const renderPredicate = (conditionIndex, field, onConditionChange) => (
  predicateIndex,
  predicate,
  onPredicateChange
) => (
  <BulkAdd.Row
    key={predicate.id}
    index={predicateIndex}
    rowClass={
      conditionIndex === 0 && predicateIndex === 0
        ? styles.firstConditionRow
        : ''
    }
  >
    <BulkAdd.RowItem textWrap="wrap">
      {predicateIndex === 0 ? (
        <Select
          label="Condition Field"
          hideLabel
          name="field"
          value={field}
          onChange={handleSelectChange(onConditionChange)}
          className={styles.field}
        >
          {fields.map(({ name, value }) => (
            <Select.Option key={value} value={value} label={name} />
          ))}
        </Select>
      ) : (
        <div className={styles.operator}>OR</div>
      )}
    </BulkAdd.RowItem>
    <BulkAdd.RowItem textWrap="wrap">
      <Select
        label="matcher"
        hideLabel
        name="matcher"
        value={predicate.matcher}
        onChange={handleSelectChange(onPredicateChange)}
        className={styles.matcher}
      >
        {matchers[field].map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
    </BulkAdd.RowItem>
    <BulkAdd.RowItem textWrap="wrap">
      <Input
        label="value"
        hideLabel
        name="value"
        value={predicate.value}
        onChange={handleInputChange(onPredicateChange)}
        maxLength={200}
        className={styles.value}
      />
    </BulkAdd.RowItem>
  </BulkAdd.Row>
);

const ConditionsSection = ({
  conditions,
  onConditionAdd,
  onConditionChange,
  onPredicateAdd,
  onPredicateChange,
  onPredicateRemove,
}) => (
  <FieldGroup label="When money received on the bank statement matches these conditions">
    {conditions.map(({ predicates, field }, index) => (
      <div>
        {index > 0 && <div className={styles.conditionSeparator}>AND</div>}
        <BulkAdd>
          <BulkAdd.Rows
            data={predicates}
            renderRow={renderPredicate(
              index,
              field,
              onFieldChange(index, onConditionChange)
            )}
            onRowChange={onRowChange(index, onPredicateChange)}
            onAddRow={onAddRow(index, onPredicateAdd)}
            onRemoveRow={onRemoveRow(index, onPredicateRemove)}
          />
        </BulkAdd>
      </div>
    ))}
    <Field
      label="Add button"
      hideLabel
      renderField={() => (
        <Button type="link" icon={<Icons.Add />} onClick={onConditionAdd}>
          Add condition
        </Button>
      )}
    />
  </FieldGroup>
);

const mapStateToProps = (state) => ({
  conditions: getConditions(state),
});

export default connect(mapStateToProps)(ConditionsSection);
