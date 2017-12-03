const fs = require('fs');
function readFormula(filename) {
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
function doSolveWithWhile(clauses, assignment) {
	let isSat;
	while (true) {
		console.log(assignment);
		isSat = true;
		for (let i = clauses.length-1; i > -1; --i) {
			const test = clauses[i].map(variable => {
				const value = assignment[Math.abs(variable) - 1];
				if (variable < 0) return +!value;
				return value;
			}).reduce((p, c) => p + c, 0);
			if (!test) {
				isSat = false;
				break;
			}
		}
		if (isSat) break;
		else {
			try {
				nextAssignment(assignment);
			} catch (e) {
				break;
			}
		}
	}
	if (isSat) return {
		isSat: true,
		satisfyingAssignment: assignment
	}
	return {
		isSat: false,
		satisfyingAssignment: null
	}
}
function doSolve(clauses, assignment) {
	let isSat = true;
	for (let i = clauses.length-1; i > -1; --i) {
		const test = clauses[i].map(variable => {
			const value = assignment[Math.abs(variable) - 1];
			if (variable < 0) return +!value;
			return value;
		}).reduce((p, c) => p + c, 0);
		if (!test) {
			isSat = false;
			break;
		}
	}
	if (isSat) return {
		isSat: true,
		satisfyingAssignment: assignment
	}
	try {
		return doSolve(clauses, nextAssignment(assignment))
	} catch(e) {
		return {
			isSat: false,
			satisfyingAssignment: null
		}
	}
}

exports.solve = function(filename) {
	const formula = readFormula(filename);
	const result = doSolve(formula.clauses, formula.variables);
	return result;
}