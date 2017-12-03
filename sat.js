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

console.log(readFormula('simple0.cnf'))