import { StandardTemplate, Table } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class FeatureListView extends Component {
  renderRow = feature => (
    <Table.Row key={feature.businessId}>
      <Table.RowItem columnName="Features" title={feature.featureName}>
        <a href={`/#/${feature.businessId}/${feature.featureName}`}>{feature.featureName}</a>
      </Table.RowItem>
    </Table.Row>
  );

  render() {
    const { features } = this.props;
    const featureList = features.map(feature => this.renderRow(feature));

    return (
      <StandardTemplate pageHead="Available features">
        <nav>
          <Table>
            <Table.Body>
              {featureList}
            </Table.Body>
          </Table>
        </nav>
      </StandardTemplate>
    );
  }
}

FeatureListView.propTypes = {
  features: PropTypes.arrayOf(PropTypes.shape({
    businessId: PropTypes.string,
    featureName: PropTypes.string,
  })).isRequired,
};

export default FeatureListView;
