import { StandardTemplate, Table } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

class FeatureListView extends Component {
  renderRow = (feature) => {
    const { businessId } = this.props;

    return (
      <Table.Row key={feature}>
        <Table.RowItem columnName="Features" title={feature}>
          <a href={`/#/${businessId}/${feature}`}>{feature}</a>
        </Table.RowItem>
      </Table.Row>
    );
  }

  render() {
    const { features, alertComponent } = this.props;
    const featureList = features.map(this.renderRow);

    return (
      <Fragment>
        { alertComponent }
        <StandardTemplate pageHead="Available features">
          <nav>
            <Table>
              <Table.Body>
                {featureList}
              </Table.Body>
            </Table>
          </nav>
        </StandardTemplate>
      </Fragment>
    );
  }
}

FeatureListView.defaultProps = {
  alertComponent: null,
};

FeatureListView.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  alertComponent: PropTypes.element,
  businessId: PropTypes.string.isRequired,
};

export default FeatureListView;
