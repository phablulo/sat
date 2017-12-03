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
	let i = currentAssignment.length - 1;
	for (; i > -1; --i) {
		if (currentAssignment[i] == 0) {
			currentAssignment[i] = 1;
			break;
		} else {
			currentAssignment[i] = 0;
		}
	}
	return [currentAssignment, i];
}
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