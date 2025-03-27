export const getEndOfWord = (count: number): string => {
	const lastNumber = count % 10;
	if (lastNumber >= 2 && lastNumber <= 4) {
		return 'а'
	} else if (lastNumber >= 5 || count === 11 || lastNumber === 0) {
		return 'ов';
	}
	return '';
}