import { mount } from 'enzyme';
import React from 'react';

import AccordionRowTypes from '../AccordionRowTypes';
import AccordionTable from '../AccordionTable';

const mockConsoleMethod = (realConsoleMethod) => {
  const ignoredMessages = [
    'test was not wrapped in act(...)',
  ];

  return (message, ...args) => {
    const containsIgnoredMessage = ignoredMessages.some(
      ignoredMessage => message.includes(ignoredMessage),
    );

    if (!containsIgnoredMessage) {
      realConsoleMethod(message, ...args);
    }
  };
};

const TestComponent = () => (<div />);

const setUp = (openPosition = -1) => {
  const testData = [{}, {}, {}, {}];

  const wrapper = mount(
    <AccordionTable
      openPosition={openPosition}
      renderRow={(index, _, buildCollapsibleRowProps) => (
        <TestComponent
          {...buildCollapsibleRowProps({
            id: '1',
            index,
            header: (<div />),
            rowType: AccordionRowTypes.COLLAPSIBLE,
          })}
          key={index}
        />
      )}
      data={testData}
    />,
  );

  return wrapper;
};

describe('AccordionTable', () => {
  /* We're hiding a specific set of console errors so as to not pollute the console. */
  console.error = jest.fn(mockConsoleMethod(console.error));

  it('renders', () => {
    mount(
      <AccordionTable
        renderRow={() => {}}
        renderCollapsibleRow={() => {}}
        determineRowType={() => {}}
        data={[]}
      />,
    );
  });

  describe('setting the current and previously opened rows', () => {
    const getRow = (wrapper, index) => wrapper.find(TestComponent).get(index);

    const expandRow = (wrapper, index) => {
      const row = wrapper.find(TestComponent).get(index);
      row.props.onExpand(index);
      wrapper.update();
      return row;
    };

    it('should be able to start with an opened row', () => {
      const wrapper = setUp(0);

      const firstRow = getRow(wrapper, 0);
      expect(firstRow.props.isRowOpen).toEqual(true);
    });

    it('should successfully close and open a row', () => {
      const wrapper = setUp();

      const firstRowBeforeUpdate = getRow(wrapper, 0);
      expect(firstRowBeforeUpdate.props.isRowOpen).toEqual(false);

      expandRow(wrapper, 0);

      const firstRowAfterUpdate = getRow(wrapper, 0);
      expect(firstRowAfterUpdate.props.isRowOpen).toEqual(true);

      expandRow(wrapper, 0);

      const firstRowAfterSecondUpdate = wrapper.find(TestComponent).get(0);
      expect(firstRowAfterSecondUpdate.props.isRowOpen).toEqual(false);
    });

    it('should close a row if another row is opened', () => {
      const wrapper = setUp();

      expandRow(wrapper, 0);
      expandRow(wrapper, 1);

      const firstRow = getRow(wrapper, 0);
      const secondRow = getRow(wrapper, 1);

      expect(firstRow.props.isRowOpen).toEqual(false);
      expect(secondRow.props.isRowOpen).toEqual(true);
    });
  });
});
