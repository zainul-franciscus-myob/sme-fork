import formatNumberWithDecimalScaleRange from '../formatNumberWithDecimalScaleRange';

const formatDisplayUnitPrice = unitPrice => formatNumberWithDecimalScaleRange(unitPrice, 2, 6);

export default formatDisplayUnitPrice;
