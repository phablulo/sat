const sat = require('./sat.js').solve;
const des = require('./desafio1.js').solve;
sat.toString = () => 'Sat';
des.toString = () => 'Des';

['cnf/simple0.cnf','cnf/simple1.cnf','cnf/simple2.cnf',
 'cnf/hole1.cnf','cnf/hole4.cnf','cnf/hole5.cnf','cnf/hole6.cnf',
 'cnf/pieceOfHole6.cnf'
].forEach(filename => {
	console.log(filename);
	[sat, des].forEach(t => {
		let time = process.hrtime();
		let a1;
		for (let i = 0; i < 3; ++i) a1 = sat(filename);
		time = process.hrtime(time);
		time = (time[0] * 1e9 + time[1])/1e9;
		console.log(`\t${t} [${time}ms]:`, JSON.stringify(a1.satisfyingAssignment));
	});
})