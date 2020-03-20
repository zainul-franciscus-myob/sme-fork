import { mount } from 'enzyme';
import React, { useCallback, useState } from 'react';

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

const TestComponent = ({ index, handleHeaderClick }) => (
  <div>
    <button onClick={() => handleHeaderClick(index)} type="button" className="testButton">{index}</button>
  </div>
);

const setupAccordionControled = (openPosition = -1) => {
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

const ManuallyControlAccordion = ({ openRowIndex = -1, data }) => {
  const [rowOpenIndex, setRowOpenIndex] = useState(openRowIndex);
  const toggleRow = useCallback((index) => {
    setRowOpenIndex(index === rowOpenIndex ? -1 : index);
  }, [rowOpenIndex]);
  return (
    <AccordionTable
      renderRow={(index, _, buildCollapsibleRowProps) => (
        <TestComponent
          {...buildCollapsibleRowProps({
            id: '1',
            index,
            handleHeaderClick: toggleRow,
            header: (<div />),
            rowType: AccordionRowTypes.COLLAPSIBLE,
          })}
          isRowOpen={index === rowOpenIndex}
          key={index}
        />
      )}
      data={data}
    />
  );
};

const setupMannuallyControled = (openRowIndex) => {
  const testData = [{}, {}, {}, {}];

  const wrapper = mount(
    <ManuallyControlAccordion
      openRowIndex={openRowIndex}
      data={testData}
    />,
  );

  return wrapper;
};

const getRow = (wrapper, index) => wrapper.find(TestComponent).get(index);

const getRowButtonWrapper = (wrapper, index) => wrapper.find('button.testButton').at(index);

describe('AccordionTable', () => {
  /* We're hiding a specific set of console errors so as to not pollute the console. */
  // eslint-disable-next-line no-console
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

  [
    {
      setup: setupAccordionControled,
      expandRow: (wrapper, index) => {
        const row = wrapper.find(TestComponent).get(index);
        row.props.onExpand(index);
        wrapper.update();
        return row;
      },
      name: 'accordion control open rows',
    },
    {
      setup: setupMannuallyControled,
      expandRow: (wrapper, index) => {
        const row = getRowButtonWrapper(wrapper, index);
        row.simulate('click');
      },
      name: 'manually control open rows',
    },
  ].forEach((test) => {
    const { name, setup, expandRow } = test;
    describe(name, () => {
      it('should be able to start with an opened row', () => {
        const wrapper = setup(0);

        const firstRow = getRow(wrapper, 0);
        expect(firstRow.props.isRowOpen).toEqual(true);
      });

      it('should successfully close and open a row', () => {
        const wrapper = setup();

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
        const wrapper = setup();

        expandRow(wrapper, 0);
        expandRow(wrapper, 1);

        const firstRow = getRow(wrapper, 0);
        const secondRow = getRow(wrapper, 1);

        expect(firstRow.props.isRowOpen).toEqual(false);
        expect(secondRow.props.isRowOpen).toEqual(true);
      });
    });
  });
});
