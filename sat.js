const lib = require('./lib.js');
const readFormula = lib.readFormula;
const nextAssignment = lib.nextAssignment;

function doSolveWithWhile(clauses, assignment) {
	let isSat;
	while (true) {
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
		if (e instanceof RangeError) {
			console.log(e);
			process.exit();
		}
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