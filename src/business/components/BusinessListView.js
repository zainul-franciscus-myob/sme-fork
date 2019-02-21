import { StandardTemplate, Table } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class BusinessListView extends Component {
  renderRow = business => (
    <Table.Row key={business.id} dataId={business.id}>
      <Table.RowItem columnName="Business name" title={business.businessName}>
        <a href={`/#/${business.id}/transactionList`}>{business.businessName}</a>
      </Table.RowItem>
    </Table.Row>
  );

  render() {
    const { businesses } = this.props;
    const businessList = businesses.map(business => this.renderRow(business));

    return (
      <StandardTemplate pageHead="My businesses">
        <nav>
          <Table>
            <Table.Header>
              <Table.HeaderItem>Business name</Table.HeaderItem>
            </Table.Header>
            <Table.Body>
              {businessList}
            </Table.Body>
          </Table>
        </nav>
      </StandardTemplate>
    );
  }
}

BusinessListView.propTypes = {
  businesses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    businessName: PropTypes.string,
  })).isRequired,
};

export default BusinessListView;
