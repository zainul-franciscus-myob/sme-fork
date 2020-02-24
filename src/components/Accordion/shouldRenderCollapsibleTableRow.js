export const DONT_RENDER = true;
export const RENDER = false;

const shouldRenderCollapsibleTableRow = (prevProps, nextProps) => {
  const isRowOpenDifferent = prevProps.isRowOpen !== nextProps.isRowOpen;
  const isIdDifferent = prevProps.id !== nextProps.id;
  const isSelectedDifferent = prevProps.isSelected !== nextProps.isSelected;

  if (isRowOpenDifferent || isSelectedDifferent || isIdDifferent) {
    return RENDER;
  }

  return DONT_RENDER;
};

export default shouldRenderCollapsibleTableRow;
