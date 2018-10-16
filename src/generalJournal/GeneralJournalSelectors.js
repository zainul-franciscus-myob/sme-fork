export const getOrder = ({ order, orderBy }) => ({ // eslint-disable-line
  column: orderBy,
  descending: order === 'desc',
});
