import {
  Button,
  Checkbox,
  FilterBar,
  Popover,
  Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { useEffect, useRef } from 'react';

import {
  getFilterOptions,
  getShowStatusFilterOptions,
} from '../userListSelectors';
import FilterBarSearch from '../../../../components/FilterBarSearch/FilterBarSearch';
import ShowInactiveCheckbox from '../../../../components/ShowInactiveCheckbox/ShowInactiveCheckbox';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from '../UserList.module.css';

const UserListFilterOptions = (props) => {
  const {
    keywords,
    invitationAccepted,
    accessRemoved,
    invitationSent,
    invitationCancelled,
    invitationExpired,
    showInactive,
    onUpdateFilterOptions,
    setShowStatusFilterOptions,
    showStatusFilterOptions,
  } = props;

  const StatusBody = () => (
    <>
      <Checkbox
        name="invitationAccepted"
        label="Invitation Accepted"
        checked={invitationAccepted}
        className={styles.statusCheckbox}
        onChange={handleCheckboxChange(onUpdateFilterOptions)}
      />
      <Checkbox
        name="accessRemoved"
        label="Access Removed"
        checked={accessRemoved}
        className={styles.statusCheckbox}
        onChange={handleCheckboxChange(onUpdateFilterOptions)}
      />

      <Separator className={styles.separator} />

      <Checkbox
        name="invitationSent"
        label="Invitation sent"
        checked={invitationSent}
        className={styles.statusCheckbox}
        onChange={handleCheckboxChange(onUpdateFilterOptions)}
      />
      <Checkbox
        name="invitationCancelled"
        label="Invitation cancelled"
        checked={invitationCancelled}
        className={styles.statusCheckbox}
        onChange={handleCheckboxChange(onUpdateFilterOptions)}
      />
      <Checkbox
        name="invitationExpired"
        label="Invitation expired"
        checked={invitationExpired}
        className={styles.statusCheckbox}
        onChange={handleCheckboxChange(onUpdateFilterOptions)}
      />
    </>
  );

  const popoverContainer = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      const clickOutsidePopover = !popoverContainer.current.contains(e.target);
      if (clickOutsidePopover) {
        setShowStatusFilterOptions(false);
      }
    };
    // Add listener when mounted
    document.addEventListener('mousedown', handleClick);
    // Return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
    // Tell react we do not need to re-run the effect on re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FilterBar>
      <FilterBarSearch
        id="keywords"
        name="keywords"
        value={keywords}
        onChange={handleInputChange(onUpdateFilterOptions)}
      />

      <FilterBar.Item>
        <div id="popover_container" ref={popoverContainer}>
          <Popover
            appendTarget="#popover_container"
            isOpen={showStatusFilterOptions}
            body={<Popover.Body child={<StatusBody />} />}
            preferPlace="below"
          >
            <Button
              type="secondary"
              onClick={() =>
                setShowStatusFilterOptions(!showStatusFilterOptions)
              }
            >
              Status
            </Button>
          </Popover>
        </div>
      </FilterBar.Item>

      <FilterBar.Item>
        <ShowInactiveCheckbox
          id="showInactive"
          name="showInactive"
          label="Show inactive"
          checked={showInactive}
          onChange={handleCheckboxChange(onUpdateFilterOptions)}
        />
      </FilterBar.Item>
    </FilterBar>
  );
};

const mapStateToProps = (state) => ({
  ...getFilterOptions(state),
  showStatusFilterOptions: getShowStatusFilterOptions(state),
});

export default connect(mapStateToProps)(UserListFilterOptions);
