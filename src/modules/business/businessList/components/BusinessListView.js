import {
  FilterBar, HeaderSort, StandardTemplate, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBusinesses,
  getIsEmpty,
  getKeyword,
  getLoadingState,
  getOrder,
  getOrderBy,
} from '../BusinessListSelector';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import PageView from '../../../../components/PageView/PageView';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const renderRow = business => (
  <Table.Row key={business.id} dataId={business.id}>
    <Table.RowItem columnName="Business name" title={business.businessName}>
      <a href={`/#/${business.region}/${business.id}/dashboard`}>{business.businessName}</a>
    </Table.RowItem>
  </Table.Row>
);

const BusinessListView = ({
  businesses,
  loadingState,
  keyword,
  order,
  orderBy,
  isEmpty,
  onUpdateKeyword,
  onSort,
}) => {
  const businessList = businesses.map(business => renderRow(business));
  const filterBar = (
    <FilterBar>
      <FilterBarSearch
        value={keyword}
        onChange={handleInputChange(onUpdateKeyword)}
      />
    </FilterBar>
  );

  const emptyTableView = (
    <NoResultPageState
      title="No results found"
      description="Perhaps check spelling and try again"
    />
  );

  const tableBody = isEmpty ? emptyTableView : businessList;

  const view = (
    <StandardTemplate
      filterBar={filterBar}
      pageHead="My businesses"
      sticky="none"
    >
      <Table>
        <Table.Header>
          <Table.HeaderItem>
            <HeaderSort
              title="Business name"
              sortName={orderBy}
              activeSort={order}
              onSort={onSort}
            />
          </Table.HeaderItem>
        </Table.Header>
        <Table.Body>{tableBody}</Table.Body>
      </Table>
    </StandardTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  businesses: getBusinesses(state),
  loadingState: getLoadingState(state),
  keyword: getKeyword(state),
  order: getOrder(state),
  orderBy: getOrderBy(state),
  isEmpty: getIsEmpty(state),
});

export default connect(mapStateToProps)(BusinessListView);
