import shouldRenderCollapsibleTableRow, { DONT_RENDER, RENDER } from '../shouldRenderCollapsibleTableRow';

describe('shouldRenderCollapsibleTableRow', () => {
  it('should render if isRowOpen changes across updates', () => {
    const prevProps = {
      isRowOpen: false,
    };

    const nextProps = {
      isRowOpen: true,
    };

    const shouldRender = shouldRenderCollapsibleTableRow(prevProps, nextProps);

    expect(shouldRender).toEqual(RENDER);
  });

  it('should render if isSelected changes across updates', () => {
    const prevProps = {
      isSelected: false,
    };

    const nextProps = {
      isSelected: true,
    };

    const shouldRender = shouldRenderCollapsibleTableRow(prevProps, nextProps);

    expect(shouldRender).toEqual(RENDER);
  });

  it('should render if id changes across updates', () => {
    const prevProps = { id: '1' };

    const nextProps = { id: '2' };

    const shouldRender = shouldRenderCollapsibleTableRow(prevProps, nextProps);

    expect(shouldRender).toEqual(RENDER);
  });

  it('should not render if other props change', () => {
    const prevProps = {
      index: 0,
      rowType: '',
      header: '',
      children: '',
      onExpand: () => { },
      handleHeaderClick: undefined,
      className: '',
      columns: [],
      isActive: false,
      isInactive: false,
      onRowBlur: () => { },
      onRowFocus: () => { },
      onRowSelect: () => { },
    };

    const nextProps = {
      index: 1,
      rowType: 'blah',
      header: '',
      children: '',
      onExpand: () => {},
      handleHeaderClick: () => {},
      className: '',
      columns: [],
      isActive: true,
      isInactive: true,
      onRowBlur: () => {},
      onRowFocus: () => {},
      onRowSelect: () => {},
    };

    const shouldRender = shouldRenderCollapsibleTableRow(prevProps, nextProps);

    expect(shouldRender).toEqual(DONT_RENDER);
  });

  it('should not render if no props change', () => {
    const prevProps = {
      id: '1',
      index: 0,
      rowType: '',
      header: '',
      children: '',
      isRowOpen: false,
      onExpand: () => {},
      handleHeaderClick: undefined,
      className: '',
      columns: [],
      isActive: false,
      isInactive: false,
      isSelected: false,
      onRowBlur: () => {},
      onRowFocus: () => {},
      onRowSelect: () => {},
    };

    const nextProps = {
      ...prevProps,
    };

    const shouldRender = shouldRenderCollapsibleTableRow(prevProps, nextProps);

    expect(shouldRender).toEqual(DONT_RENDER);
  });
});
