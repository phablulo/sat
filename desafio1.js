const lib = require('./lib.js');
const readFormula = lib.readFormula;
const nextAssignment = lib.nextAssignment;

function doSolve(clauses, assignment, index_modified) {
	const variables = assignment.map((_,i) => i+1);
	let left  = variables.slice(0, index_modified);
	let right = variables.slice(index_modified);
	const filtered_clause_index = clauses.map((_,i) => i).filter(index => intersects(right,  clauses[index].map(Math.abs)));
	let length = filtered_clause_index.length;

	let pass = true;
	while (length-- > 0) {
		const test = clauses[filtered_clause_index[length]].map(variable => {
			const value = assignment[Math.abs(variable) - 1];
			if (variable < 0) return +!value; // 0 vira 1 e 1 vira 0.
			return value;
		}).reduce((p, c) => p + c, 0); // todos falsos = 0, algum true >= 1
		if (!test) {
			pass = false;
			break;
		}
	}
	if (pass) {
		if (filtered_clause_index.length == clauses.length) {
			return {
				isSat: true,
				satisfyingAssignment: assignment
			}
		}
		if (left.length) {
			left  = doSolve(clauses, assignment.slice(0, index_modified-1), 0);
		}
		if (right.length) {
			right = doSolve(clauses, assignment.slice(index_modified), 0);
		}
		if (!right.isSat && !left.isSat) {
			return right;
		}

		if (right.isSat) {
			right.satisfyingAssignment.forEach((value, index) => {
				assignment[index+index_modified] = value;
			})
		}
		if (left.isSat) {
			left.satisfyingAssignment.forEach((value, index) => {
				assignment[index] = value;
			})
		}
		return {
			isSat: true,
			satisfyingAssignment: assignment
		}
	} else {
		try {
			const next = nextAssignment(assignment);
			return doSolve(clauses, next[0], next[1])
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
}
function intersects(arr1, arr2) {
	let answer = false;
	let len = arr1.length;
	while (len-- > 0) {
		if (arr2.indexOf(arr1[len]) != -1) {
			answer = true;
			break;
		}
	}
	return answer;
}

exports.solve = function(filename) {
	const formula = readFormula(filename);
	const result = doSolve(formula.clauses, formula.variables, 0);
	return result;
}