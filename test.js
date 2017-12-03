const sat = require('./sat.js').solve;
const des = require('./desafio1.js').solve;

['cnf/simple0.cnf','cnf/simple1.cnf','cnf/simple2.cnf',
 'cnf/hole1.cnf','cnf/hole4.cnf','cnf/hole5.cnf','cnf/hole6.cnf',
 'cnf/pieceOfHole6.cnf'
].forEach(filename => {
	console.log(filename);
	console.time('\tSat');
		const a1 = sat(filename);
	console.timeEnd('\tSat');
	console.log('\tResposta: ',JSON.stringify(a1.satisfyingAssignment));
	console.time('\tDes');
		const a2 = des(filename);
	console.timeEnd('\tDes');
	console.log('\tResposta: ',JSON.stringify(a2.satisfyingAssignment));
})