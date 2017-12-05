Um SAT solver (muito ruim)
========

Resultado dos testes. Medição em segundos:
![image](test-results.png)
e
![image](test-results-2.png)

A implementação do desafio1 mostrou-se mais lenta, em alguns momentos, que o brute-force. Talvez por causa da pobre implementação.

### Output do test.js ###
```
node test
cnf/simple0.cnf
	Sat [0.00127889567s]: [0,0,0,1]
	Des [0.000319937667s]: [0,0,0,1]
cnf/simple1.cnf
	Sat [0.000560997s]: [1,0,0,0]
	Des [0.000780008s]: [1,0,0,0]
cnf/simple2.cnf
	Sat [0.001472898s]: null
	Des [0.004069827s]: null
cnf/hole1.cnf
	Sat [0.000490966s]: null
	Des [0.000093068s]: null
cnf/hole4.cnf
	Sat [19.1739840964s]: null
	Des [17.6394269974s]: null
```

#### Notas
- hole4.cnf dá Maximum call stack size exceeded no Sat por causa da recursividade, então o implementei, também, com while.
- hole5.cnf não terminou após uns 15 minutos. Então parei o programa.