import {
  FilterBar,
  HeaderSort,
  Search,
  StandardTemplate,
  Table,
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
import BusinessAvatar from '../../../../components/BusinessAvatar/BusinessAvatar';
import NoResultPageState from '../../../../components/NoResultPageState/NoResultPageState';
import PageView from '../../../../components/PageView/PageView';
import footerImg from './footer-right-illustration.svg';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './BusinessListView.module.css';

const renderRow = (business) => (
  <Table.Row
    className={styles.businessRow}
    key={business.id}
    dataId={business.id}
  >
    <Table.RowItem title={business.businessName}>
      <a
        href={business.uri || `/#/${business.region}/${business.id}/dashboard`}
      >
        <BusinessAvatar
          businessName={business.businessName}
          className={styles.avatar}
        />
        {business.businessName}
      </a>
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
  onResetKeyword,
  onSort,
}) => {
  const businessList = businesses.map((business) => renderRow(business));
  const filterBar = (
    <FilterBar onReset={onResetKeyword}>
      <Search
        name="search"
        value={keyword}
        onChange={handleInputChange(onUpdateKeyword)}
        placeholder="Search"
        width="xl"
        className={styles.search}
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
    <div className={styles.container}>
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
      <div className={styles.footer}>
        <img src={footerImg} alt="footer" />
      </div>
    </div>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  businesses: getBusinesses(state),
  loadingState: getLoadingState(state),
  keyword: getKeyword(state),
  order: getOrder(state),
  orderBy: getOrderBy(state),
  isEmpty: getIsEmpty(state),
});

export default connect(mapStateToProps)(BusinessListView);
