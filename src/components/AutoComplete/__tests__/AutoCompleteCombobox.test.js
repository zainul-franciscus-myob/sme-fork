import { mount } from 'enzyme';
import React from 'react';

import AutoCompleteCombobox from '../AutoCompleteCombobox';
import LoadMoreButtonStatus from '../LoadMoreButtonStatus';

describe('AutoCompleteCombobox', () => {
  const testClassname = 'test-classname';

  const mountComponent = ({
    selectedId = '',
    items = [],
    loadMoreButtonStatus = LoadMoreButtonStatus.SHOWN,
    addNewItem,
    onLoadMoreItems,
    searchDelay = 0,
    onSearch,
    onChange,
  }) => {
    const metaData = [
      { columnName: 'name', showData: true, showPagination: true },
    ];

    const wrapper = mount(
      <AutoCompleteCombobox
        metaData={metaData}
        selectedId={selectedId}
        items={items}
        addNewItem={addNewItem}
        loadMoreButtonStatus={loadMoreButtonStatus}
        onLoadMoreItems={onLoadMoreItems}
        searchDelay={searchDelay}
        onSearch={onSearch}
        onChange={onChange}
        className={testClassname}
      />
    );

    return wrapper;
  };

  const items = [
    { id: '1', name: 'a' },
    { id: '2', name: 'b' },
  ];

  const clickOnMenuDropdown = (wrapper) => {
    const comboboxBox = wrapper.find('ComboboxBox');
    const dropdownButton = comboboxBox.find(
      '.input-group-btn > a[type="button"]'
    );
    dropdownButton.simulate('click');
    wrapper.update();
  };

  const selectItem = (wrapper, itemPosition) => {
    const rows = wrapper.find('ComboboxBox').find('table > tbody > tr');
    const selectedItem = rows.at(itemPosition);
    selectedItem.simulate('click');
    wrapper.update();
  };

  const writeToInputField = (wrapper, value) => {
    const inputField = wrapper.find('input');
    inputField.simulate('change', { target: { value } });
  };

  it('can render component successfully', () => {
    const autoCompleteWrapper = mountComponent({ items });
    expect(autoCompleteWrapper.find('AutoCompleteCombobox').length).toBe(1);
  });

  describe('when input field is empty', () => {
    describe('Load more button', () => {
      describe('when shown', () => {
        it('shows the Load more button at the bottom of the item list when the loadMoreButtonStatus is shown or loading', () => {
          const autoCompleteWrapper = mountComponent({ items });
          clickOnMenuDropdown(autoCompleteWrapper);

          const renderedRows = autoCompleteWrapper
            .find('ComboboxBox')
            .find('table > tbody > tr');
          expect(renderedRows.length).toBe(3);
          expect(renderedRows.at(2).find('LoadMoreButton').length).toBe(1);
        });

        it('shows the Add new at the top, followed by items, followed by Load more button', () => {
          const autoCompleteWrapper = mountComponent({
            items,
            addNewItem: {
              label: 'addNewLabel',
              onAddNew: () => {},
            },
          });
          clickOnMenuDropdown(autoCompleteWrapper);

          const renderedRows = autoCompleteWrapper
            .find('ComboboxBox')
            .find('table > tbody > tr');
          expect(renderedRows.length).toBe(4);
          expect(renderedRows.at(0).find('Button').length).toBe(1); // add new button
          expect(renderedRows.at(3).find('LoadMoreButton').length).toBe(1);
        });

        describe('when Load More button is clicked on', () => {
          it('keeps the dropdown menu opened when the Load more button is selected or clicked on', () => {
            const autoCompleteWrapper = mountComponent({
              items,
              loadMoreButtonStatus: LoadMoreButtonStatus.LOADING,
              onLoadMoreItems: () => {},
            });
            clickOnMenuDropdown(autoCompleteWrapper);

            // Click Load more button
            selectItem(autoCompleteWrapper, items.length);

            expect(autoCompleteWrapper.find('.combobox-menu').length).toBe(1);
          });

          it('calls the onLoadMoreItems function when Load More button is selected or clicked on', () => {
            const onLoadMoreItems = jest.fn();
            const autoCompleteWrapper = mountComponent({
              items,
              loadMoreButtonStatus: LoadMoreButtonStatus.SHOWN,
              onLoadMoreItems,
            });
            clickOnMenuDropdown(autoCompleteWrapper);

            // Click Load more button
            selectItem(autoCompleteWrapper, items.length);

            expect(onLoadMoreItems).toHaveBeenCalledTimes(1);
          });

          it('calls onChange with previously selected item, when Load More button is selected or clicked on, but the user had previously selected an item from the list', () => {
            const onLoadMoreItems = jest.fn();
            const onChange = jest.fn();
            const autoCompleteWrapper = mountComponent({
              selectedId: '1',
              items,
              loadMoreButtonStatus: LoadMoreButtonStatus.SHOWN,
              onLoadMoreItems,
              onChange,
            });
            clickOnMenuDropdown(autoCompleteWrapper);

            // Click Load more button
            selectItem(autoCompleteWrapper, items.length);

            expect(onChange).toHaveBeenCalledWith({ id: '1', name: 'a' });
          });

          it('calls onChange when the user has selected an item from the list', () => {
            const onChange = jest.fn();
            const autoCompleteWrapper = mountComponent({
              items,
              loadMoreButtonStatus: LoadMoreButtonStatus.SHOWN,
              onChange,
            });
            clickOnMenuDropdown(autoCompleteWrapper);

            // Select second item from list
            selectItem(autoCompleteWrapper, 1);

            expect(onChange).toHaveBeenCalledWith({ id: '2', name: 'b' });
          });
        });
      });

      describe('when hidden', () => {
        it('shows item list without Load more button when the loadMoreButtonStatus is hidden', () => {
          const autoCompleteWrapper = mountComponent({
            items,
            loadMoreButtonStatus: LoadMoreButtonStatus.HIDDEN,
          });
          clickOnMenuDropdown(autoCompleteWrapper);

          const renderedRows = autoCompleteWrapper
            .find('ComboboxBox')
            .find('table > tbody > tr');
          expect(renderedRows.length).toBe(2);
        });
      });
    });
  });

  describe('when user starts typing in input field', () => {
    const searchResults = [
      { id: '3', name: 'heyy' },
      { id: '4', name: 'heyyy' },
      { id: '5', name: 'heeeyyy' },
    ];

    it('makes search request and shows search result list instead of item list', (done) => {
      const onSearch = jest.fn(({ onSuccess }) => onSuccess(searchResults));

      const autoCompleteWrapper = mountComponent({
        items,
        onSearch,
      });
      writeToInputField(autoCompleteWrapper, 'hey');

      // Run callback immediately after re-render
      setImmediate(() => {
        autoCompleteWrapper.update();

        const renderedRows = autoCompleteWrapper
          .find('ComboboxBox')
          .find('table > tbody > tr');
        expect(renderedRows.length).toBe(3);

        done();
      });
    });

    it('shows item list instead of search results if user has emptied out input field', (done) => {
      const onSearch = jest.fn(({ onSuccess }) => onSuccess(searchResults));

      const autoCompleteWrapper = mountComponent({
        items,
        onSearch,
        loadMoreButtonStatus: LoadMoreButtonStatus.HIDDEN,
      });
      writeToInputField(autoCompleteWrapper, 'hey');

      // Run callback immediately after re-render
      setImmediate(() => {
        autoCompleteWrapper.update();
        writeToInputField(autoCompleteWrapper, '');
        autoCompleteWrapper.update();

        const renderedRows = autoCompleteWrapper
          .find('ComboboxBox')
          .find('table > tbody > tr');
        expect(renderedRows.length).toBe(2);

        done();
      });
    });
  });
});
