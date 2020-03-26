const crypto = require('crypto')
const config = require('../config')

const criptRes = { }

criptRes.criptografar = (senha) => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(config.dados_criptografar.algoritmo, config.dados_criptografar.segredo, iv)
  const crypted = cipher.update(senha, 'utf8', 'base64') + cipher.final('base64')
  return iv.toString('base64') + ':' + crypted
}

criptRes.descriptografar = (senha) => {
  const parts = senha.split(':')
  const decipher = crypto.createDecipheriv(config.dados_criptografar.algoritmo, config.dados_criptografar.segredo, new Buffer.from(parts[0], 'base64'))
  const plain = decipher.update(parts[1], 'base64', 'utf8') + decipher.final('utf8')
  return plain
}

module.exports = criptRes
