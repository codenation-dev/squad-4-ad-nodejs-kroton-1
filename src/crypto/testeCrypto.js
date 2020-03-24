const teste = require('./crty_dcryp.js')

const senha1 = teste.criptografar('123')
const senha2 = teste.criptografar('123')
console.log(senha1)
console.log(senha2)

console.log(teste.descriptografar(senha1))
console.log(teste.descriptografar(senha2))
