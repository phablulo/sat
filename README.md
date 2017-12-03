Um SAT solver (muito ruim)
========

Resultado dos testes. Medição em milissegundos:
![image](test-results.png)

A implementação do desafio1 mostrou-se mais lenta que o brute-force. Talvez por causa da pobre implementação.

### Output do test.js ###
```
$ node test.js
cnf/simple0.cnf
	Sat: 2.736ms
	Resposta:  [0,0,0,1]
	Des: 1.420ms
	Resposta:  [0,0,0,1]
cnf/simple1.cnf
	Sat: 1.431ms
	Resposta:  [1,0,0,0]
	Des: 0.791ms
	Resposta:  [1,0,0,0]
cnf/simple2.cnf
	Sat: 0.864ms
	Resposta:  null
	Des: 3.111ms
	Resposta:  null
cnf/hole1.cnf
	Sat: 0.394ms
	Resposta:  null
	Des: 101.322ms
	Resposta:  null
cnf/hole4.cnf
	Sat: 116.904ms
	Resposta:  null
	Des: 836.255ms
	Resposta:  null
cnf/hole5.cnf
	Sat: 133.554ms
	Resposta:  null
	Des: 1374.040ms
	Resposta:  null
cnf/hole6.cnf
	Sat: 133.531ms
	Resposta:  null
	Des: 2055.595ms
	Resposta:  null
cnf/pieceOfHole6.cnf
	Sat: 120.646ms
	Resposta:  null
	Des: 2326.218ms
	Resposta:  null
```