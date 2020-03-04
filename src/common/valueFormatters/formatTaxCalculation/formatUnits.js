const removeTrailingZeros = str => String(Number(str));

const formatUnits = units => removeTrailingZeros(units);

export default formatUnits;
