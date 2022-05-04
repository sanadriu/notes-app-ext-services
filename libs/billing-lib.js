export function calculateCost(numNotes) {
	const noteCost = numNotes <= 10 ? 4 : numNotes <= 100 ? 2 : 1;

	return 100 * noteCost * numNotes;
}
