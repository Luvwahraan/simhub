

function getProportionalValue(value, max, maxValue) {
	if (maxValue == null || maxValue <= 9) { maxValue = 29; }
	if (max != null && max > 0) {
		value = max * value / maxValue;
	}
	//return Math.round(value);
	return value;
}