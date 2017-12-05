const fs = require('fs');

exports.readFormula = function readFormula(filename) {
	const text = fs.readFileSync(filename).toString().split('\n').filter(line => line && line[0] != 'c');
	const specification = text[0].split(' ').slice(2).map(x => +x);
	text.shift(); // okay, i hope you're not using a big array.
	const variables = Array(specification[0]).fill(0);
	const clauses = text.map(clause => clause.split(/\s+/).filter(x => x).slice(0, -1).map(x => +x));

	if (specification[1] != clauses.length)
		throw new Error(`Clause number mismatch: expected ${specification[1]} but got ${clauses.length}`);
	if (specification[0] != (vn = Math.max.apply(null, clauses.map(clause => Math.max.apply(null, clause.map(x => Math.abs(x)))))))
		throw new Error(`Variable number mismatch: expected ${specification[0]} but got ${vn}`);

	return {
		clauses: clauses,
		variables: variables
	}
}

exports.nextAssignment = function nextAssignment(currentAssignment) {
	if (Math.min.apply(null, currentAssignment) == 1)
		throw new Error("Todas as possibilidades já foram testadas");
	let i = currentAssignment.length;
	while (i-- > 0) {
		if (currentAssignment[i] == 0) {
			currentAssignment[i] = 1;
			break;
		}
		currentAssignment[i] = 0;
	}
	return currentAssignment;
}

exports.choice = function choice(arr) {
	const length = arr.length;
	return arr[Math.floor(Math.random() * length)]
}