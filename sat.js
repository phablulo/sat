const fs = require('fs');
function readFormula(filename) {
	const text = fs.readFileSync(filename).toString().split('\n').filter(line => line && line[0] != 'c')
	const specification = text[0].split(' ').slice(2).map(parseInt);
	text.shift(); // okay, i hope you're not using a big array.
	const variables = Array(specification[0]).fill(0);
	const clauses = text.map(clause => clause.split(' ').slice(0, -1).map(x => parseInt(x)));
	// i'm gonna skip problem specification check for now.
	return {
		clauses: clauses,
		variables: variables
	}
}
function nextAssignment(currentAssignment) {
	if (Math.min.apply(null, currentAssignment) == 1)
		throw new Error("Todas as possibilidades já foram testadas");
	const last = currentAssignment.length - 1;
	for (let i = last; i > -1; --i) {
		if (currentAssignment[i] == 0) {
			currentAssignment[i] = 1;
			break;
		} else {
			currentAssignment[i] = 0;
		}
	}
	return currentAssignment;
}
const arr = [0,0,0,0];
for (let i = 0; i < 20; ++i) {
	console.log(i,nextAssignment(arr));
}