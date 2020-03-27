const crypto = require('crypto')
const config = require('../config/config')

const cryptRes = { }

cryptRes.criptografar = (senha) => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(config.cryptography.algorithm, config.cryptography.secret, iv)
  const crypted = cipher.update(senha, 'utf8', 'base64') + cipher.final('base64')
  return iv.toString('base64') + ':' + crypted
}

cryptRes.descriptografar = (senha) => {
  const parts = senha.split(':')
  const decipher = crypto.createDecipheriv(config.cryptography.algorithm, config.cryptography.secret, new Buffer.from(parts[0], 'base64'))
  const plain = decipher.update(parts[1], 'base64', 'utf8') + decipher.final('utf8')
  return plain
}

module.exports = cryptRes
